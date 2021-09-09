const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { Assignment: "CS4241 A2", Priority: "high", Deadline: "Thursday" },
  { Assignment: "CS4123 HW2", Priority: "low", Deadline: "Sunday" }
];

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

    var jsonData = JSON.parse(dataString); 

    console.log( JSON.parse( dataString ) )

       let action = jsonData.action;
    
    if (action.includes("add")) {
      let assignment = jsonData.assignment;
      let prior = jsonData.priority;
      let deadline = jsonData.deadline;
      let entries = {};
      entries["Assignment"] = assignment;
      entries["Priority"] = priority;
      entries["Deadline"] = deadline;
   
      appdata.push(entries);
    }

    
    if (action.includes("edit")) {
      let assignment = jsonData.assignment;
      let prior = jsonData.priority;
      let deadline = jsonData.deadline;
      let entries2 = {};
      entries2["Assignment"] = assignment;
      entries2["Priority"] = priority;
      entries2["Deadline"] = deadline;
    
      appdata(newEntries).push(newEntries);
    }

    
    if (action.includes("delete")) {
      let assignment = jsonData.assignment;
      let prior = jsonData.priority;
      let deadline = jsonData.deadline;
      let entries = {};
      entries["Assignment"] = assignment;
      entries["Priority"] = priority;
      entries["Deadline"] = deadline;
      
      appdata.splice(entries);
    }

    
    var sendingJSON = [];
    for (let newEntry in appdata) {
      sendingJSON.push(appdata[newEntry]);
    }

    console.log(sendingJSON);
  });


    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  };

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
   });
};

server.listen( process.env.PORT || port )
