const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  // some examples:
  // { "foodname": "apple", "foodcategory": "fruit", "foodquantity": 3, "expirationdate": new Date("2021-09-22"), "percentofcategory": 100},
  // { "foodname": "onion", "foodcategory": "vegetable", "foodquantity": 1, "expirationdate": new Date("2021-09-24"), "percentofcategory": 100},
  // { "foodname": "bread", "foodcategory": "grain", "foodquantity": 4, "expirationdate": new Date("2021-09-19"), "percentofcategory": 100}
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
    response.end( JSON.stringify( appdata ))
  })
}

const handleSubmitAddFood = function ( request, dataString ) {

  data = JSON.parse( dataString);
  data.foodquantity = parseInt(data.foodquantity);
  data.expirationdate = new Date(data.expirationdate);
  data.percentofcategory = 0;

  for (let i = 0; i < appdata.length; i++) {
    if (data.foodname === appdata[i].foodname
      && data.expirationdate.getTime() === appdata[i].expirationdate.getTime()) {
        // add to matching item
        appdata[i].foodquantity += data.foodquantity;
        updateDerivedField(data.foodcategory);
        return;
      }
  }
  
  appdata.push( data );
  updateDerivedField(data.foodcategory);
}

const handleSubmitRemoveFood = function ( request, dataString ) {
  console.log(request.url);
  console.log(appdata);

  data = JSON.parse(dataString);
  data.foodquantity = parseInt(data.foodquantity);
  data.expirationdate = new Date(data.expirationdate);

  for (let i = 0; i < appdata.length; i++) {
    if (data.foodname === appdata[i].foodname
      && data.expirationdate.getTime() === appdata[i].expirationdate.getTime()) {
        // remove matching item
        appdata[i].foodquantity -= data.foodquantity;
        if (appdata[i].foodquantity <= 0) {
          appdata.splice(i, 1);
        }
      }
  }

  updateDerivedField(data.foodcategory);
}

const updateDerivedField = function ( category ) {

  // Find the total quantity for the given category
  let quantitySum = 0;
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].foodcategory === category) {
      quantitySum += appdata[i].foodquantity;
    }
  }

  // Find the proportion of each item relative to the total quantity.
  for (let j = 0; j < appdata.length; j++) {
    if (appdata[j].foodcategory === category) {
      appdata[j].percentofcategory = (appdata[j].foodquantity / quantitySum) * 100;
    }
  }
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
