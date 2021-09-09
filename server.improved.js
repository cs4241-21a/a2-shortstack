const { report } = require("process");

const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

// Data maintained by the server for the forum
const appdata = [];

// Unique ID which we are assigning every element
let id_counter = 0;

// The server we will be using and how it handles different calls
const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

// Handles all GET calls. Either sends over a file or delivers the forum data
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

// Handles all POST calls, deals with submit, delete, and update
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

// Handles adding an item to the forum
function handleAddition(request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    console.log("\n\nNEW POST DATA REQUEST");

    let dataStringParsed = JSON.parse(dataString);

    let studentHours = getStudentHours(dataStringParsed.StudentRole);

    // Appends data to server storage
    appdata.push({
      StudentName: dataStringParsed.StudentName,
      StudentClass: dataStringParsed.StudentClass,
      StudentRole: dataStringParsed.StudentRole,
      StudentHours: studentHours,
      id: id_counter,
    });

    // Increments id counter to ensure uniqueness
    id_counter = id_counter + 1;

    console.log("appData");
    console.log(appdata);

    const string_app_data = JSON.stringify(appdata);
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    // Sends forum data back to front end
    response.end(string_app_data);
  });
}

// Handles deleting an item from the forum
function handleDeletion(request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    console.log("\n\nNEW DELETE DATA REQUEST");

    let dataStringParsed = JSON.parse(dataString);

    let item_index = -1;

    // Search the forum until we find the id
    for (let i = 0; i < appdata.length; i++) {
      if (String(appdata[i].id) === String(dataStringParsed.id)) {
        item_index = i;
        break;
      }
    }

    // So long as the item exists, remove it
    if (item_index != -1) {
      appdata.splice(item_index, 1);
    }

    console.log("appData");
    console.log(appdata);
    const string_app_data = JSON.stringify(appdata);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });

    // Return the forum data to the front end
    response.end(string_app_data);
  });
}

// Handles updating an item in the forum
function handleUpdate(request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    console.log("\n\nNEW UPDATE DATA REQUEST");

    let dataStringParsed = JSON.parse(dataString);

    // For every item, check if it is the one we need to update it. Then update it when found.
    for (let i = 0; i < appdata.length; i++) {
      if (String(appdata[i].id) === String(dataStringParsed.id)) {
        appdata[i].StudentName = dataStringParsed.StudentName;
        appdata[i].StudentClass = dataStringParsed.StudentClass;
        appdata[i].StudentRole = dataStringParsed.StudentRole;

        let studentHours = getStudentHours(dataStringParsed.StudentRole);

        appdata[i].StudentHours = studentHours;

        break;
      }
    }

    console.log("appData");
    console.log(appdata);

    const string_app_data = JSON.stringify(appdata);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });

    // Return forum data to front end
    response.end(string_app_data);
  });
}

// Handles the get request where we get all forum data
const getInitialDataList = function (response) {
  console.log("\n\nNEW GET INITIAL DATA REQUEST");

  console.log("appData");
  console.log(appdata);

  const string_app_data = JSON.stringify(appdata);

  response.writeHead(200, "OK", { "Content-Type": "text/plain" });

  // Return forum data
  response.end(string_app_data);
};

// Handles sending a file over to the front end
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

// Lists on the respective port for the server
server.listen(process.env.PORT || port);

// Function that converts student role to hours per week
function getStudentHours(studentRole) {
  if (studentRole === "SA") {
    return 10;
  } else if (studentRole === "TA" || studentRole === "GLA") {
    return 20;
  } else {
    return -1;
  }
}
