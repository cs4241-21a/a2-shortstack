const http = require("http"),
  fs = require("fs"),
  mime = require("mime"),
  dir = "public/",
  port = 3000;

// Initialize server data array
const appdata = [
  {
    name: "Apple",
    ticker: "AAPL",
    price: "150",
    shares: "12",
    invested: "1800",
  },
  {
    name: "Google",
    ticker: "GOOGL",
    price: "2800",
    shares: "1",
    invested: "2800",
  },
  {
    name: "Nvidia",
    ticker: "NVDA",
    price: "250",
    shares: "3",
    invested: "750",
  },
  {
    name: "GameStop",
    ticker: "GME",
    price: "200",
    shares: "4",
    invested: "800",
  },
];

// Create server
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

// Handle get requests
const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/load") {
    const type = mime.getType(appdata);
    response.writeHeader(200, { "Content-Type": type });
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

// Handle post requests
const handlePost = function (request, response) {
  let dataString = "";
  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    if (request.url === "/submit") {
      const json = JSON.parse(dataString);
      json.invested = json.price * json.shares;
      appdata.push(json);
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify(appdata));
    } else if (request.url === "/remove") {
      const json = JSON.parse(dataString);
      appdata.splice(json.index, 1);
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify(appdata));
    } else if (request.url === "/edit") {
      const json = JSON.parse(dataString);
      json.invested = json.price * json.shares;
      appdata[json.index].name = json.name;
      appdata[json.index].ticker = json.ticker;
      appdata[json.index].price = json.price;
      appdata[json.index].shares = json.shares;
      appdata[json.index].invested = json.invested;
      response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.end(JSON.stringify(appdata));
    }
  });
};

// Send file with response and filename
const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    if (err === null) {
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

server.listen(process.env.PORT || port);
