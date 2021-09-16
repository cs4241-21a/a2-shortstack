require('dotenv').config();
const fs = require('fs');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const express = require('express');
const cookieSession = require('cookie-session')
const { DateTime } = require('luxon');
const { v4: uuid } = require('uuid');

// paths
const dir = `${__dirname}/public`;
const dataPath = `${dir}/data.json`;
const hashesPath = './hashes.json';
const tokensPath = './tokens.json';
const port = 3000;
const sessionMaxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

// server
const server = express()
server.listen(process.env.PORT || port);

// middleware
server.use(express.static('public')); // serve all public files
server.use(express.json()); // parses HTTP request body
server.use(cookieSession({
  name: 'session:pogchat',
  keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY2],
  maxAge: sessionMaxAge
}));

// GET
server.get('/results', (req, res) => res.sendFile(`${dir}/data.json`));
server.get('*', (req, res) => res.sendFile(`${dir}/index.html`)); // default index.html route

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
  const response = await deleteMessage(req.body.id, req.session.token);
  res.status(response ? 200 : 401).send(response);
});

// authentication
server.post('/login', async (req, res) => {
  const token = await authenticateUser(req.body.username, req.body.secret);
  if (token) {
    req.session.username = req.body.username;
    req.session.token = token;
  }
  res.status(token ? 200 : 401).send();
});

server.post('/logout', async (req, res) => {
  req.session = null;
  res.status(200).send();
});

// adds new message to data, returns updated data
const addMessage = async (content, username, token) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  if (await authenticateToken(username, token)) {
    data.push({
      id: uuid(),
      username,
      content,
      submitted: DateTime.utc(),
      admin: username === 'Paradoxdotexe'})
    fs.writeFile(dataPath, JSON.stringify(data), () => null);
    return data;
  } else {
    return null;
  }
};

// deletes specified message from data
const deleteMessage = async (id, token) => {
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
  const hashes = JSON.parse(fs.readFileSync(hashesPath).toString());
  if (hashes[username]) {
    return bcrypt.compareSync(secret, hashes[username]) ? generateToken(username) : null;
  } else {
    hashes[username] = bcrypt.hashSync(secret, 10);
    fs.writeFile(hashesPath, JSON.stringify(hashes), () => null);
    return generateToken(username);
  }
}

// authenticates user session token
const authenticateToken = async (username, token) => {
  const tokens = JSON.parse(fs.readFileSync(tokensPath).toString());
  if (tokens[username]) {
    if (tokens[username]['expiry'] > DateTime.utc()) {
      delete tokens[username];
      return false;
    } else {
      return tokens[username]['token'] === token;
    }
  } else {
    return false;
  }
}

// creates a new session token and returns it
const generateToken = (username) => {
  const tokens = JSON.parse(fs.readFileSync(tokensPath).toString());
  const token = crypto.randomBytes(48).toString('hex');
  tokens[username] = {
    token,
    expiry: DateTime.utc().plus(sessionMaxAge)
  };
  fs.writeFile(tokensPath, JSON.stringify(tokens), () => null);
  return token;
}
