const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { "name": "Aditya Kumar", "lang": "CSS", "starter": "Bulbasaur", "icream": "Vanilla"},
  { "name": "Gary Oak", "lang": "HTML", "starter": "Squirtle", "icream": "Vanilla"},
  { "name": "Seto Kaiba", "lang": "JS", "starter": "Squirtle", "icream": "Chocolate"},
  { "name": "Yu Narukami", "lang": "HTML", "starter": "Bulbasaur", "icream": "Vanilla"},
  { "name": "Roy Mustang", "lang": "JS", "starter": "Charmander", "icream": "Vanilla"},
  { "name": "Raiden Shogen", "lang": "CSS", "starter": "Bulbasaur", "icream": "Vanilla"},
  { "name": "Zeke von Genbu", "lang": "CSS", "starter": "Bulbasaur", "icream": "Chocolate"},
]

// add entry to appdata
function addEntry(dataString) {
  dataEntry = JSON.parse(dataString);
  appdata.push(dataEntry);
}

// delete entry to appdata
function deleteEntry(dataString) {
  json = JSON.parse(dataString);
  appdata.splice(json["index"], 1);
}

function sendUpdate(response) {
  const type = mime.getType(appdata);
  response.writeHead(200, {'Content-Type': type});
  response.write(JSON.stringify(appdata));
  response.end()
}

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) sendFile( response, 'public/index.html' )
  else if (request.url === '/update') sendUpdate(response);
  else sendFile( response, filename )
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    // json =  JSON.parse( dataString )
    // console.log(json)
    if(request.url === '/add') addEntry(dataString);
    if(request.url === '/delete') deleteEntry(dataString);


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
