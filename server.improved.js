const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'name': 'AAA', 'score': 43, 'game': 'Mario Bros.', 'highscore': true, 'id': 0},
  { 'name': 'ABC', 'score': 67, 'game': 'Donkey Kong', 'highscore': true, 'id': 1},
  { 'name': 'ZZZ', 'score': 168, 'game': 'Street Racing', 'highscore': true, 'id': 2},
  { 'name': 'E', 'score': 2, 'game': 'Mario', 'highscore': false, 'id': 3}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response );
  }else if( request.method === 'POST' ){
    handlePost( request, response );
  }
})

const handleGet = function( request, response ) {
  console.log(request.url);
  const filename = dir + request.url.slice( 1 );

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' );
  } else if(request.url === '/update') {
    const type = mime.getType(appdata);
    response.writeHead(200, {'Content-Type': type});
    response.write(JSON.stringify(appdata));
    response.end();
  } else {
    sendFile( response, filename );
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse(dataString)
    console.log(json);

    if(request.url === '/delete') {
      for(let i = 0; i < appdata.length; i++) {
        if(appdata[i].id === json.id) { // ID Matches
          appdata.splice(i, 1);
          console.log("Deletion complete");
          break;
        }
      }
      if(json.highscore === true) { // Highscore Update
        let high = -1;
        let score = 0;
        for(let i = 0; i < appdata.length; i++) {
          if(appdata[i].game === json.game && appdata[i].score > score) {
            high = i;
            score = appdata[i].score;
          }
        }
        if(high !== -1) { // New Highscore
          appdata[high].highscore = true;
        }
      }

    } else if(request.url === '/submit') {
      let high = -1;
      for(let i = 0; i < appdata.length; i++) { // Highscore Update
        if(appdata[i].game === json.game && appdata[i].score < json.score) {
          high = i;
          appdata.highscore = false;
          json.highscore = true;
        } else if(appdata[i].game === json.game && appdata[i].score > json.score) {
          json.highscore = false;
          break;
        }
      }
      if(high === -1) {
        json.highscore = true;
      }
      appdata.push(json);
    } else if(request.url === '/modify') {
      let modifyLocation = -1;
      for(let i = 0; i < appdata.length; i++) {
        if(appdata[i].id === json.id) { // ID Matches
          appdata[i] = json;
          modifyLocation = i;
          console.log("Modify complete");
          break;
        }
      }
      if(json.highscore === true) { // Check if highscore is maintained
        let high = -1;
        let score = json.score;
        for(let i = 0; i < appdata.length; i++) {
          if(appdata[i].game === json.game && appdata[i].score > score) {
            high = i;
            score = appdata[i].score;
          }
        }
        if(high !== -1) { // Lost Highscore
          appdata[modifyLocation].highscore = false;
          appdata[high].highscore = true;
        }
      } else { // Check if highscore is gained (either there is a highscore, or there isn't)
        let high = -1;
        for(let i = 0; i < appdata.length; i++) {
          if(appdata[i].game === json.game && appdata[i].highscore === true) {
            high = i;
            if(appdata[i].score < json.score) {
              appdata[i].highscore = false;
              appdata[modifyLocation].highscore = true;
            }
          }
        }
        if(high === -1) { // No highscore in dataset, thus we're now the highscore
          appdata[modifyLocation].highscore = false;
          appdata[high].highscore = true;
        }
      }
    }

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
