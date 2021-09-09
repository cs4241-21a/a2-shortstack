const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'name': 'Ben+Robinson', 'responsibility': "equal", 'watch': "y", 'fan': "y"}
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

  console.log(request.url)
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if(request.url === '/getdata'){
    sendData(response, 'public/index.html')
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {

    console.log(dataString)
    
    
    let responsible = dataString.substring(16,21)
    let watch = dataString.substring(28,29)
    let name = dataString.substring(39,dataString.length)
    
    let fan = "n";
    if(responsible == "equal" && watch == "y"){
      fan = "y"
    }


    
    console.log(name)
    console.log(responsible)
    console.log(watch)
    console.log(fan)

//     console.log(appdata)
    
    let json = { 'name': name, 'responsibility': responsible, 'watch': watch, 'fan': fan}
    appdata.push(json)
    
    // console.log(appdata)
    
    const type = mime.getType( 'public/index.html' ) 
   fs.readFile( 'public/index.html' , function( err, content ) {

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

const sendData = function( response, filename ) {
   const type = mime.getType( filename ) 
   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( JSON.stringify(appdata) )
      
     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
