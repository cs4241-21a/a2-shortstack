const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {'yourname': 'Greg', 'score': 7500, 'rank': 1},
  {'yourname': 'Mark', 'score': 6879, 'rank': 2},
  {'yourname': 'Liam', 'score': 5900, 'rank': 3}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

function sendAppData(response, data){
  const type = mime.getType(appdata);
  response.writeHead(200,{'Content-Type': type});
  response.write(JSON.stringify(data));
  response.end();
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice(1)

  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  } else if (request.url === '/updatePage'){
    sendAppData(response, appdata);
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
    //console.log( JSON.parse( dataString ) )
    const json = JSON.parse(dataString)
    // ... do something with the data here!!!
    if(request.url === '/submit') {
      addRowToTable(dataString);
    } else if (request.url === '/delete'){
      deleteRowFromTable(dataString);
    } else if (request.url === '/modify'){
      modifyRowFromTable(dataString);
    }
    console.log("appdata:\n" + JSON.stringify(appdata));
    response.writeHead(200,"OK", {'Content-Type': 'text/plain'});
    response.end();

  })
}

function addRowToTable(dataString) {
  let jsonApp = JSON.parse(dataString);
  console.log("jsonApp:\n" + JSON.stringify(jsonApp))

  jsonApp['rank'] = calcRank(jsonApp);
  console.log("jsonApp:\n" + JSON.stringify(jsonApp))
  appdata.push(jsonApp);
}

function deleteRowFromTable(dataString) {
  for (let i = 0; i < appdata.length; i++) {
    let row = appdata[i];
    console.log("dataString = " + dataString.slice(5));
    if ((i + 1).toString() === dataString.slice(5)) appdata.splice(i, 1);
  }
} // later add user check

function modifyRowFromTable(dataString) {
  let jsonApp = JSON.parse(dataString);
  for (let i = 0; i < appdata.length; i++) {
    console.log("i = " + i);
    console.log("jsonApp = " + jsonApp['modifyIndex']);
    if ((i + 1).toString().normalize() === (jsonApp['modifyIndex'].toString().normalize())) {
      let row = appdata[i];
      row['name'] = jsonApp['name'];
      row['score'] = jsonApp['score'];
      row['rank'] = jsonApp['rank'];
    }
  }
}

function calcRank(score){
  let rank = 0;
  // look at all scores and find what rank it is

  updateRank(rank);
  return rank;
} // Unfinished

function updateRank(rank){
  // for each rank of value rank or lower add 1 to number
} // Unfinished

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
