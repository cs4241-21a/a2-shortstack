const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library used in the following line of code
  mime = require("mime"),
  dir = "public/",
  port = 3000;

const MSG_ERROR_NAME_BLANK = "Task Name field is required.";
const MSG_ERROR_FIELD_INVALID = "Priority and Due Date must be both blank or both populated.";
const MSG_ERROR_NEW_TASK = "For a new task, both Priority must be populated.";
const MSG_SUCCESS_ADD = "Successfully added a new task.";
const MSG_SUCCESS_MODIFY = "Successfully modified an existing task.";
const MSG_SUCCESS_DELETE = "Successfully deleted a task.";
const ACTION_NONE = "none";
const ACTION_ADD = "add";
const ACTION_MODIFY = "modify";
const ACTION_DELETE = "delete";

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
  } else {
    sendFile(response, filename);
  }
};

let tasks = [];

function handleInput(reply, input) {
  //Validate input fields
  if (input.taskname == "") {
    reply.message = MSG_ERROR_NAME_BLANK;
    reply.action = ACTION_NONE;
    return;
  }
  if (input.priority == "") {
    if (input.duedate != "") {
      reply.message = MSG_ERROR_FIELD_INVALID;
      reply.action = ACTION_NONE;
      return;
    }
  }
  if (input.duedate == "" || input.duedate == null) {
    if (input.priority != "") {
      reply.message = "test";
      reply.action = ACTION_NONE;
      return;
    }
  }
  if (tasks.length == 0) {
    if (input.priority == "" && input.duedate == "") {
      reply.message = MSG_ERROR_NEW_TASK;
      reply.action = ACTION_NONE;
      return;
    }
  }
  let dueDate = new Date(input.duedate);
  let currentDate = new Date();
  let remainingdate = 0;
 
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskname == input.taskname) {
      if (input.priority == "") {
        // Delete Task
        tasks.splice(i,1)
        reply.message = MSG_SUCCESS_DELETE;
        reply.action = ACTION_DELETE;
        return;
      } else {
        // Modify Task
        tasks[i].priority = input.priority;
        tasks[i].duedate = input.duedate;
        tasks[i].remainingdate = Math.round(
          (dueDate.getTime() - currentDate.getTime()) / (24 * 3600 * 1000)
        );
        reply.message = MSG_SUCCESS_MODIFY;
        reply.action = ACTION_MODIFY;
        return;
      }
    }
  }
  //Calculate Remaining Date
  remainingdate = Math.round(
    (dueDate.getTime() - currentDate.getTime()) / (24 * 3600 * 1000)
  );

  let task = {
    taskname: input.taskname,
    priority: input.priority,
    duedate: input.duedate,
    remainingdate: remainingdate
  };
  tasks.push(task);

  reply.message = MSG_SUCCESS_ADD;
  reply.action = ACTION_ADD;
  return;
}

const handlePost = function(request, response) {
  let jsonResponse = {};

  request.on("data", function(data) {
    const inputJson = JSON.parse(data);
    handleInput(jsonResponse, inputJson);

    jsonResponse.tasks = tasks;
  });

  request.on("end", function() {
    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(JSON.stringify(jsonResponse));
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
