const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require('mime'),
  dir = 'public/',
  port = 3000

let appdata = [];

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
  } else if (request.url === '/get-data') {
    response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    let json = JSON.parse(dataString);

    if(request.url === '/submit'){
      let dupe = false;
      appdata.forEach((element) => {
        if (element.title === json.title) {
          response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
          const resData = { ...appdata, error: 'Duplicate Task titles not allowed'};
          response.end(JSON.stringify(resData));
          dupe = true;
        }
      });
  
      if (dupe)
        return;
  
      appdata.push(
        {
          title: json.title,
          description: json.description,
          priority: json.priority,
          dateCreated: json.dateCreated,
          deadline: createDeadline(json.dateCreated, json.priority)
        }
      );
  
      response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(appdata));

    } else if (request.url === '/delete') {

      // Delete task
      appdata = appdata.filter((element) => {
        return json.title !== element.title;
      });

      response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(appdata));
    } else if (request.url === '/edit') {
      // Edit task
      appdata = appdata.map((element) => {
        if(json.oldTitle === element.title) {
          element.title = json.newTitle;
          element.description = json.description;
          element.priority = json.priority;
          element.deadline = createDeadline(element.dateCreated, json.priority)
        }

        return element;
      });

      response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(appdata));
    }
    
  });
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

let createDeadline = (dateCreated, priority) => {

  let month = parseInt(dateCreated.substr(0, 2));
  let day = parseInt(dateCreated.substr(3, 2));
  let year = parseInt(dateCreated.substr(6, 4));
  let deadLine = new Date();
  deadLine.setDate(day);
  deadLine.setMonth(month-1);
  deadLine.setFullYear(year);

  switch (priority) {
    case 0:
      deadLine.setFullYear(deadLine.getFullYear() + 1);
      break;
    case 1:
      deadLine.setMonth(deadLine.getMonth() + 6);
      break;
    case 2:
      deadLine.setMonth(deadLine.getMonth() + 3);
      break;
    case 3:
      deadLine.setMonth(deadLine.getMonth() + 2);
      break;
    case 4:
      deadLine.setMonth(deadLine.getMonth() + 1);
      break;
    case 5:
      deadLine.setDate(deadLine.getDate() + 15);
      break;
    case 6:
      deadLine.setDate(deadLine.getDate() + 7);
      break;
    case 7:
      deadLine.setDate(deadLine.getDate() + 3);
      break;
    case 8:
      deadLine.setDate(deadLine.getDate() + 2);
      break;
    case 9:
      deadLine.setDate(deadLine.getDate() + 1);
      break;
    case 10:
      // deadline is today no change
      break;
  }

  return `${String(deadLine.getMonth() + 1).padStart(2, '0')}/` +
    `${String(deadLine.getDate()).padStart(2, '0')}/${deadLine.getFullYear()}`;
}

server.listen(process.env.PORT || port)
