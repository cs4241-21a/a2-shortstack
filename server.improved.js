const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'id': 0, 'name': 'Test Task', 'start': Date.parse('2021-09-07T00:00'), 'period': 20 , 'deadline': Date.parse('2021-09-09T12:00') },
  { 'id': 1, 'name': 'Placeholder', 'start': Date.parse('2021-09-07T20:00'), 'period': 20 , 'deadline': Date.parse('2021-09-09T12:00') },
  { 'id': 2, 'name': 'Something', 'start': Date.parse('2021-09-08T16:00'), 'period': 20 , 'deadline': Date.parse('2021-09-09T12:00') } 
]

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
    console.log( json )

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

  let numPeriod = Number.parseInt(period)

  let dateDeadline = Date.parse(deadline)

  let dataEntry = { 'id': id, 'name': name, 'start': Date.parse(Date()), 'period': numPeriod, 'deadline': dateDeadline }
  appdata.push(dataEntry)

  recalculateStarts()
}

const editTask = function( id, name, period, deadline ) {
  let numId = Number.parseInt(id)

  let numPeriod = Number.parseInt(period)

  let dateDeadline = Date.parse(deadline)

  let i = appdata.findIndex( ( entry ) => entry.id === numId )

  appdata[i].name = name
  appdata[i].period = numPeriod
  appdata[i].deadline = dateDeadline

  recalculateStarts()
}

const removeTask = function( id ) {
  let numId = Number.parseInt(id)

  let i = appdata.find( ( entry ) => entry.id === numId )

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
  // TODO calculate latest starts based on deadlines and periods
}

server.listen( process.env.PORT || port )
