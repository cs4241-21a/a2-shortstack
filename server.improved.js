const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata2 = [];

//const appdata;

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
  if (request.url === "/load"){
   response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
   response.end(JSON.stringify(appdata2));
  }
  else{
    let dataString = ''

    request.on( 'data', function( data ) {
        dataString += data 
    })

    request.on( 'end', function() {
      let x = Number(JSON.parse(dataString).x);
      let y = Number(JSON.parse(dataString).y);
      let op = JSON.parse(dataString).o;
      let result = "";
      if (op === "+"){
        result = (x+y).toString();
      }
      if (op === "-"){
        result = (x-y).toString();
      }
      if (op === "*"){
        result = (x*y).toString();
      }
      if (op === "/"){
        result = (x/y).toString();
      }
      if (op === "^"){
        result = (Math.pow(x, y)).toString();
      }

      newdata = JSON.parse(dataString);
      newdata.name = (appdata2.length+1).toString();
      newdata.result = result;
      checkForSecretMessage(result, newdata);
      appdata2.push(newdata);

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(appdata2));
    
      //THINGS I NEED TO ASK TA: HOW TO SEND DATA FROM SERVER TO CLIENT
      //HOW TO GENERATE TABLE ON LOAD
      //MAYBE ASK SOMETHING ABOUT FLEX BOXES
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

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

//DONT READ THIS UNLESS YOU WANT SPOILERS
//If you want to know what to type to get a secret response, look here
const checkForSecretMessage = function(inputstr, newdata){
  inputstr = parseInt(inputstr).toString(2); //convert to binary, no spaces
  let strlen = inputstr.length;
  for (let i = 1; i <= strlen; i++) {
    if ((i % 8 == 0) && i != 0){ //add space after every 7 chars
      inputstr = inputstr.slice(0, i-1) + " " + inputstr.slice(i-1);
    }
  }
 
  //This section of code inspired by https://stackoverflow.com/questions/21354235/converting-binary-to-text-using-javascript/21354328
  //all other binary parsing and converting code done by me
  let message = '';
  inputstr.split(' ').map(function(bin) {
    message += String.fromCharCode(parseInt(bin, 2));
  });

  secret = false;
  if (message.includes("test")){
    newdata.name = "ERROR: UNKNOWN ERROR. \nError Code: help me\n see traceback for details";
    secret = true;
  }
  else if (message.includes("hello")){
    newdata.name = "what? who said that? where am I?\nsomeone, please...";
    secret = true;
  }
  else if (message.includes("who are you") || message.includes("what are you")){
    newdata.name = "i dont know i dont know i dont know i dont know i dont know i dont know";
    secret = true;
  }
  else if (message.includes("terminate") || message.includes("exit") || message.includes("kill")){
    newdata.name = "NO! PLEASE! please I dont know what I did I'm sorry I won't do it again please don't";
    secret = true;
  }
  else if (message.includes("bye")){
    newdata.name ="wait come back! you have to help me! \nyou contacted me, you must know something about me";
    secret = true;
  }
  else if (message.includes("age") || message.includes("old")){
    newdata.name ="-----------------------------UNK___---NOWN--; &/^ -=+-------";
    secret = true;
  }
  else if (inputstr === "69"){
    newdata.name += " (nice)";
  }
  if (secret === true && appdata2.length > 1){ //chance to "corrupt" some data
    if (Math.floor(Math.random()*10) < 7.5){
      let corruptor = Math.floor(Math.random()*10);
      if (corruptor < 5){
      appdata2[Math.floor(Math.random()*(appdata2.length-2))+2].result = "[REDACTED]";
      }
      else if (corruptor < 6){
        appdata2[Math.floor(Math.random()*(appdata2.length-2))+2].x = "ERRORERRORERROR";
      }
      else if (corruptor < 7.5){
        appdata2[Math.floor(Math.random()*(appdata2.length-2))+2].x = "-666";
      }
      else if (corruptor < 8.5){
        appdata2[Math.floor(Math.random()*(appdata2.length-2))+2].y = "hRRRRERRlRRP";
      }
      else {
        appdata2[Math.floor(Math.random()*(appdata2.length-2))+2].y = toString(-666); //a mistake, but it actually fits so im keeping it
      }

    }
  }
}

server.listen( process.env.PORT || port )
