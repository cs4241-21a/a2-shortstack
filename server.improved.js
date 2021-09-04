const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {'name': 'Mike', 'email': 'mike@wpi.edu', 'number': '718-654-980', 'notes': 'Likes to steal cookies'},
  {'name': 'Emma', 'email': 'eemma@wpi.edu', 'number': '718-634-980', 'notes': 'Loves to eat shrimp'},
  {'name': 'Steven', 'email': 'steven@wpi.edu', 'number': '713-654-980', 'notes': 'This guy is mean'},
  {'name': 'Cooper', 'email': 'b@j.com', 'number': '743-234-5678', 'notes': 'This person is the best'}
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

  if(request.url === '/getData') { 
    getDataClient(response, appdata) 
  }
  else if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else{
    sendFile( response, filename )
  }
}

const getDataClient = function(response, data) { 
  console.log('got data')
  const type = mime.getType(data);
  response.writeHead(200, {'Content-Type': type});
  response.end(JSON.stringify(data))
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log(JSON.parse( dataString ) )

    // ... do something with the data here!!!
    if(request.url === '/submit') { addToDatabase(JSON.parse(dataString)) }
    else if(request.url === '/update') { updateItemInDatabase(JSON.parse(dataString)) }
    else if(request.url === '/delete') { deleteItemInDatabase(JSON.parse(dataString)) }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

const addToDatabase = function(json) {
    appdata.push(json)
}

const updateItemInDatabase = function(json) {
  console.log("in server update")
  for(let i =0; i < appdata.length; i++){
    if(i == json['modifyInput']){
      let item = appdata[i];
      item['name'] = json['name']
      item['email'] = json['email']
      item['number'] = json['number']
      item['notes'] = json['notes']
    }
  }
}

const deleteItemInDatabase = function(json) {
  console.log("in server delete")
  appdata.splice(json['modifyInput'],1)
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
