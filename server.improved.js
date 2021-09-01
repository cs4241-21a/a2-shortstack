const http = require('http');
const fs = require('fs');
const { DateTime } = require('luxon');
const bcrypt = require('bcrypt');

const dir = './public';
const dataPath = `${dir}/data.json`;
const hashesPath = `${dir}/hashes.json`;
const port = 3000;
const routes = {
  '/': '/index.html',
  '/chat': '/index.html',
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
  let data = {};
  req.on('data', async newData => {
    data = JSON.stringify(await updateData(JSON.parse(newData)));
  });
  req.on('end', () => {
    respond(res, data ? 200 : 401, data);
  });
};

const sendFile = (res, path) => {
  fs.readFile(path, (err, data) =>
      respond(res, err ? 404 : 200, err ? "File not found:" : data));
};

// updates data by appending a new data object, returns updated data
const updateData = async (newData) => {
  const data = JSON.parse(await fs.readFileSync(dataPath));
  if (await verifyUser(newData.username, newData.password)) {
    delete newData.password;
    data.push({...newData, submitted: DateTime.utc(), admin: newData['username'] === 'Paradoxdotexe'})
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

const verifyUser = async (username, password) => {
  const hashes = JSON.parse(await fs.readFileSync(hashesPath));
  if (hashes[username]) {
    return bcrypt.compareSync(password, hashes[username]);
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      hashes[username] = hash;
      fs.writeFile(hashesPath, JSON.stringify(hashes), () => null);
    });
    return true;
  }
}
