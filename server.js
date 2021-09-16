require('dotenv').config();
const fs = require('fs');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const express = require('express');
const cookieSession = require('cookie-session');
const { MongoClient, ObjectId } = require('mongodb');
const { DateTime } = require('luxon');

const port = 3000;
const sessionMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

// paths
const dir = `${__dirname}/public`;
const dataPath = `${dir}/data.json`;

// server
const server = express();
server.listen(process.env.PORT || port);

// middleware
server.use(express.static('public')); // serve all public files
server.use(express.json()); // parses HTTP request body
server.use(cookieSession({
  name: 'session:pogchat',
  keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY2],
  maxAge: sessionMaxAge
}));

// database
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@pogchat.kzrfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri);

// default index.html route
server.get(['/'], (req, res) => res.sendFile(`${dir}/index.html`));

// results
server.get('/results', (req, res) => {
  mongoClient.connect(async err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const messageCollection = mongoClient.db("chat").collection("room1");
      const messages = await messageCollection.find().toArray();
      await mongoClient.close();
      res.send(messages);
    }
  });
});

// messaging
server.post('/add', async (req, res) => {
  const response = await addMessage(req.body.content, req.session.username, req.session.token);
  res.status(response ? 200 : 401).send(response);
});

server.put('/update', async (req, res) => {
  const response = await updateMessage(req.body.id, req.body.content, req.session.token);
  res.status(response ? 200 : 401).send(response);
});

server.delete('/delete', async (req, res) => {
  const response = await deleteMessage(req.body.id, req.session.username, req.session.token);
  res.status(response ? 200 : 401).send(response);
});

// authentication
server.post('/login', async (req, res) => {
  const auth = await authenticateUser(req.body.username, req.body.secret);
  if (auth) {
    req.session.username = req.body.username;
    req.session.token = auth.token;
    res.send({ newAccount: auth.newAccount })
  } else {
    res.sendStatus(401);
  }
});

server.post('/logout', async (req, res) => {
  mongoClient.connect(async err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const sessionsCollection = mongoClient.db("auth").collection("sessions");
      await sessionsCollection.deleteOne({ username: req.session.username });
      await mongoClient.close();
      req.session = null;
      res.sendStatus(200);
    }
  });
});

// returns active session details (if they exist)
server.get('/session', async (req, res) => {
  if (await authenticateToken(req.session.username, req.session.token)) {
    res.send({
      username: req.session.username
    });
  } else {
    res.sendStatus(404);
  }
});


// adds new message to data, returns updated data
const addMessage = async (content, username, token) => {
  if (await authenticateToken(username, token)) {
    return new Promise(resolve => {
      mongoClient.connect(async err => {
        if (err) {
          console.error(err);
          resolve(null);
        } else {
          const messageCollection = mongoClient.db("chat").collection("room1");
          await messageCollection.insertOne({
            username,
            content,
            submitted: DateTime.utc(),
            admin: username === 'Paradoxdotexe'});
          const messages = await messageCollection.find().toArray();
          await mongoClient.close();
          resolve(messages);
        }
      });
    });
  } else {
    return null;
  }
};

// deletes specified message from data
const deleteMessage = async (id, username, token) => {
  if (await authenticateToken(username, token)) {
    return new Promise(resolve => {
      mongoClient.connect(async err => {
        if (err) {
          console.error(err);
          resolve(null);
        } else {
          const messageCollection = mongoClient.db("chat").collection("room1");
          const message = await messageCollection.findOne({ '_id': ObjectId(id) });
          if (message && message['username'] === username) {
            await messageCollection.deleteOne({ '_id': ObjectId(id) })
          }
          const messages = await messageCollection.find().toArray();
          await mongoClient.close();
          resolve(messages);
        }
      });
    });
  } else {
    return null;
  }
  return new Promise(resolve => {
    mongoClient.connect(async err => {
      if (err) {
        console.error(err);
        resolve(null);
      } else {
        const messageCollection = mongoClient.db("chat").collection("room1");
        const message = await messageCollection.findOne({ '_id': ObjectId(id) });
        // TODO: Add authentication of the user token and make sure the message belongs to them
        if (message) {
          await messageCollection.deleteOne({ '_id': ObjectId(id) })
        }
        const messages = await messageCollection.find().toArray();
        await mongoClient.close();
        resolve(messages);
      }
    });
  });


  const data = JSON.parse(fs.readFileSync(dataPath));
  const i = data.findIndex(d => d.id === id);
  if (i > -1 && await authenticateToken(data[i].username, token)) {
    data.splice(i, 1);
    fs.writeFile(dataPath, JSON.stringify(data), () => null);
    return data;
  } else {
    return null;
  }
};

// updates specified message from data
const updateMessage = async (id, content, token) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const i = data.findIndex(d => d.id === id);
  if (i > -1 && await authenticateToken(data[i].username, token)) {
    data[i].content = content;
    fs.writeFile(dataPath, JSON.stringify(data), () => null);
    return data;
  } else {
    return null;
  }
};

// authenticates user secret against hash
const authenticateUser = async (username, secret) => {
  return new Promise(resolve => {
    mongoClient.connect(async err => {
      if (err) {
        console.error(err);
        resolve(null);
      } else {
        const hashesCollection = mongoClient.db("auth").collection("hashes");
        const hashDocument = await hashesCollection.findOne({ username });
        if (hashDocument) {
          resolve(bcrypt.compareSync(secret, hashDocument['hash']) ? { token: await generateToken(username), newAccount: false } : null);
        } else {
          const hash = bcrypt.hashSync(secret, 10);
          await hashesCollection.insertOne({ username, hash });
          resolve({ token: await generateToken(username), newAccount: true });
        }
        await mongoClient.close();
      }
    });
  });
}

// authenticates user session token
const authenticateToken = async (username, token) => {
  return new Promise(resolve => {
    mongoClient.connect(async err => {
      if (err) {
        console.error(err);
      } else {
        const sessionsCollection = mongoClient.db("auth").collection("sessions");
        const sessionDocument = await sessionsCollection.findOne({ username });
        if (sessionDocument) {
          if (DateTime.utc().toMillis() > sessionDocument['expiry']) {
            await sessionsCollection.deleteOne({ username });
            resolve(false);
          } else {
            resolve(sessionDocument['token'] === token);
          }
        }
        await mongoClient.close();
      }
      resolve(false);
    });
  });
}

// creates a new session token and returns it
const generateToken = async (username) => {
  return new Promise(resolve => {
    mongoClient.connect(async err => {
      if (err) {
        console.error(err);
        resolve(null);
      } else {
        const sessions = mongoClient.db("auth").collection("sessions");
        const token = crypto.randomBytes(48).toString('hex');
        const expiry = DateTime.utc().plus(sessionMaxAge).toMillis();
        await sessions.updateOne({ username }, { $set: { token, expiry } }, { upsert: true });
        await mongoClient.close();
        resolve(token);
      }
    });
  });
}
