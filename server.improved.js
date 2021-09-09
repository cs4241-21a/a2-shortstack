const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      hostname = '127.0.0.1',
      dir  = 'public/',
      port = 3000

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
      handleGet(request, response);
  } else if( request.method === 'POST' ){
      handlePost(request, response);
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

    if (request.url === '/') {
        sendFile(response, 'public/index.html')
    } else {
        sendFile(response, filename);
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
      const json = JSON.parse(dataString);
      let poggage = '',
      age = parseInt(json.age),
      color = json.color;

      if (age <= 15 || age >= 40) {
          poggage = "No";
      } else if (color === "Brown" || color === "Yellow" || color === "Orange" || color === "Blue" || color === "Red") {
          poggage = "A bit";
      } else {
          poggage = "Yes";
      }

      json.poggage = poggage;

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(json));
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': 'text/plain' })
       response.end( JSON.stringify(json) )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
