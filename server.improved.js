import data from "./public/js/data";

const http = require('http');
const fs   = require('fs');
const mime = require('mime');

const dir = './public';
const dataPath = `{dir}/js/data`;
const port = 3000;
const routes = [
  '/': '/index.html'
];

http.createServer((req, res) => {
  if (req.method === 'GET') {
    GET(req, res);
  } else if (req.method === 'POST') {
    POST (req, res);
  }
}).listen(process.env.PORT || port);

const GET = (req, res) => sendFile(res, routes[req.url] || req.url);

const POST = (req, res) => {
  let newData = {};
  req.on( 'data', data => newData = JSON.parse(data));

  req.on('end', () => {
    console.log(newData);
    addData(newData);
    resolve(res, 200);
  });
};

const sendFile = (res, path) => {
  fs.readFile(path, (err, data) => resolve(res, err ? 404: 200, err ? "File not found:" : data));
};

const resolve = (res, code, data = null) => {
  res.writeHead(code);
  res.end(data);
};

const addData = (newData) => {
  import(dataPath).then(data => {
    fs.writeFile(dataPath, data + newData);
  });
};
