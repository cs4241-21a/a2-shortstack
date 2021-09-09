const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'assignment': 'Example Assignment', 'course': 'Fake Course', 'percentage': 5, 'priority': "Low", 'itemIndex': 1},
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

function passClientData(response, data) {
  const type = mime.getType(appdata);
  response.writeHead(200, {'Content-Type': type});
  response.write(JSON.stringify(data));
  response.end()
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if( request.url === '/edit' ) {
    passClientData(response, appdata);
  } 
  else if( request.url === '/add' ) {
    passClientData(response, appdata);
  } 
  else if( request.url === '/complete' ) {
    passClientData(response, appdata);
  } 
  else {
    sendFile( response, filename )
  }
}

function calculatePriority(hw) {
  if(hw['percentage'] >= 20)
    return "High";
  else
    if(hw['percentage'] < 10)
      return "Low";
    else 
      return "Medium";
}

function addRow(dataString) {
  let json = JSON.parse(dataString);
  //Derived attribute.
  console.log("\n\njson output:" + JSON.stringify(json))

  json['priority'] = calculatePriority(json);
  console.log("\n\njson with derived:" + JSON.stringify(json))
  appdata.push(json);
}

function completeRow(dataString) {
  let subData = dataString.substring(dataString.indexOf("itemIndex"))
  const index = parseInt(subData.substring(subData.indexOf(':')+1,subData.indexOf('}')))

  appdata.splice(index-1, 1)

  for (let i = 0; i < appdata.length; i++) {
    if(appdata[i].itemIndex >= index)
      appdata[i].itemIndex--
  }

  console.log("\n server data (after delete) = " + JSON.stringify(appdata)); 
}

function editRow(dataString) {
  let json = JSON.parse(dataString);
  for (let i = 0; i < appdata.length; i++) {
    console.log("\ni = " + i);
    console.log("json output = " + json['itemIndex']);
    if ((i + 1).toString().normalize() === (json['itemIndex'].toString().normalize())) {
      let row = appdata[i];
      row['assignment'] = json['assignment'];
      row['course'] = json['course'];
      row['percentage'] = json['percentage'];
      row['priority'] = calculatePriority(row);
    }
  }
}

// assemble all information/packets in some way
const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log(dataString)

    if(request.url === '/add') 
      addRow(dataString);
    else if (request.url === '/complete') 
      completeRow(dataString);
    else if(request.url === '/edit') 
      editRow(dataString);

    console.log("server data:\t" + JSON.stringify(appdata));
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