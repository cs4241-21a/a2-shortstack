const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [];

const server = http.createServer(function(request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method === "DELETE") {
    handleDelete(request, response);
  }
});
const handleDelete = function(request, response) {
  let dataString = "";

  request.on("data", function(data) {
    dataString += data;
  });

  request.on("end", function() {
    // ... do something with the data here!!!

    // Step 1: Parse the Data
    let parsedData = JSON.parse(dataString);
    console.log("Parsing Data");
    console.log("App Data Pre-Splice");
    console.log(appdata);
    appdata.splice(parsedData, 1);
    console.log("App Data Post-Splice");
    console.log(appdata);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  });
};
const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
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
    // Step 1: Parse the Data
    let parsedData = JSON.parse(dataString);

    // Step 2: Create a Derived Field(s)
    parsedData.age = 2021 - parsedData.purchase_year;
    parsedData.estimated_value =
      parsedData.purchase_price * 0.8 -
      (2021 - parsedData.purchase_year) * 100 -
      parsedData.miles / 10 -
      parsedData.repairs * 100;

    // Step 3: Take the Data and push it to appdata (for rendering)
    appdata.push(parsedData);

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

server.listen(process.env.PORT || port);
