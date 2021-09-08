const { getEnvironmentData } = require('worker_threads')

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      DateTime = require("luxon");
      dir  = 'public/',
      port = 3000

// Derived importance (lower is more important):
// days away from due date * priority
const todolist = [
  {"name": "Example task", "duedate": "2021-09-05", "priority": 1, "importance": 1, "category": "Work"},
  {"name": "Example task 2", "duedate": "2021-09-09", "priority": 4, "importance": 1, "category": "School"}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  } else if( request.method === 'POST' ) {
    handlePost( request, response ) 
  } else if (request.method === 'DELETE') {
    handleDelete(request, response)
  } else if (request.method === 'PATCH') {
    handlePatch(request, response)
  }
})

const handleDelete = function(request, response) {
  dataString = ''

  request.on( 'data', function( data ) {
    dataString += data 
  })

  request.on( 'end', function() {
    // Data string is just the indice to remove.
    todolist.splice(dataString, 1)

    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

const handlePatch = function(request, response) {
  dataString = ''

  request.on( 'data', function( data ) {
    dataString += data 
  })

  request.on('end', function() {
    data = JSON.parse(dataString)
    var index = parseInt(data["index"])
    todolist[index]["name"] = data["name"]
    todolist[index]["priority"] = data["priority"]
    todolist[index]["duedate"] = data["duedate"]

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if ( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  } else if (request.url === '/getData') {
    getTodoData(request, response)
  } else{
    sendFile( response, filename )
  }
}

const getTodoData = function(request, response) {
    // Deriving the importance of an item. Lowest it can be is zero (that means do now)
    for (let item of todolist) {
      DateTime.DateTime.now()
      var nowdate = DateTime.DateTime.now()
      var tododate = DateTime.DateTime.fromFormat(item.duedate, "yyyy-LL-dd")
      var diffDays = tododate.diff(nowdate, 'days')
      item.importance = 100 - Math.floor(item.priority * diffDays.toObject().days)
      if (item.importance > 100) {
        item.importance = 100
      }

      if (item.importance < 0) {
        item.importance = 0
      }
      //item.duedate = tododate.toFormat("L/d/yyyy")
    }

    response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
    response.end(JSON.stringify(todolist))
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    var data = JSON.parse(dataString)
    todolist.push(data)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
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
