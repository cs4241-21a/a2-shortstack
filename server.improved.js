const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

let dataCounter = 6;
const appdata = {
    0: {"rank": 1, "username": "Dave23", "score": 342, "date": new Date().toISOString()},
    3: {"rank": 2, "username": "Legend69", "score": 235, "date": new Date().toISOString()},
    5: {"rank": 3, "username": "bob", "score": 111, "date": new Date().toISOString()},
    4: {"rank": 4, "username": "Dave23", "score": 29, "date": new Date().toISOString()},
}


function apiGetValues(request, response) {
    response.writeHead(200, "OK", {'Content-Type': 'text/json'})
    response.end(JSON.stringify(appdata))
}

function collectPost(request, callback) {
    let dataString = ''
    request.on('data', data => dataString += data)
    request.on('end', () => callback(dataString))
}

function apiPostAddition(request, response) {
    collectPost(request, function (data) {
        const field = JSON.parse(data);

        if (!(field.hasOwnProperty("username") && field.hasOwnProperty("score"))) {
            response.writeHead(400, "Bad Request")
            response.end("Missing username and/or score from request")
            return
        }

        if (!(typeof field.score === "number" && (field.score | 0) === field.score)) {
            response.writeHead(400, "Bad Request")
            response.end("Score must be an integer value")
            return
        }

        if (!(typeof field.username === "string" && field.username.length > 0)) {
            response.writeHead(400, "Bad Request")
            response.end("Username must be a non-empty string value")
            return
        }

        appdata[dataCounter] = {
            "username": field.username,
            "score": field.score,
            "date": new Date().toISOString(),
        }

        dataCounter += 1;
        apiGetValues(request, response)
    })
}

function apiPostRemove(request, response) {
    collectPost(request, function (data) {
        const field = JSON.parse(data);

        if (!(field.hasOwnProperty("id"))) {
            response.writeHead(400, "Bad Request")
            response.end("Missing id from request")
            return
        }

        if (!appdata.hasOwnProperty(field.id)) {
            response.writeHead(400, "Bad Request")
            response.end("Row ID not found")
            return
        }

        delete appdata[field.id]
        apiGetValues(request, response)
    })
}

function apiPostEdit(request, response) {
    collectPost(request, function (data) {
        const field = JSON.parse(data);

        if (!(field.hasOwnProperty("id") && field.hasOwnProperty("username") && field.hasOwnProperty("score"))) {
            response.writeHead(400, "Bad Request")
            response.end("Missing username, score and/or id from request")
            return
        }

        if (!(typeof field.score === "number" && (field.score | 0) === field.score)) {
            response.writeHead(400, "Bad Request")
            response.end("Score must be an integer value")
            return
        }

        if (!(typeof field.username === "string" && field.username.length > 0)) {
            response.writeHead(400, "Bad Request")
            response.end("Username must be a non-empty string value")
            return
        }

        if (!appdata.hasOwnProperty(field.id)) {
            response.writeHead(400, "Bad Request")
            response.end("Row ID not found")
            return
        }

        appdata[field.id] = {
            "username": field.username,
            "score": field.score,
            "date": new Date().toISOString(),
        }
        apiGetValues(request, response)
    })
}

const handleGet = function (request, response) {
    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    } else {
        sendFile(response, "public" + request.url)
    }
}

const sendFile = function (response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function (err, content) {

        // if the error = null, then we've loaded the file successfully
        if (err === null) {

            // status code: https://httpstatuses.com
            response.writeHeader(200, {'Content-Type': type})
            response.end(content)

        } else {
            // file not found, error code 404
            response.writeHeader(404)
            response.end('404 Error: File Not Found')
        }
    })
}

function unknownRoute(request, response) {
    response.writeHead(400, "Bad Request")
    response.end("Unknown route: " + request.method + ": " + request.url)
}

const routes = {
    "GET": {
        "/api/values": apiGetValues,
        "/api": unknownRoute,
        "/": handleGet,
    },
    "POST": {
        "/api/add": apiPostAddition,
        "/api/remove": apiPostRemove,
        "/api/edit": apiPostEdit,
    }
}

const server = http.createServer(function (request, response) {
    if (!routes.hasOwnProperty(request.method)) {
        unknownRoute(request, response)
        return
    }

    for (const [route, fn] of Object.entries(routes[request.method])) {
        if (request.url.startsWith(route)) {
            fn(request, response)
            return
        }
    }

    unknownRoute(request, response)

    // if (request.url.startsWith("/api")) {
    //     handleAPI(request, response)
    // } else {
    //     if (request.method === 'GET') {
    //         handleGet(request, response)
    //     } else if (request.method === 'POST') {
    //         handlePost(request, response)
    //     }
    // }
})

server.listen(process.env.PORT || port)
