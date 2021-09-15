const fs = require('fs');
const bcrypt = require('bcrypt');
const express = require('express')
const { DateTime } = require('luxon');
const { v4: uuid } = require('uuid');

// paths
const dir = `${__dirname}/public`;
const dataPath = `${dir}/data.json`;
const hashesPath = './hashes.json';
const port = 3000;

const server = express()
server.use(express.static('public')); // serve all public files
server.use(express.json()); // parses HTTP request body

// GET
server.get('/results', (req, res) => res.sendFile(`${dir}/data.json`));
server.get('*', (req, res) => res.sendFile(`${dir}/index.html`)); // default index.html route

// POST
server.post('/add', async (req, res) => {
  const response = await addMessage(req.body.username, req.body.content, req.body.hash);
  respond(res, JSON.stringify(response));
});

server.post('/update', async (req, res) => {
  const response = await updateMessage(req.body.id, req.body.content, req.body.hash);
  respond(res, JSON.stringify(response));
});

server.post('/delete', async (req, res) => {
  const response = await deleteMessage(req.body.id, req.body.hash);
  respond(res, JSON.stringify(response));
});

server.post('/authenticate', async (req, res) => {
  const response = await authenticateUser(req.body.username, req.body.secret);
  respond(res, JSON.stringify(response));
});

// LISTEN
server.listen(process.env.PORT || port);

// responds to request with code and response.body data
const respond = (res, data = null) => {
  if (data) {
    res.send(data);
  } else {
    res.send(401);
  }
};

// adds new message to data, returns updated data
const addMessage = async (username, content, hash) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  if (await authenticateHash(username, hash)) {
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
const deleteMessage = async (id, hash) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const i = data.findIndex(d => d.id === id);
  if (i > -1 && await authenticateHash(data[i].username, hash)) {
    data.splice(i, 1);
    fs.writeFile(dataPath, JSON.stringify(data), () => null);
    return data;
  } else {
    return null;
  }
};

// updates specified message from data
const updateMessage = async (id, content, hash) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const i = data.findIndex(d => d.id === id);
  if (i > -1 && await authenticateHash(data[i].username, hash)) {
    data[i].content = content;
    fs.writeFile(dataPath, JSON.stringify(data), () => null);
    return data;
  } else {
    return null;
  }
};

const authenticateUser = async (username, secret) => {
  const hashes = JSON.parse(fs.readFileSync(hashesPath).toString());
  if (hashes[username]) {
    return bcrypt.compareSync(secret, hashes[username]) ? hashes[username] : null;
  } else {
    hashes[username] = bcrypt.hashSync(secret, 10);
    fs.writeFile(hashesPath, JSON.stringify(hashes), () => null);
    return hashes[username];
  }
}

const authenticateHash = async (username, hash) => {
  const hashes = JSON.parse(fs.readFileSync(hashesPath).toString());
  return hashes[username] ? hash === hashes[username] : false;
}
