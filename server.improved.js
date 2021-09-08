const sqlite3 = require('sqlite3').verbose();

const
    http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require('mime'),
    dir = 'public/',
    port = 3000;

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    }
});

const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1);

    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    }
    else if (request.url === '/get-results') {
        sendResults(response)
    }else {
        sendFile(response, filename)
    }
};

function validate(str) {
    return str.replace('\'', '\'\'');
}

const handlePost = function (request, response) {
    let dataString = '';

    request.on('data', function (data) {
        dataString += data
    });

    request.on('end', function () {
        let data = JSON.parse(dataString);
        db.run(`INSERT INTO content(Description, Type, Class) VALUES('` +
            validate(data.content) + `', '` +
            validate(data.type) + `', '` +
            validate(data.name) + `')`, function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(data);
            console.log(`New item entered! Row ID: ${this.lastID}`); });

        response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
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
};

const sendResults = function (response) {
// open the database
    let db = new sqlite3.Database('./database.db');
    console.log("getting data!");
    let sql = `SELECT * FROM content
           ORDER BY Type`;
    let content = [];
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
            content.push(row);
        });
        response.writeHeader(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(rows));
        response.end();
    });

    db.close();

};


let db = new sqlite3.Database('./database.db', (err) => {
    if (err)
        console.error(err.message);
    console.log('Connected to the database.');
});

db.run("CREATE TABLE IF NOT EXISTS content(" +
    "Description text PRIMARY KEY, " +
    "Type text NOT NULL, " +
    "Class text NOT NULL) ",
    (err) => {
        if (err)
            console.error(err.message);
        console.log('Connected to the database.');
    });

    server.listen(process.env.PORT || port);