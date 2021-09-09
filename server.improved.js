const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let homeworkdata = []

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
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    let jsonDS = JSON.parse( dataString )
    
    //Calculates days left
    let currentDate = new Date()
    let dueDate = new Date(jsonDS.date)
    jsonDS.calculated = Math.round((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60* 24)) + 1
    
    //Attempted to modify assignments when complete field changed
    modifyCompletion(jsonDS)
    
    jsonDS.homework = homeworkdata;
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(jsonDS))
  })
}

const modifyCompletion = function(theobject) {
  for (let i = 0; i < homeworkdata; i++) {
    if(homeworkdata[i].yourassignment == theobject.yourassignment) {
      homeworkdata[i].complete = theobject.complete
      return
    }
  }
  let homework = {
    yourclass: theobject.yourclass,
    yourassignment: theobject.yourassignment,
    complete: theobject.complete,
    date: theobject.date,
    calculated: theobject.calculated
  }
  homeworkdata.push(homework)
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
