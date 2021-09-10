const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

const appdata = []

const server = http.createServer(function(request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    }
})

const handleGet = function(request, response) {
    const filename = dir + request.url.slice(1)

    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    } else {
        sendFile(response, filename)
    }
}

const handlePost = function(request, response) {
    let dataString = ''

    request.on('data', function(data) {
        dataString += data
    })

    request.on('end', function() {
        if (dataString.startsWith('d')) {

            const index = parseInt(dataString.slice(1))
            appdata.splice(index, 1)
                //console.log("updated: " + JSON.stringify(appdata))

        } else if (dataString.startsWith('e')) {

            const index = parseInt(dataString.slice(1, dataString.indexOf(','))),
                json = JSON.parse(dataString.slice(dataString.indexOf(',') + 1)),
                curItem = appdata[index]

            curItem.task = json.task
            curItem.time = json.time
            curItem.date = json.date

            //console.log(appdata)

        } else if (dataString.startsWith('c')) {

            const index = parseInt(dataString.slice(1)),
                curItem = appdata[index]

            curItem.done = curItem.done === 'true' ? 'false' : 'true'

            //console.log(appdata)

        } else {

            const json = JSON.parse(dataString)
            appdata.push(json)

        }
        response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
        response.end(JSON.stringify(appdata))
    })
}

const sendFile = function(response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function(err, content) {

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