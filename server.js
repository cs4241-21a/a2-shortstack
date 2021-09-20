const bcrypt = require('bcrypt');
const crypto = require('crypto');
const express = require('express');
const cookieSession = require('cookie-session');
const { MongoClient, ObjectId } = require('mongodb');
const { DateTime } = require('luxon');
require('dotenv').config();

const port = 3000;
const dir = `${__dirname}/public`;
const sessionMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

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
  const response = await updateMessage(req.body.id, req.body.content, req.session.username, req.session.token);
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
  res.sendStatus(await getMongoClient().then(async client => {
    const sessionsCollection = client.db("auth").collection("sessions");
    await sessionsCollection.deleteOne({ username: req.session.username });
    await mongoClient.close();
    req.session = null;
    return 200;
  }).catch(() => 500));
});

// returns active session details (if they exist)
server.get('/session', async (req, res) => {
  if (await authenticateSession(req.session.username, req.session.token)) {
    res.send({ username: req.session.username });
  } else {
    res.sendStatus(404);
  }
});


// adds new message to data, returns updated data
const addMessage = async (content, username, token) => {
  return getMongoClient().then(async client => {
    let messages = null;
    if (await authenticateToken(username, token, client)) {
      const messageCollection = client.db("chat").collection("room1");
      await messageCollection.insertOne({
        username,
        content,
        submitted: DateTime.utc(),
        admin: username === 'Paradoxdotexe'});
      messages = await messageCollection.find().toArray();
    }
    await mongoClient.close();
    return messages;
  }).catch(() => null);
};

// deletes specified message from data
const deleteMessage = async (id, username, token) => {
  return getMongoClient().then(async client => {
    let messages = null;
    if (await authenticateToken(username, token, client)) {
      const messageCollection = client.db("chat").collection("room1");
      const message = await messageCollection.findOne({ '_id': ObjectId(id) });
      if (message && message['username'] === username) {
        await messageCollection.deleteOne({ '_id': ObjectId(id) })
      }
      messages = await messageCollection.find().toArray();
    }
    await mongoClient.close();
    return messages;
  }).catch(() => null);
};

// updates specified message from data
const updateMessage = async (id, content, username, token) => {
  return getMongoClient().then(async client => {
    let messages = null;
    if (await authenticateToken(username, token, client)) {
      const messageCollection = client.db("chat").collection("room1");
      const message = await messageCollection.findOne({'_id': ObjectId(id)});
      if (message && message['username'] === username) {
        await messageCollection.updateOne({'_id': ObjectId(id)}, { $set: {content} })
      }
      messages = await messageCollection.find().toArray();
    }
    await mongoClient.close();
    return messages;
  }).catch(() => null);
};

// authenticates user secret against hash
const authenticateUser = async (username, secret) => {
  return getMongoClient().then(async client => {
    let auth;
    const hashesCollection = client.db("auth").collection("hashes");
    const hashDocument = await hashesCollection.findOne({ username });
    if (hashDocument) {
      auth = bcrypt.compareSync(secret, hashDocument['hash']) ? { token: await generateToken(username, client), newAccount: false } : null;
    } else {
      const hash = bcrypt.hashSync(secret, 10);
      await hashesCollection.insertOne({ username, hash });
      auth = { token: await generateToken(username, client), newAccount: true };
    }
    await mongoClient.close();
    return auth;
  });
};

// creates a new session token and returns it
const generateToken = async (username, client) => {
  const sessions = client.db("auth").collection("sessions");
  const token = crypto.randomBytes(48).toString('hex');
  const expiry = DateTime.utc().plus(sessionMaxAge).toMillis();
  await sessions.updateOne({ username }, { $set: { token, expiry } }, { upsert: true });
  await mongoClient.close();
  return token;
};

// spawn a mongo client
const getMongoClient = () => {
  return new Promise((resolve, reject) => {
    mongoClient.connect(async err => {
      if (err) {
        console.error(err);
        reject()
      } else {
        resolve(mongoClient);
      }
    });
  });
}

// authenticates user session token
const authenticateToken = async (username, token, client) => {
  const sessionsCollection = client.db("auth").collection("sessions");
  const sessionDocument = await sessionsCollection.findOne({ username });
  if (sessionDocument) {
    if (DateTime.utc().toMillis() > sessionDocument['expiry']) {
      await sessionsCollection.deleteOne({ username });
      return false;
    }
    return sessionDocument['token'] === token;
  }
  return false;
};

// spawns mongo client and authenticates token
const authenticateSession = async (username, token) => {
  return getMongoClient().then(async client => {
    const authenticated = await authenticateToken(username, token, client);
    await mongoClient.close();
    return authenticated;
  }).catch(() => false);
}
