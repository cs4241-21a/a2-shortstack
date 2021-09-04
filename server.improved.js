const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = [];

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
if (request.url === '/submit'){
    let dataString = ''

    request.on( 'data', function( data ) {
        dataString += data 
    })

    request.on( 'end', function() {
      let entry = JSON.parse( dataString );
      const totalcal = entry.cal * entry.numserv;
      entry.tcal = String(totalcal);
      console.log(entry);
      appdata.push(entry);
    
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(appdata))
    })
  }
else if(request.url === '/update'){
  let dataString = ''

    request.on( 'data', function( data ) {
        dataString += data 
    })

    request.on( 'end', function() {
      let entry = JSON.parse( dataString );

      const totalcal = entry.cal * entry.numserv;
      entry.tcal = String(totalcal);
      console.log(entry);
      for(let i = 0; i < appdata.length; i++){
        if (appdata[i].fname === entry.fname){
          appdata[i].numserv = entry.numserv;
          appdata[i].tcal = entry.tcal;
          break;
        }
      }
      console.log(appdata)
      let updateData = []
      updateData.push(entry);
      
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(updateData))
    })
}
else if(request.url === '/remove'){
  let dataString = ''

    request.on( 'data', function( data ) {
        dataString += data 
    })

    request.on( 'end', function() {
      const newdata = appdata.filter(food => food.fname != dataString.slice(1,-1));
      appdata = newdata;
      console.log(appdata);
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(dataString)
    })
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
