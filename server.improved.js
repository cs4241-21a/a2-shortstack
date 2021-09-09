const http = require( 'http' );
const fs   = require( 'fs' );
const mime = require( 'mime' );
const dir  = 'public/';
const port = 3000;

let appdata = [
  {
    firstName: 'John',
    lastName: 'Doe',
    birthday: '2000-1-1',
    age: 21,
    fullName: 'John Doe'
  }
];

const server = http.createServer(function(request,response) {
  if(request.method === 'GET') {
    handleGet(request, response);
  }else if(request.method === 'POST'){
    handlePost(request, response);
  }
});

const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);

  if(request.url === '/') {
    sendFile(response, 'public/index.html');
  } else {
    sendFile(response, filename);
  }
}

function handlePost(request, response) {
  if(request.url === '/submit') {
    handleSubmit(request, response);
  } else if (request.url === '/getData') {
    handleGetData(request, response);
  }
}

function handleGetData(request, response) {
  response.writeHead(200, "OK", {'Content-Type': 'text/plain' });
  response.end(JSON.stringify({appdata: appdata}));
}

function handleSubmit(request, response) {
  let dataString = '';

  request.on('data', function(data) {
      dataString += data;
  });

  request.on('end', function() {
    const jsonInput = JSON.parse(dataString);
    // Gets age of person
    const today = new Date();
    const birthday = new Date(jsonInput.birthday);
    let age = today.getFullYear() - birthday.getFullYear();
    let m = today.getMonth() - birthday.getMonth();
    if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    jsonInput.age = age;
    jsonInput.fullName = jsonInput.firstName + ' ' + jsonInput.lastName;

    appdata.push(jsonInput);

    console.log(appdata);

    response.writeHead(200, "OK", {'Content-Type': 'text/plain' });
    response.end();
  })
}

function sendFile(response, filename) {
   const type = mime.getType(filename)

   fs.readFile(filename, function(err, content) {
     if(err === null) {
       response.writeHeader(200, { 'Content-Type': type });
       response.end(content);
     }else{
       response.writeHeader(404);
       response.end('404 Error: File Not Found');
     }
   })
}

server.listen(process.env.PORT || port);
