const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 3000

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

// json database
var appdata = []
const images = ['public/img/jellybean1.jpeg', 'public/img/jellybean2.jpg', 'public/img/jellybean3.png']
const values = [920, 1261, 608]
currentImage = 0

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  let urlwithoutquery = request.url.split('?')[0]
  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  } else if (urlwithoutquery === '/photo') {
    sendFile(response, images[currentImage])
  } else if (request.url == '/guesses') {
    sendAppData(response)
  } else {
    sendFile(response, filename)
  }
}

const sendAppData = function (response) {
  response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
  response.write(JSON.stringify(appdata))
  response.end()
}

const handlePost = function (request, response) {
  let dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    data = JSON.parse(dataString)

    // calculate how far it was
    let diff = Math.abs(parseInt(data.guess) - values[currentImage])
    if (diff < 10) {
      currentImage = (currentImage + 1) % images.length
      appdata = [] // clear the guesses
    } else {
      let out = ['HOT!', 'warm!', 'cool', 'cold!', 'super cold', 'frozen :('] 
      data.hint = out[[15, 75, 125, 200, 450, Infinity].findIndex(e => diff < e)]
      appdata.push(data)
    }

    response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
    response.write(JSON.stringify(appdata))
    response.end()
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
