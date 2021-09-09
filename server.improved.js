const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

var appdata = [
  { 'title': 'Animal Farm', 'author': 'George Orwell', 'year': 2003, 'rating': 2 },
  { 'title': 'The Sun Also Rises', 'author': 'Ernest Hemingway', 'year': 1957, 'rating': 4 },
  { 'title': 'Title 3', 'author': 'Author 3', 'year': 2020, 'rating': 2 },
  { 'title': 'Title 1', 'author': 'Author 1', 'year': 2000, 'rating': 4 },
  { 'title': 'Title 2', 'author': 'Author 2', 'year': 1900, 'rating': 5 }
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
   console.log(`handlePost request: ${request}`);
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse( dataString )
    json.rank = 4
    // appdata = {...appdata, ...json}
    appdata.push(json)
    appdata.sort(function ( a, b ) {
      if ( a.rating < b.rating ){
        return 1;
      }
      if ( a.rating > b.rating ){
        return -1;
      }
      if( a.year < b.year){
        return 1;
      }
      if ( a.year > b.year){
        return -1;
      }
      return 0;
    })
    for(var i = 0; i < appdata.length; i++){
      appdata[i].rank = i+1
    }

    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    // response.write(JSON.stringify(appdata[0]));
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
