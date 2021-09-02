const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const users = {
  'fgalbiati@wpi.edu' : {'password': 'abc123'},
  'john' : {'password': 'aaa111'},
  'amanda' : {'password': 'ab24'},
  'sophia' : {'password': 'asdasd5'}
}

let lostItems = {
  '1': {
    'item': 'Apple Pen',
    'when': '09/01/2021',
    'where': 'FH 311',
    'description': 'White, pen, red cap, Apple original',
    'photo': 'https://google.com',
    'emailme': 'fgalbiati@wpi.edu'
  }
}

let foundItems = {
  '1': {
    'item': 'Apple Pen',
    'when': '09/01/2021',
    'where': 'FH 311',
    'description': 'White, pen, red cap, Apple original',
    'photo': 'https://google.com',
    'emailme': 'fgalbiati@wpi.edu'
  }
}

const server = http.createServer( function( request,response ) {
  if ( request.method === 'GET' ) {
    handleGet( request, response )    
  } else if ( request.method === 'POST' ) {
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if ( request.url === '/api/lostitems') {
    sendData(response, lostItems)
  } else if ( request.url === '/api/founditems') {
    sendData(response, foundItems)
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
    if (request.url === '/api/login') {
      if (login(data)) {
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end()    
        return
      }
      response.writeHead( 403, "Invalid login", {'Content-Type': 'text/plain' })
      response.end()
      return
    } else if (request.url === '/api/create') {
      let filtered = {
        'item' : data.item,
        'when' : data.when,
        'where' : data.where,
        'description' : data.description,
        'photo' : data.photo,
        'emailme' : data.emailme,
      }
      if (data.lost === true) {
        lostItems['2'] = filtered
        console.log("Added to lost items")
        response.writeHeader( 200 )
        response.end() 
      } else if (data.found === true) {
        foundItems['2'] = filtered
        console.log("Added to found items")
        response.writeHeader( 200 )
        response.end() 
      }
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

const sendData = function( response, data ) {
  response.writeHeader( 200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(data))
}

server.listen( process.env.PORT || port )
