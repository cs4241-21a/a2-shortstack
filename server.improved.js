const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = []

// Callback
const server = http.createServer( function( request,response ) {
  // Checks if the request is a GET or POST or etc... Does different things based on type of request
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
  }
  else if (request.url === '/load') {
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    let json = {data: appdata}
    response.end(JSON.stringify(json)) // pass strings through
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let new_entry =  JSON.parse( dataString )
    // Not sure if here, but you have to stringify your JS objects before you send them on a webserver. (JSON object).
    // Once it gets to the other end (client or serve) you parse it to turn it back in JS object

    // ... do something with the data here!!!

    // appdata.push(new_entry)
    let today = new Date().toLocaleDateString()
    let deadline = new Date(today)

    if(new_entry["urgency"]) {
      deadline.setDate(deadline.getDate() + 1)
    }
    else {
      deadline.setDate(deadline.getDate() + 7); // Deadline is in a week
    }

    new_entry["creation_date"] = today;
    new_entry["deadline"] = deadline.toLocaleDateString();

    appdata.push(new_entry)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    let json = {data: appdata}
    response.end(JSON.stringify(json)) // pass strings through

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
