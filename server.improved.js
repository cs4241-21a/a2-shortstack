const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

class PostRequest {
  constructor(type) {
    this.type = type.requestType;
  }
}

class TableEntry {
 
   constructor(data) {
      this.id = data[0];
      this.fname = data[1];
      this.lname = data[2];
      this.sex = data[3]
      this.ageClass = data[4]; 
      this.dateJoined = data[5];
      this.membershipType = data[6];
      this.expireDate = data[7];
    }
}

const appdata = [
  new TableEntry([1, 'John', 'Stewart', 'Male', 'Master1', '2020-01-11', 'Yearly', '2021-01-11']),
  new TableEntry([2, 'Jimmy', 'McGill', 'Male', 'Junior', '2019-02-15', 'Yearly', '2020-02-15']),
  new TableEntry([3, 'Stewart', 'Johnson', 'Male', 'Open', '2020-03-16', 'Monthly', '2020-04-16'])
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
  } else if (request.url === '/js/scripts.js') {
    sendFile( response, 'public/js/scripts.js' )
  } else if ( request.url === '/css/style.css') {
    sendFile( response, 'public/css/style.css' )
  } else if ( request.url === '/resources/background.jpeg') {
    sendFile( response, 'public/resources/background.jpeg')
  } else if ( request.url === '/resources/logo.jpeg') {
    sendFile( response, 'public/resources/logo.jpeg')
  } else{
    sendAppData( response )
  }
}

const sendAppData = function (response) {
    response.writeHeader(200)
    response.end(JSON.stringify(appdata));

}

const handlePost = function( request, response ) {
  let dataString = ''
  request.on( 'data', function( data ) {
    dataString += data 
  })

  request.on('end', function () {
    newRequest = new PostRequest(JSON.parse ( dataString ))
    console.log( newRequest )
    
    switch ( newRequest.type ) {
      case 'add':
      addNewEntry(dataString, response)
      break
      case 'modify':
      modifyEntry(dataString, response)
      break
      case 'delete':
      deleteEntry(dataString, response)
      break;
      default: 
      response.writeHead( 400, 'Unknown action: Only \'add\' \'modify\' or \'delete\' is allowed', {'Content-Type': 'text/plain' })
      response.end()
    }
  })
}

const addNewEntry = function ( dataString, response ) {
  
  console.log( JSON.parse( dataString ) )

  addRequest = Object.values(JSON.parse( dataString ))
  newTableEntry = new TableEntry(addRequest.slice(1))
  //set the ID of the new element appropriately
  if (appdata.length === 0) {newTableEntry.id = 0} 
  else {newTableEntry.id  = appdata[appdata.length-1].id + 1;}

  newTableEntry.expireDate = calculateExpireDate(newTableEntry)

  if (verifyEntry(newTableEntry)) {
    appdata.push(newTableEntry)
    response.writeHead( 200, 'OK', {'Content-Type': 'text/plain' })
    response.end()
  } else {
    response.writeHead( 400, 'One or more input fields empty', {'Content-Type': 'text/plain' })
  }
}

const modifyEntry = function ( dataString, response) {
  console.log( JSON.parse( dataString ) )

  modifyRequest = Object.values(JSON.parse( dataString ))
  newTableEntry = new TableEntry(modifyRequest.slice(1))

  if (verifyEntry(newTableEntry)) {
    modifyEntryHelper(newTableEntry)
    response.writeHead( 200, 'OK', {'Content-Type': 'text/plain' })
    response.end()
  } else {
    response.writeHead( 400, 'One or more input fields empty', {'Content-Type': 'text/plain' })
  }

}

const deleteEntry = function ( dataString, response) {
  deleteRequest = Object.values(JSON.parse( dataString ))
  console.log( deleteRequest )

  for (let entry of appdata) {
    if (entry.id == deleteRequest[1]) {
      appdata.splice(appdata.indexOf(entry), 1)
    }
  }

  response.writeHead( 200, 'OK', {'Content-Type': 'text/plain' })
  response.end()
}

const modifyEntryHelper = function ( modifiedEntry ) {
  for (let entry of appdata) {
    if (entry.id == modifiedEntry.id) {
      entry.fname = modifiedEntry.fname
      entry.lname = modifiedEntry.lname
      entry.ageClass = modifiedEntry.ageClass
      entry.dateJoined = modifiedEntry.dateJoined
      entry.membershipType = modifiedEntry.membershipType
      entry.expireDate =  calculateExpireDate(entry)
    }
  }
}

const verifyEntry = function (entry) {
  d = new Date(entry.dateJoined)
    dateIsValid = (d.getTime() === d.getTime())
    if (entry.fname === '' || entry.lname === '' || !dateIsValid
      ||  entry.ageClass === '' || entry.membershipType === '')
      {
      return false
      }

    return true
}

const calculateExpireDate = function (entry) {
  expireDate = new Date(entry.dateJoined)

  switch (entry.membershipType) { 
    case 'Monthly':
      expireDate.setMonth(expireDate.getMonth() + 1)
      break;
    case 'Yearly': 
      expireDate.setFullYear(expireDate.getFullYear() + 1)
      break;
    case 'Lifetime':
      expireDate.setFullYear(expireDate.getFullYear() + 100)
      break;
    default:
      console.log('Unknown membership type' + entry.membershipType)
  }

  month = (expireDate.getMonth() + 1)
  date = expireDate.getDate()

  let stringMonth = month
  if (month < 10) {
    stringMonth = '0' + stringMonth
  } 
  let stringDate = date
  if (date < 10) {
    stringDate = '0' + stringDate
  }

  returnString = expireDate.getFullYear() + '-' + stringMonth + '-' + stringDate
  console.log('Returning: ' + returnString)
  return returnString
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
