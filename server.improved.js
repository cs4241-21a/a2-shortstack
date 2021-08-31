const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const users = {
  'federico' : {'password': 'abc123'},
  'john' : {'password': 'aaa111'},
  'amanda' : {'password': 'ab24'},
  'sophia' : {'password': 'asdasd5'}
}

let matches = {
  'federico' : ['amanda', 'sophia'],
  'amanda' : ['john']
}

const setDefaults = function() {
  for (const user in users) {
    users[user].preferredTime = 'Morning'
    users[user].major = 'Computer Science'
    users[user].class = '2024'
    users[user].leadership = 'Follower'
    users[user].commitment = '1'
    users[user].location = 'Online'
  }
}

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
  } else if ( request.url === '/api/matches') {
    sendData(response, matches[request.username])
  } else {
    sendFile( response, filename )
  }
}

const login = function ( credentials ) {
  if (credentials.username in users) {
    let password = users[credentials.username].password
    if (credentials.password === password) {
      return true
    }
  }
  return false
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let data = JSON.parse( dataString )
    console.log(data)
    if (request.url === '/api/login') {
      if (login(data)) {
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()    
        return
      }
      response.writeHead( 403, "Invalid login", {'Content-Type': 'text/plain' })
      response.end()
      return
    }
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

     } else {

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

setDefaults()
server.listen( process.env.PORT || port )
