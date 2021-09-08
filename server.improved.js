const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

//const appdata = [
//  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
//  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
//  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
//]

const appdata = [
  { "foodname": "apple", "foodcategory": "fruit", "foodquantity": 3, "expirationdate": new Date("2021-09-22")},
  { "foodname": "onion", "foodcategory": "vegetable", "foodquantity": 1, "expirationdate": new Date("2021-09-24")},
  { "foodname": "bread", "foodcategory": "grain", "foodquantity": 4, "expirationdate": new Date("2021-09-19")}
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
    console.log( JSON.parse( dataString ) )

    if (request.url === "/submitAddFood"){
      handleSubmitAddFood( request, dataString );
    }
    else if (request.url === "/submitRemoveFood") {
      handleSubmitRemoveFood( request, dataString );
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    //console.log(response);
    //response.body = ( JSON.stringify( appdata ));
    //console.log(response.body);
    response.end( JSON.stringify( appdata ))
  })
}

const handleSubmitAddFood = function ( request, dataString ) {
  // ... do something with the data here!!!
  console.log(request.url);
  console.log("----------Processing Data------------");
  console.log("Original AppData:");
  console.log(appdata);

  data = JSON.parse( dataString);
  data.foodquantity = parseInt(data.foodquantity);
  data.expirationdate = new Date(data.expirationdate);
  
  appdata.push( data );
  
  
  console.log("----------New AppData----------------");
  console.log(appdata);
}

const handleSubmitRemoveFood = function ( request, dataString ) {

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
