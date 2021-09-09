const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {"streamingServiceItem":"Disney+","subscriptionItem":"yes","nameOfItem":"Star Wars: The Clone Wars (2008 TV Series)",
   "watchingAgainItem":"yes","ratingItem":"10","recommendItem":"Yes"}
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
  })

  request.on( 'end', function() {
  //  console.log( JSON.parse( dataString ) )
    // ... do something with the data here!!!
    let parsedInfo = JSON.parse(dataString);
    let resultant1 = parsedInfo.watchAgainItem;
    
    
    if(request.url == '/submit'){
         if (resultant1 == "yes" || resultant1 == "Yes"){ 
           parsedInfo.recommendItem = "Yes"
        } else parsedInfo.recommendItem = "No"
      
      appdata.push(parsedInfo);
    }
    
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata)) //cahnge to app data
    console.log(parsedInfo)
    console.log(resultant1)
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
