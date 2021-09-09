const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000

const appdata = [
    {'Assignment': 'a2', 'Class': 'WebWare', 'time': 7, 'Due': '2021-09-11', Days: 0},
    {'Assignment': 'reading', 'Class': 'WebWare', 'time': 1, 'Due':'2021-09-11', Days: 0},
    {'Assignment': 'a3', 'Class': 'WebWare', 'time': 10, 'Due':'2021-16-11', Days: 7},
];

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    }
})

function Response(response, data) {
    const type = mime.getType(appdata);
    response.writeHead(200, {'Content-Type': type});
    response.write(JSON.stringify(data));
    response.end()
}

const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1)

    if (request.url === '/') sendFile(response, 'public/index.html')
    else if (request.url === '/updatePage') Response(response, appdata);
    else sendFile(response, filename)
}

function Delete(dataString) {
    for (let i = 0; i < appdata.length; i++) {
        let row = appdata[i];
        console.log("dataString = " + dataString.slice(5));
        if ((i + 1).toString() === dataString.slice(5)) appdata.splice(i, 1);
    }
}


function addRowToTable(dataString) {
    let jsonApp = JSON.parse(dataString);
    console.log("jsonApp:\n" + JSON.stringify(jsonApp))
    jsonApp['Days'] = getDaysLeft(jsonApp);
    console.log("jsonApp:\n" + JSON.stringify(jsonApp))
    appdata.push(jsonApp);
}

function getDaysLeft(data){
  let today = new Date();
  let date = new Date(data['Due']);
  var diffMilli = date.getTime() - today.getTime();
  var diffDays = diffMilli / (1000 * 3600 * 24);
  return Math.round(diffDays);
}

function Update(dataString) {
    let jsonApp = JSON.parse(dataString);
    for (let i = 0; i < appdata.length; i++) {
        console.log("i = " + i);
        console.log("jsonApp = " + jsonApp['Index']);
        if ((i + 1).toString().normalize() === (jsonApp['Index'].toString().normalize())) {
            let row = appdata[i];
            row['Assignment'] = jsonApp['Assignment'];
            row['Class'] = jsonApp['Class'];
            row['time'] = jsonApp['time'];
            row['Due'] = jsonApp['Due'];
            row['Days'] = getDaysLeft(row);
        }
    }
}

const handlePost = function (request, response) {
    let dataString = ''

    request.on('data', function (data) {
        dataString += data
    })

    request.on('end', function () {
        console.log(dataString)

        // ... do something with the data here!!!
        if (request.url === '/add') addRowToTable(dataString);
        else if (request.url === '/delete') Delete(dataString);
        else if (request.url === '/modify') Update(dataString);
        console.log("appdata:\n" + JSON.stringify(appdata));
        response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        response.end()
    })
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

server.listen(process.env.PORT || port)
