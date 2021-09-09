const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let serverData = [
]

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
    sendFile(response, 'public/index.html');
  } else if (request.url === '/api' ) {
    handleGetData(request, response);
  } else {
    sendFile(response, filename);
  }
}

const handleGetData = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(serverData));
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse(dataString);
    const index = json["index"];
    const item = json["item"];
    
    if (index > serverData.length - 1) {
      serverData = serverData.concat(item);
    } else if (item === undefined) {
      serverData.splice(index, 1);
    } else {
      serverData[index] = item;
    }
    console.log(serverData);

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
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
