const { getDefaultSettings } = require('http2')

const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

//Sample appdata, replace this with something else as needed
//This is an array holding objects, which is what I want to do for my data until I
//potentially switch to having a persistent database
const appdata = [
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

    if(dataString.slice(0,4) === "EDIT"){
      let rowNum = parseInt(dataString.slice(4,5))
      dataString = dataString.slice(5)
      appdata[rowNum-1] = JSON.parse( dataString )
    } else if(dataString.slice(0,6) === "DELETE"){
      let rowNum = parseInt(dataString.slice(6,7))
      appdata.splice(rowNum - 1, 1)
    } else if (dataString === "GETDATA"){
        //Do nothing here
    } else {
      appdata.push(JSON.parse( dataString ))
    }

    appdata.forEach( element => timeUntilDue(element))

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    //JSON.stringify(appdata[appdata.length-1])
    response.end(JSON.stringify( appdata ))
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

const timeUntilDue = function(data){
  let start = new Date()
          year = start.getFullYear()
          month = start.getMonth() + 1
          date = start.getDate()
          hour = start.getHours()
          minute = start.getMinutes()
          dueYear = parseInt(data.dueDate.slice(0, 4))
          dueMonth = parseInt(data.dueDate.slice(5, 7))
          dueDay = parseInt(data.dueDate.slice(8, 10))
          dueHour = parseInt(data.dueDate.slice(11, 13))
          dueMinute = parseInt(data.dueDate.slice(14, 16))


  let timeLeft = (((((dueYear - year) * 12 +  dueMonth - month) * 30 + dueDay - date) * 24 + dueHour - hour) * 60 + dueMinute - minute)
  
  if(timeLeft < 0){
    data.DueDate = "Overdue!"
  } else {

      let minutesLeft = timeLeft % 60
          hoursLeft = Math.floor(timeLeft / 60) % 24
          daysLeft = Math.floor(timeLeft / 60 / 24) % 30
          monthsLeft = Math.floor(timeLeft / 60 / 24 / 30) % 12
          yearsLeft =  Math.floor(timeLeft / 60 / 24 / 30 / 12)
          dueString = "Due in "

      dueString += yearsLeft > 0 ? yearsLeft + " years " : ""
      dueString += monthsLeft > 0 ? monthsLeft + " months " : ""
      dueString += daysLeft > 0 ? daysLeft + " days " : ""
      dueString += hoursLeft > 0 ? hoursLeft + " hours " : ""
      dueString += minutesLeft > 0 ? minutesLeft + " minutes" : ""

      
    data.DueDate = dueString
  }
  
}

server.listen( process.env.PORT || port )
