const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {
    responseID: 1,
    name: 'Andrew',
    studentYear: 'Sophomore',
    yearsRemaining: 3,
    favoriteDorm: 'Morgan Hall',
    favoriteDining: 'Campus Center',
    favoriteSpot: 'Salisbury',
    notes: 'Morgan 4 Best Floor!'
  }
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
  } else if (request.url === '/getData') {
    response.writeHeader( 200, { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata));
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    if (request.url === '/submit') {
      appdata.push(JSON.parse(dataString));
    } else if (request.url === '/delete') {
      deleteItem(JSON.parse(dataString));
    }   
     // ... do something with the data here!!!

  for(let i = 0; i < appdata.length; i++) {
      let row = appdata[i];
      row.yearsRemaining = getYearsRemaining(row.studentYear);
  }

  console.log( appdata )

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

const deleteItem = function(jsonData) {
  appdata.splice(jsonData['deletingItem'], 1);
}

function getYearsRemaining(studentYear) {
  let years = -1;
  
  switch (studentYear) {
      case 'First-Year':
          years = 4;
          break;
      case 'Sophomore':
          years = 3;
          break;
      case 'Junior':
          years = 2;
          break;
      case 'Senior':
          years = 1;
          break;
      case 'Graduate Student':
          years = 'N/A';
          break;
      default:
          years = 'N/A';
          break; 
  }
  return years;
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
