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
// const startingDataFileNames = ["emperor's new clothes.json"];
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

const printOutData = (data) => {
    data.forEach((datum) => {
        console.log(`\n`);
        console.log(datum.title);
        const MAX_DEBUG_TEXT_LENGTH = 100;
        console.log(datum.text.slice(0, MAX_DEBUG_TEXT_LENGTH));

        console.log(`-------------------\nWords: `);
        let words = Object.keys(datum.words);
        words.forEach(word => {
            console.log(`${word}: ${datum.words[word].positions}`);
        });

    });
}

const valid_char_regex = /[a-zA-Z0-9\s]/;
const cleanUpText = (text) => {
    return Array.from(text).filter(chr => valid_char_regex.test(chr)).reduce((a, b) => a + b).toLowerCase();
}

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
            entry[index] = data;
            return;
        }
        index++;
    }
    appdata.push(data);
}
const handlePost = function(request, response) {
    let dataString = '';

    request.on('data', function(data) {
        dataString += data;
    });

    request.on('end', function() {
        // console.log(JSON.parse(dataString));

        // ... do something with the data here!!!
        const parsed = JSON.parse(dataString);
        const title = parsed.title;
        const text = parsed.text;
        const words = getWords(title + ' ' + text);
        const data = { title, text, words };
        fs.writeFile('words.json', JSON.stringify(data), 'utf-8', (err) => {
            if (err) {
                console.log(err)
            }
            console.log('write words.json');

        });

        addDataToDB(data);
        // printOutData(appdata);


        response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
        response.end()
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