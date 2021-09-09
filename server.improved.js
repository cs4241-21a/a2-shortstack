const http = require('http');
const fs = require('fs');
// IMPORTANT: you must run `npm install` in the directory for this assignment
// to install the mime library used in the following line of code
const mime = require('mime');
const dir = 'public/';
const port = 3000;

// data is a slightly modified version of what is at https://surlalunefairytales.com/annotated-a-g.html
// the annotation numbers were removed, but everything else was retained
// files were run through the form handler to create these json files
const startingDataFileNames = ["emperor's new clothes.json", "cinderella.json", "golden goose.json"];
const appdata = startingDataFileNames.map((filename) => JSON.parse(fs.readFileSync(filename)));

const server = http.createServer(function(request, response) {
    if (request.method === 'GET') {
        handleGet(request, response)
    } else if (request.method === 'POST') {
        handlePost(request, response)
    }
})

const handleGet = function(request, response) {
    const filename = dir + request.url.slice(1)

    if (request.url === '/data') {
        response.writeHeader(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(appdata));
    } else if (request.url === '/') {
        sendFile(response, 'public/index.html');
    } else {
        sendFile(response, filename);
    }
}

// a word has some number of letter or number characters, and apostrophes and hypens
// this ends up matching "--", but fixing it would make the regex pretty unplesant so I didn't
const WORD = RegExp(/[’'-\w]+/, 'g');
const getWords = (text) => {
    let matchedWords = text.matchAll(WORD);
    let matches = [];
    for (let match of matchedWords) {
        matches.push([match[0].toLowerCase(), match.index]);
    }

    let words = {};
    matches.forEach((elm) => {
        if (words[elm[0]]) {
            words[elm[0]].positions.push(elm[1]);
        } else {
            words[elm[0]] = { 'positions': [elm[1]] };
        }
    });
    return words;
}


const addDataToDB = (data) => {
    const title = data.title;

    let index = 0;
    for (let entry of appdata) {
        if (entry.title === title) {
            appdata[index] = data;
            return;
        }
        index++;
    }
    appdata.push(data);
}

const removeFromDB = (title) => {
    let index = 0;
    for (let entry of appdata) {
        if (entry.title === title) {
            appdata.splice(index, 1);
            return;
        }
        index++;
    }
}
const handlePost = function(request, response) {
    let dataString = '';

    request.on('data', function(data) {
        dataString += data;
    });

    request.on('end', function() {
        const parsed = JSON.parse(dataString);
        const title = parsed.title;
        const text = parsed.text;
        const action = parsed.action;

        if (action === "delete") {
            removeFromDB(title);
        } else {
            const words = getWords(title + ' ' + text);
            const data = { title, text, words };

            addDataToDB(data);
        }

        response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(appdata));
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