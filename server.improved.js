const http = require('http');
const fs = require('fs');
const { DateTime } = require('luxon');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

const dir = './public';
const dataPath = `${dir}/data.json`;
const hashesPath = `${dir}/hashes.json`;
const port = 3000;
const routes = {
  '/': '/index.html',
  '/chat': '/chat.html',
  '/results': '/data.json'
};

http.createServer((req, res) => {
  if (req.method === 'GET') {
    GET(req, res);
  } else if (req.method === 'POST') {
    POST(req, res);
  }
}).listen(process.env.PORT || port);

const GET = (req, res) => {
  const url = req.url.split('?')[0];
  sendFile(res, dir + (routes[url] || url));
};

const POST = (req, res) => {
  let responseData;

  req.on('data', async data => {
    data = JSON.parse(data.toString());
    if (req.url === '/message') {
      responseData = await updateData(data);
    } else if (req.url === '/authenticate') {
      responseData = await authenticateUser(data.username, data.secret);
      console.log(responseData);
    }
  });

  req.on('end', () => {
    respond(res, responseData ? 200 : 401, JSON.stringify(responseData));
  });
};

const sendFile = (res, path) => {
  fs.readFile(path, (err, data) =>
      respond(res, err ? 404 : 200, err ? "File not found:" : data));
};

// updates data by appending a new data object, returns updated data
const updateData = async (newData) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  if (await authenticateHash(newData.username, newData.hash)) {
    delete newData.hash;
    data.push({...newData,
      id: uuid(),
      submitted: DateTime.utc(),
      admin: newData['username'] === 'Paradoxdotexe'})
    fs.writeFile(dataPath, JSON.stringify(data), () => null);
    return data;
  } else {
    return null;
  }
};

// responds to request with code and response.body data
const respond = (res, code, data = null) => {
  res.writeHead(code);
  res.end(data);
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
