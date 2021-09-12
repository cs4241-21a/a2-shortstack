const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      { v4: uuidv4 } = require("uuid"),
      dir  = 'public/',
      port = 3000

const appdata = [
]


const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }else if (request.method === 'DELETE'){
    handleDelete (request, response)
  }
})

const handleDelete = function( request, response ){

let dataString = ''

request.on( 'data', function( data ) {
  dataString += data 
})

request.on( 'end', function() {
let deleteMe = JSON.parse( dataString );

appdata.forEach((entry) => {
  if (entry.id === deleteMe.id) {
    appdata.splice(appdata.indexOf(entry), 1);
  }
});

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
})
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
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
    incomingData = JSON.parse( dataString );

    //add unique ID for deletion purposes
    uid = uuidv4();
    incomingData.id = uid;
    console.log( incomingData )

    //add/change rarity status
    incomingData.rare = false;
    let repeats = appdata.filter(e => e.family === incomingData.family);
    if (repeats.length > 0){
      for (let i = 0; i<repeats.length; i++){
        repeats[i].rare = false;
      }
    }else{
      incomingData.rare = true;
    }

    appdata.push(incomingData)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
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
