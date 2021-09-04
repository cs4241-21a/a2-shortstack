const { parse } = require('path')

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

entryData = [
  //{'name': 'example', 'phoneNum': '123-123-1234', 'birthday': '', 'toGift': true, 'giftBy': ''},
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice(1) 
  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else{
    sendFile( response, filename )
  }
}

//Calculates 30 days before the next birthday 
const calcGiftDate = function(birthday) {
  const today = new Date();
  if(birthday === ''){
    return new Date(today.getFullYear()+1, 0,1).toLocaleDateString()
  }
  const bday = new Date(birthday);
  bday.setFullYear(today.getFullYear());
  getByDay = new Date(bday)
  getByDay.setDate(getByDay.getDate() - 30)

  if (today >= bday) { //This year's birthday has passed so plan for the next one 
	  getByDay.setFullYear(getByDay.getFullYear()+1)
  } 
  return getByDay.toLocaleDateString()
}

//Helper function to remove entry from the array
const deleteEntry = function(entry){
  for (var i = 0; i < entryData.length; i++){
    if (entryData[i].name === entry){
      entryData.splice(i,1)
    }
  }
}

const handlePost = function( request, response ) {
  if (request.url === '/submit'){
    let dataString = ''

    request.on( 'data', function( data ) {
        dataString += data 
    })

    request.on( 'end', function() {
      json = JSON.parse(dataString)
     
      //Removes the old entry if updating a field
      if (json.rowName !== ''){ 
        deleteEntry(json.rowName)
      }
      deleteEntry(json.name) //delete entry if the name already exists 
      
      
      //Derived field, if the gift checkbox was checked calculated when to a gift by aka 30 days before 
      giftByDate = ''
      if (json.toGift === true){
        giftByDate = calcGiftDate(json.birthday)
      }
      json.giftBy = giftByDate
      entryData.push(json)

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(json))
    })
  }

  else if(request.url === '/deleteEntry'){
    let dataString = ''

    request.on( 'data', function( data ) {
        dataString += data 
    })

    request.on( 'end', function() {
      jsonTest = JSON.parse(dataString)
      
      deleteEntry(jsonTest.nameToRemove)

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify('removed'))
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
     }
     else{
       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )
     }
   })
}

server.listen( process.env.PORT || port )
