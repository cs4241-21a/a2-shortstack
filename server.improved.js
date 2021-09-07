const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = []

let dataCount = 0
let id = 0

const rollDice = function( type, quantity, mod) {
  totalRoll = 0

  for (i = 0; i < parseInt(quantity,10); i++) {
    let baseRoll = Math.floor(Math.random() * parseInt(type,10));
    totalRoll += (baseRoll + 1)
  }

  return(totalRoll + parseInt(mod,10))
}


const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )
  }else if( request.method === 'POST' ){
    handlePost( request, response )
  }
})

//
const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 )

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if ( request.url === "/clear") {
    clearRolls(response)
  }
  else if (request.url === "/load") {
    sendTable(response)
  }
  else{
    sendFile( response, filename )
  }
}

//
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data
  })

  request.on( 'end', function() {
    let data = JSON.parse(dataString)

    if(request.url === "/add") {
      if(addRoll(data)) {
        sendTable(response)
      }
      else{
        response.writeHead(400, "Add failed", {'Content-Type': 'text/plain'});
        response.end();
      }
    }
    else if(request.url === "/delete") {
      if(deleteRoll(data)) {
        sendTable(response)
      }
      else{
        response.writeHead(400, "Delete failed", {'Content-Type': 'text/plain'});
        response.end();
      }
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}


//
const addRoll = function(data) {
  /*
  Data Validation:
    character must not be: ""
    quantity must not be: NaN, <= 0
    modifier must not be: NaN, < 0
  */
  if (data.quantity <= 0 || data.modifier < 0 ||
      isNaN(data.quantity) || isNaN(data.modifier) ||
      data.character.length == 0) {

      return false
  }

  thisRoll = rollDice(data.diceType,data.quantity,data.modifier)

  json = {
      "id" : id,
      "character" : data.character,
      "diceType" : data.diceType,
      "quantity" : data.quantity,
      "modifier" : data.modifier,
      "roll" : thisRoll
  }

  appdata.push(json)

  id++
  dataCount++

  console.log("TO ADD:")
  console.log(json)

  return true
}

//
const deleteRoll = function(data) {
  /*
  Data Validation:
    Only one of Character or ID must not be none.
    ID must not be : NaN, < 0, > id
    Charater must not be: "" if ID is none.
  */
  if (data.id < 0 || data.id > id || isNaN(data.id)) {
    return false
  }

  // Loop Through the data to find correct row.
  let index = -1
  for(let i = 0; i < dataCount; i++) {
      if (appdata[i].id == data.id) {
        index = i
        break
      }
  }

  if(index === -1) {
    return false
  }

  appdata.splice(index, 1)
  dataCount--

  console.log("TO DELETE:")
  console.log(appdata[index])

  return true

}

//
const clearRolls = function(response) {
  appdata = []
  dataCount = 0
  id = 0
  sendTable(response)
}

//
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

//
const sendTable = function(response) {
    let json = {
        "nRows": dataCount,
        "rowData": []
    }

    for(let i = 0; i < dataCount; i++){
        json["rowData"].push(appdata[i]);
    }

    let body = JSON.stringify(json);
    response.writeHead(200, "OK", {"Content-Type": "text/plain"});
    response.end(body);
}

server.listen( process.env.PORT || port )
