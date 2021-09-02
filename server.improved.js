const { report } = require("process");

const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const appdata = [];

let id_counter = 0;

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/initializeData") {
    getInitialDataList(response);
  } else {
    sendFile(response, filename);
  }
};

const handlePost = function (request, response) {
  if (request.url === "/submit") {
    handleAddition(request, response);
  } else if (request.url === "/deleteEntry") {
    handleDeletion(request, response);
  } else if (request.url === "/updateEntry") {
    handleUpdate(request, response);
  } else {
    console.log("I don't know what you want me to do!");
  }
};

function handleAddition(request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    console.log("\n\nNEW POST DATA REQUEST");

    let dataStringParsed = JSON.parse(dataString);

    appdata.push({
      StudentName: dataStringParsed.StudentName,
      StudentClass: dataStringParsed.StudentClass,
      StudentRole: dataStringParsed.StudentRole,
      id: id_counter,
    });

    id_counter = id_counter + 1;

    console.log("appData");
    console.log(appdata);

    const string_app_data = JSON.stringify(appdata);
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(string_app_data);
  });
}

function handleDeletion(request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    console.log("\n\nNEW DELETE DATA REQUEST");

    let dataStringParsed = JSON.parse(dataString);

    let item_index = -1;

    for (let i = 0; i < appdata.length; i++) {
      if (String(appdata[i].id) === String(dataStringParsed.id)) {
        item_index = i;
        break;
      }
    }

    if (item_index != -1) {
      appdata.splice(item_index, 1);
    }

    console.log("appData");
    console.log(appdata);
    const string_app_data = JSON.stringify(appdata);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });

    response.end(string_app_data);
  });
}

function handleUpdate(request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    console.log("\n\nNEW UPDATE DATA REQUEST");

    let dataStringParsed = JSON.parse(dataString);

    console.log("dataStringParsed");
    console.log(dataStringParsed);

    for (let i = 0; i < appdata.length; i++) {
      if (String(appdata[i].id) === String(dataStringParsed.id)) {
        appdata[i].StudentName = dataStringParsed.StudentName;
        appdata[i].StudentClass = dataStringParsed.StudentClass;
        appdata[i].StudentRole = dataStringParsed.StudentRole;
        break;
      }
    }

    console.log("appData");
    console.log(appdata);

    const string_app_data = JSON.stringify(appdata);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });

    response.end(string_app_data);
  });
}

const getInitialDataList = function (response) {
  console.log("\n\nNEW GET INITIAL DATA REQUEST");

  console.log("appData");
  console.log(appdata);

  const string_app_data = JSON.stringify(appdata);

  response.writeHead(200, "OK", { "Content-Type": "text/plain" });

  response.end(string_app_data);
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
