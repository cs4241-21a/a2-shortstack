const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      color = require('color'),
      dir  = 'public/',
      port = 3000

const appdata = [
  {"hex": "#FFFFFF", "rgb": [255, 255, 255], "hsl": [0, 100, 100], "num": 0},
  {"hex": "#000000", "rgb": [0, 0, 0], "hsl": [0, 100, 0], "num": 1},
  {"hex": "#660066", "rgb": [102, 0, 102], "hsl": [300, 100, 20], "num": 2}
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
    console.log( dataString )
    if(dataString === "{}"){
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(appdata))
      return
    }

    const inp = JSON.parse(dataString)

    if(inp.input === "edit"){
      console.log("edit number " + inp.num)
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(inp))
      return
    }

    if(inp.input === "del"){
      console.log("delete number " + inp.num)

      appdata[inp.num] = null

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(inp))
      return
    }

    let col = null
    try{
      col = color(inp.input, inp.format)
    }catch(e){
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end("{}")
      return
    }

    let data = {"hex": col.hex(), 
                "rgb": col.rgb().round().array(), 
                "hsl": col.hsl().round().array(),
                "num": findOpen()}
    appdata[data.num] = data

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(data))
  })
}

const findOpen = function(){
  let i = 0
  for(i; i < appdata.length; i++){
    if(appdata[i] === null){
      break
    }
  }
  if(i == appdata.length){
    appdata.push(null)
  }
  return i
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
