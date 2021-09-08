const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  // { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  // { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  // { 'model': 'ford', 'year': 1987, 'mpg': 14} 
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
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
    dataString += data 
    console.log('data', dataString)
  })

  request.on( 'end', function() {
    console.log('end')
    json = JSON.parse( dataString )

    // derived field: volume
    let rain_volume
    switch (json.rain_level) {
      case "light_rain":
        rain_volume = 0.8
        break;
      case "rain":
        rain_volume = 1.0
      case "heavy_rain":
        rain_volume = 1.2
      default:
        break;
    }
    // make rain quieter if there's lofi music
    if (json.lofi === "lofi_on") {
      rain_volume -= 0.2
      
    }
    json.rain_volume = rain_volume.toFixed(1)
    console.log( json )

    // console.log('json in server', json)
    
    // store json
    appdata.push(json)
    console.log('app data', appdata)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
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
