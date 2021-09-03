const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000


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

    const json = JSON.parse(dataString)
    let advice = ''
    hours = json.hours

    if (hours === "0-4 hours") {

      advice = 'Go get some sleep'
      //json['advice'] = advice

    } else if (hours === "5-7 hours") {

      advice = 'Moderate amount of hours of sleep'
      //json['advice'] = advice

    } else if (hours === "8 hours") {

      advice = 'Perfect amount of hours of sleep'
      //json['advice'] = advice

    } else {

      advice = 'Too much sleep'
      //json['advice'] = advice

    }

    //dataArr.push(json)
    json.advice = advice
    //console.log("dataArr:" + JSON.stringify(dataArr))
    console.log("json: " + JSON.stringify(json))

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    //response.end(JSON.stringify(dataArr))
    response.end(JSON.stringify(json))
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