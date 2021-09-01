const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  { v4: uuidv4 } = require("uuid"),
  url = require("url");

const dir = "public/";
const port = 3000;

const appdata = [
  {
    name: "Jack Sullivan",
    gender: "Male",
    birthday: "2001-03-01",
    age: "20",
    country: "United States",
  },
  {
    name: "Barack Obama",
    gender: "Male",
    birthday: "1961-08-04",
    age: "60",
    country: "United States",
  },
];

appdata.forEach((person) => {
  person.uuid = uuidv4();
  console.log(person);
});

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  } else if (request.method === "DELETE") {
    handleDelete(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/data") {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(appdata));
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const data = JSON.parse(dataString);

    // ... do something with the data here!!!
    if (request.url === "/data") {
      data.uuid = uuidv4();

      const birth = new Date(data.birthday);
      const today = new Date();

      const diff = today - birth;

      data.age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

      console.log("Adding new entry: ");
      console.log(data);

      appdata.push(data);
    }

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end();
  });
};

const handleDelete = (req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname !== "/data") {
    res.writeHead(400, "WTF", { "Content-Type": "text/plain" });
    res.end();
  }

  appdata.forEach((person) => {
    if (person.uuid === query.uuid) {
      console.log(`Deleting user with UUID ${query.uuid}`);
      const idx = appdata.indexOf(person);
      appdata.splice(idx, 1);
    }
  });
  res.writeHead(200, "OK", { "Content-Type": "text/plain" });
  res.end();
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
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
