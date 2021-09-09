const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000


const appdata = [
  // { name: 'Jane Doe', color: '#ff55ff', message: 'Sometimes all you need is a little splash of color1' },
  // { name: 'Jane Doe', color: '#ffff55', message: 'Sometimes all you need is a little splash of color2' },
  // { name: 'Jane Doe', color: '#55ffff', message: 'Sometimes all you need is a little splash of color3' }
]

/**
 * HTTP Server
 *
 * Delegates requests based on method calls
 */
const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

/**
 * handleGet
 *
 * Processes all GET requests
 * @param request
 * @param response
 */
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  /**
   * sendMessages
   * Basically sends everything from the appdata variable (all the messages stored on the server)
   * @param response
   */
  function sendMessages(response) {
    response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
    response.end(JSON.stringify(appdata))
  }

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if(request.url === '/messages') {
    sendMessages(response)
  }else{
    sendFile( response, filename )
  }
}

/**
 * handlePost
 *
 * Processes all POST requests
 * @param request
 * @param response
 */
const handlePost = function( request, response ) {
  let dataString = ''
  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    switch(request.url) {
      case '/submit':
      {
        const json = JSON.parse( dataString )
        console.log("Received datastring to /submit: " + dataString)

        //Derived field
        json.message = json.name + " says \"" + json.message + "\""

        appdata.push(json)

        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end(JSON.stringify(appdata))
      }
        break;
        /*
        ADD MORE CASES HERE /DELETE, /EDIT
        */
    }


  }, 'end')
}

// /**
//  *
//  * @param primaryColor
//  */
// const colorModifier = function (primaryColor){
//   let red = primaryColor.slice(1,3)
//   let green = primaryColor.slice(3,5)
//   let blue = primaryColor.slice(5, 7)
//
//   red = Math.min(parseInt(red) + )
//   return true
// }

/**
 * sendFile
 *
 * Sends the requested file back to the client, if the file exists. If not, it returns 404
 * @param response
 * @param filename
 */
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
