const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

let highestId = 2

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
    let json = JSON.parse( dataString )

    // ... do something with the data here!!!
    switch( request.url ){
      case '/add': addTask( json.name, json.period, json.deadline ); break
      case '/edit': editTask( json.id, json.name, json.period, json.deadline ); break
      case '/remove': removeTask( json.id ); break
      default:
    }

    response.writeHead( 200, "OK", { 'Content-Type': 'application/json' } )
    response.end( JSON.stringify( appdata ) )
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

const addTask = function( name, period, deadline ) {
  let id = highestId + 1
  highestId++;

  let ms = 60 * 60 * 1000 // number of milliseconds in an hour
  deadline = Math.round( deadline / ms ) * ms

  let dataEntry = { 'id': id, 'name': name, 'start': Date.parse( Date() ), 'period': period, 'deadline': deadline }
  appdata.push(dataEntry)

  recalculateStarts()
}

const editTask = function( id, name, period, deadline ) {
  let i = appdata.findIndex( ( entry ) => entry.id === id )

  let ms = 60 * 60 * 1000 // number of milliseconds in an hour
  deadline = Math.round( deadline / ms ) * ms

  appdata[i].name = name
  appdata[i].period = period
  appdata[i].deadline = deadline

  recalculateStarts()
}

const removeTask = function( id ) {
  let i = appdata.findIndex( ( entry ) => entry.id === id )

  appdata.splice(i, 1)

  //update highestId to next lowest id if necessary
  if (id === highestId){
    highestId = 0
    appdata.forEach(entry => {
      if ( id > highestId ) {
        highestId = id
      }
    });
  }

  recalculateStarts()
}

const recalculateStarts = function() {
  // calculate latest starts based on deadlines and periods

  // sort by latest deadline first
  appdata.sort( function( entry1, entry2 ) {
    return entry2.deadline - entry1.deadline
  })

  // calculate time to start
  const interval = 60 * 60 * 1000 // one hour in milliseconds
  if ( appdata.length > 0 ) {
    let effectiveDeadline = appdata[0].deadline

    appdata.forEach( ( task ) => {
      if ( task.deadline < effectiveDeadline ) {
        effectiveDeadline = task.deadline
      }
      task.start = effectiveDeadline - ( task.period * interval )
      effectiveDeadline = task.start
    })
  }

  // sort by earliest start first by reversing array
  appdata.reverse()
}

server.listen( process.env.PORT || port )
