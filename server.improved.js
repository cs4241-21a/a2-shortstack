const { parse } = require('path')

const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 3000

let appdata = [
  { 'name': 'Bill', 'score': 50, 'attempt': 1 },
  { 'name': 'Hoang', 'score': 1270, 'attempt': 2 },
  { 'name': 'Hoang', 'score': 500, 'attempt': 1 },
  { 'name': 'Ivan', 'score': 40, 'attempt': 1 },
]

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  } else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {

  request.on('data', function (data) {
    console.log(JSON.parse(data));
    let parsed = JSON.parse(data);
    let playerName = parsed['playerName'];
    let score = parsed['score'];
    let attempt = appdata.filter(p => p.name === playerName).length + 1
    appdata.push({ 'name': playerName, 'score': score, 'attempt': attempt });
  })

  request.on('end', function () {
    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  })
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we've loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)

    } else {

      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')

    }
  })
}

server.listen(process.env.PORT || port)
