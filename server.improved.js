const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

let appdata = []
let winner = []
let sum = 0;

const server = http.createServer(function(request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    }
})

const handleGet = function(request, response) {
    console.log("handleGet")
    const filename = dir + request.url.slice(1)

    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    } else {
        sendFile(response, filename)
    }
}

//handle post requests for submitting, deleting, and modifying data
const handlePost = function(request, response) {
    if (request.url === "/submit") {
        submit(request, response)
    } else if (request.url === "/delete") {
        remove(request, response)
    } else if (request.url === "/modify") {
        modify(request, response)
    }
}

//remove entry from data by passing in the unique ID of the entry
const remove = function(request, response) {
    console.log("remove")

    let dataString = ''

    request.on('data', function(data) { //retrieving passed in data from scripts.js
        dataString += data
    })

    request.on('end', function() {
        console.log(dataString)
        let id = parseInt(JSON.parse(dataString))

        index = appdata.findIndex(player => player.id === id);

        appdata.splice(index, 1);

        var json = JSON.stringify(appdata);

        response.writeHead(200, "OK")
        response.end(json)

    })

}

//modify entry from data by passing in the unique ID of the entry
const modify = function(request, response) {
    console.log("modify")

    let dataString = ''

    request.on('data', function(data) { //retrieving passed in data from scripts.js
        dataString += data
    })

    request.on('end', function() {
        console.log("Datastring: " + dataString)
        let playerData = JSON.parse(dataString)

        const score = parseInt(playerData['score'])
        const firstname = String(playerData['firstname'])
        const lastname = String(playerData['lastname'])
        const id = parseInt(playerData['id'])

        index = appdata.findIndex(player => player.id === id);

        appdata.splice(index, 1);

        var player = { 'rank': 0, 'score': score, 'firstname': firstname, 'lastname': lastname, 'id': id }

        var newAppdata = []

        order(newAppdata, player)

        appdata = newAppdata

        rank(appdata)

        var json = JSON.stringify(appdata);

        response.writeHead(200, "OK")
        response.end(json)


    })
}

//add a new entry into the data
const submit = function(request, response) {
    console.log("submit")

    let dataString = ''

    request.on('data', function(data) { //retrieving passed in data from scripts.js
        dataString += data
    })

    request.on('end', function() {
        let playerData = JSON.parse(dataString)

        const score = parseInt(playerData['score'])
        const firstname = String(playerData['firstname'])
        const lastname = String(playerData['lastname'])
        const id = parseInt(playerData['id'])

        console.log("Score: " + score)
        console.log("Firstname: " + firstname)
        console.log("Lastname: " + lastname)
        console.log("ID: " + id)

        var player = { 'rank': 0, 'score': score, 'firstname': firstname, 'lastname': lastname, 'id': id }

        var newAppdata = []

        order(newAppdata, player)

        appdata = newAppdata

        rank(appdata)

        console.log(appdata)

        var json = JSON.stringify(appdata);

        response.writeHead(200, "OK")
        response.end(json) //what you put in end(..) gets returned from fetch request
    })
}

//Given a new entry object, place it in the correct order from highest score to lowest score
const order = function(newAppdata, player) {
    if (appdata.length === 0) {
        newAppdata.push(player)
    } else {
        let isAdded = false
        for (let i = 0; i < appdata.length; i++) {
            if (player.score >= appdata[i].score && isAdded === false) {
                console.log("1st Condition")
                newAppdata.push(player)
                newAppdata.push(appdata[i])
                isAdded = true
            } else if (i === appdata.length - 1 && isAdded === false) {
                console.log("2nd Condition")
                newAppdata.push(appdata[i])
                newAppdata.push(player)
            } else {
                console.log("3rd Condition")
                newAppdata.push(appdata[i])
            }
        }
    }
}

//Rank the entries from 1st for the highest score to lowest score
const rank = function(appdata) {
    let currentRank = 1
    let pastScore = -1
    for (let i = 0; i < appdata.length; i++) {
        if (pastScore === -1) {
            pastScore = appdata[i].score
            appdata[i].rank = currentRank
        } else if (pastScore === appdata[i].score) {
            appdata[i].rank = currentRank
        } else {
            currentRank++
            pastScore = appdata[i].score
            appdata[i].rank = currentRank
        }
    }
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