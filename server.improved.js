const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3001

let appdata = []

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if( request.url === '/get' ) {
    response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
    response.write(JSON.stringify(appdata));
    response.end();
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let data = JSON.parse(dataString);
    console.log(data);

    switch(data.action) {
      case "add":
        // copying the fields manually is more secure than blindly copying the whole object
        appdata.push({
          task: data.payload.task,
          priority: data.payload.priority,
          creationDate: data.payload.creationDate,
          deadline: calcDeadline(data.payload),
        });
        break;
      case "modify":
        appdata[data.index].task = data.payload.task;
        appdata[data.index].priority = data.payload.priority;
        appdata[data.index].deadline = calcDeadline(appdata[data.index]);
        break;
      case "delete":
        appdata.splice(data.index, 1);
        break;
      default:
        // invalid POST request
        response.writeHead(400);
        response.end();
        return;
    }

    response.writeHead( 200, "OK", {'Content-Type': 'application/json' });
    response.write(JSON.stringify(appdata));
    response.end();
  })
}

const calcDeadline = function(data) {
  let date = new Date(data.creationDate);
  date.setDate(date.getDate() + { low: 10, medium: 7, high: 4 }[data.priority]);
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
