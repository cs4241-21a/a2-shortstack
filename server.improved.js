const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

let appdata = [
  { location: "Japan", cost: 7, priority: 10, rating: 6.5 },
  { location: "Iceland", cost: 9, priority: 8, rating: 4.5 }
];

const server = http.createServer(function(request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/init") {
    response.writeHead(200, "OK", { "Content-Type": "application/json" });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function(request, response) {
  let dataString = "";

  request.on("data", function(data) {
    dataString += data;
  });

  request.on("end", function() {
    const json = JSON.parse(dataString);

    if (request.url === "/submit") {
      appdata.push({
        location: json.location,
        cost: json.cost,
        priority: json.priority,
        rating: calcRating(json.cost, json.priority)
      });
    } else if (request.url === "/delete") {
      appdata = appdata.filter(entry => {
        return entry.location !== json.location;
      });
      console.log(appdata);
    } else if (request.url === "/update") {
      appdata.map(entry => {
        if ((entry.location === json.oldLocation)) {
          entry.location = json.newLocation;
          entry.cost = json.cost;
          entry.priority = json.priority;
          entry.rating = calcRating(json.cost,json.priority);
        }
      });
    }

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  });
};

const sendFile = function(response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function(err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

let calcRating = (cost, priority) => {
  return (priority - cost + 10) / 2;
};

server.listen(process.env.PORT || port);
