const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'id':1, 'name': 'Pippi', 'link': 'https://cdn.discordapp.com/attachments/428381972545404928/884522236025913374/image0.jpg', 'call': 'ARF', 'type': 'cat' },
  { 'id':2, 'name': 'Mordecai', 'link': 'https://cdn.discordapp.com/attachments/428381972545404928/884522261237882910/image0.jpg', 'call': 'MEOW', 'type': 'dog' },
  { 'id':3, 'name': 'Bubba', 'link': 'https://i.imgur.com/Db4cRax.png', 'call': 'I LOVE YOU', 'type':'other'}
];

let currId=4;

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
    if(request.url === '/submit') {
      let obj = JSON.parse(dataString);
      console.log(obj)

      if (obj.name !== '' && obj.link !== '' && obj.type !== '') {
        let flip = Math.random();
        let call;
        switch (obj.type) {
          case 'Dog':
            call = (flip > 0.5) ? "ARF" : "WOOF";
            break;
          case 'Cat':
            call = (flip > 0.5) ? "MEOW" : "PURR";
            break;
          case 'Snake':
            call = (flip > 0.5) ? "TSSS" : "SSSWEET";
            break;
          case 'Bird':
            call = (flip > 0.5) ? "TWEET" : "CHIRP";
            break;
          default:
            call = (flip > 0.5) ? "HEWWO" : "I LOVE YOU";
        }
        obj.call = call;
        obj.id = currId;
        currId++;
        appdata.push(obj)

        response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
        response.end(JSON.stringify(appdata))
      } else {
        response.writeHead(200, "Request Had No Valid Content to Add, sending Current Unchanged State.", {'Content-Type': 'text/plain'})
        response.end(JSON.stringify(appdata))
      }
    } else if (request.url === '/delete') {
      let idObj = JSON.parse(dataString);
      if(idObj.id < 0 || idObj.id > currId){
        response.writeHead(400, "Bad Id For Deletion", {'Content-Type': 'text/plain'})
        response.end(JSON.stringify(appdata))
      } else {
        console.log(idObj)
        var index = appdata.findIndex(function(item){
          return item.id == idObj.id // using this on purpose cause idObj stores id as string
        });
        console.log(index)
        if(index < 0) {
          response.writeHead(400, "Bad Id For Deletion", {'Content-Type': 'text/plain'})
          response.end(JSON.stringify(appdata))
        } else {
          appdata.splice(index, 1)
          response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
          response.end(JSON.stringify(appdata))
        }
      }
    }
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
