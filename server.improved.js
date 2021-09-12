const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = [
  { 'totP': 90, 'slicePer': 2, 'gfP': 0, 'large': 18, 'medium': 0, 'small': 0, 'largeGf': 0, 'mediumGf': 0, 'smallGf': 0},
  { 'totP': 20, 'slicePer': 1, 'gfP': 0,  'large': 4, 'medium': 0, 'small': 0, 'largeGf': 0, 'mediumGf': 0, 'smallGf': 0},
  { 'totP': 18, 'slicePer': 2, 'gfP': 0,  'large': 1, 'medium': 1, 'small': 0, 'largeGf': 0, 'mediumGf': 0, 'smallGf': 0}
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
    
    const dataSet = JSON.parse(dataString);

    var totalP = parseInt(dataSet.totP);
    var slicesEa = parseInt(dataSet.slicePer);
    var gfPeople = parseInt(dataSet.gfP);

    //Initialize vars
    var pNoGf = totalP - gfPeople; //people that aren't gf
    var totalSl = slicesEa * pNoGf; //total slices needed 
    var totalGf = slicesEa * gfPeople; //total slices for gf
    var large = 0;
    var medium = 0;
    var small = 0;
    var largeGf = 0;
    var mediumGf = 0;
    var smallGf = 0;

    //Time to be greedy, Boys
    while(totalSl > 6){
      if((totalSl - 10) >= 0){
        large++;
        totalSl -= 10;
      } else if((totalSl - 8) >= 0){
          medium++;
          totalSl -= 8;
      } else {
        small++;
        totalSl -= 6;
      }
    }

    if(totalSl > 0 && totalSl <= 6){
      small++;
    }

    while(totalGf > 6){
      if((totalGf - 10) >= 0){
        largeGf++;
        totalGf -= 10;
      } else if((totalGf - 8) >= 0){
          mediumGf++;
          totalGf -= 8;
      } else {
        smallGf++;
        totalGf -= 6;
      }
    }

    if(totalGf > 0 && totalGf <= 6){
      small++;
    }

    //Add new fields to object
    dataSet.large = large;
    dataSet.medium = medium;
    dataSet.small = small;
    dataSet.largeGf = largeGf;
    dataSet.mediumGf = mediumGf;
    dataSet.smallGf = smallGf;

    //Add data to array
    appdata.push(dataSet);

    //Make it a string to return
    var finalPass = JSON.stringify(dataSet);

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(finalPass) //sending that string over
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
