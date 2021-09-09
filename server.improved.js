const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {'name': "Artoria Pendragon", 'occupation': "Saber", 'strength': "B", 'endurance': "B", "agility": "B", "magic": "A", "luck": "A+", "noble": "EX"},
  {'name': "Brynhild", 'occupation': "Lancer", 'strength': "B+", 'endurance': "A", "agility": "A", "magic": "C", "luck": "E", "noble": "A"},
  {'name': "Gilgamesh", 'occupation': "Archer", 'strength': "B", 'endurance': "C", "agility": "C", "magic": "B", "luck": "A", "noble": "EX"},
  {'name': "Tamamo-no-Mae", 'occupation': "Caster", 'strength': "E", 'endurance': "E", "agility": "B", "magic": "A", "luck": "D", "noble": "B"},
  {'name': "Morgan", 'occupation': "Berserker", 'strength': "C", 'endurance': "E", "agility": "B", "magic": "A+", "luck": "B", "noble": "EX"},
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
    const json = JSON.parse( dataString ) 

    if( request.url === '/result' ) {
      json.tabledata = appdata;
      json.noc = appdata.length;
    }
    else if ( request.url === '/submit' ) {
      let acc = 0;

      for (let i = 0; i < appdata.length; i++){
        let character_data = appdata[i];
        if ( character_data.name === json.yourname && character_data.occupation === json.occup){
          acc += 1;
        }
        else{
          acc += 0;
        }
      }

      if (acc === 0){
        json.alert = 0;
      }
      else{
        json.alert = 1;
      }


      if(checkInfoComplete(json) && json.alert === 0){
        var generated = generateServant(json);
        appdata.push(generated);
      }

      json.tabledata = appdata;
      json.noc = appdata.length; // number of characters
    }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' }) 
    response.end( JSON.stringify( json ) )
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

function checkInfoComplete( json ){
  if (json.yourname === "character name" || json.yourname === "" || json.occup === "None"){
    json.info_alert = 1;
    return false;
  }
  else{
    json.info_alert = 0;
    return true;
  }
}

function generateServant( json ){
  let returndata;

  if (json.occup === "Saber"){
    let returnST = getRandomAttribute(1, 3);
    let returnEN = getRandomAttribute(3, 7);
    let returnAG = getRandomAttribute(1, 4);
    let returnMG = getRandomAttribute(2, 5);
    let returnGL = getRandomAttribute(1, 5);
    let returnNP = getRandomAttribute(1, 4);
    returndata = {'name': json.yourname, 'occupation': json.occup, 'strength': returnST, 'endurance': returnEN, "agility": returnAG, "magic": returnMG, "luck": returnGL, "noble": returnNP};
  }
  else if (json.occup === "Lancer"){
    let returnST = getRandomAttribute(1, 5);
    let returnEN = getRandomAttribute(3, 6);
    let returnAG = getRandomAttribute(1, 3);
    let returnMG = getRandomAttribute(3, 6);
    let returnGL = getRandomAttribute(4, 5);
    let returnNP = getRandomAttribute(1, 4);
    returndata = {'name': json.yourname, 'occupation': json.occup, 'strength': returnST, 'endurance': returnEN, "agility": returnAG, "magic": returnMG, "luck": returnGL, "noble": returnNP};
  }
  else if (json.occup === "Archer"){
    let returnST = getRandomAttribute(3, 5);
    let returnEN = getRandomAttribute(3, 6);
    let returnAG = getRandomAttribute(1, 3);
    let returnMG = getRandomAttribute(3, 6);
    let returnGL = getRandomAttribute(1, 3);
    let returnNP = getRandomAttribute(1, 4);
    returndata = {'name': json.yourname, 'occupation': json.occup, 'strength': returnST, 'endurance': returnEN, "agility": returnAG, "magic": returnMG, "luck": returnGL, "noble": returnNP};
  }
  else if (json.occup === "Caster"){
    let returnST = getRandomAttribute(3, 6);
    let returnEN = getRandomAttribute(3, 6);
    let returnAG = getRandomAttribute(3, 6);
    let returnMG = getRandomAttribute(1, 3);
    let returnGL = getRandomAttribute(1, 5);
    let returnNP = getRandomAttribute(1, 4);
    returndata = {'name': json.yourname, 'occupation': json.occup, 'strength': returnST, 'endurance': returnEN, "agility": returnAG, "magic": returnMG, "luck": returnGL, "noble": returnNP};
  }
  else if (json.occup === "Rider"){
    let returnST = getRandomAttribute(1, 5);
    let returnEN = getRandomAttribute(1, 3);
    let returnAG = getRandomAttribute(2, 5);
    let returnMG = getRandomAttribute(3, 6);
    let returnGL = getRandomAttribute(1, 5);
    let returnNP = getRandomAttribute(1, 4);
    returndata = {'name': json.yourname, 'occupation': json.occup, 'strength': returnST, 'endurance': returnEN, "agility": returnAG, "magic": returnMG, "luck": returnGL, "noble": returnNP};

  }
  else if (json.occup === "Assassin"){
    let returnST = getRandomAttribute(1, 7);
    let returnEN = getRandomAttribute(3, 7);
    let returnAG = getRandomAttribute(1, 2);
    let returnMG = getRandomAttribute(2, 6);
    let returnGL = getRandomAttribute(4, 5);
    let returnNP = getRandomAttribute(1, 4);
    returndata = {'name': json.yourname, 'occupation': json.occup, 'strength': returnST, 'endurance': returnEN, "agility": returnAG, "magic": returnMG, "luck": returnGL, "noble": returnNP};
  }

  return returndata;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

function getRandomAttribute(min, max){
  //range: high (EX, A), mid (A, B, C), low (C, D, E)
  let range = getRandomInt(min, max);

  if (range === 1){
    let num = getRandomInt(1, 20);
    if (num === 1 ){
      return "EX";
    }
    else if (num === 2 || num === 3){
      return "A++"
    }
    else if (num >= 4 && num <= 7){
      return "A+"
    }
    else if (num >= 8 && num <= 14){
      return "A"
    }
    else{
      return "A-"
    }
  }
  else if (range === 2 || range === 3){
    let num = getRandomInt(1, 10);
    if (num === 1 ){
      return "A--";
    }
    else if (num >= 2 && num <= 5){
      return "B";
    }
    else{
      return "C";
    }
  }
  else {
    let num = getRandomInt(1, 5);
    if (num === 1){
      return "C";
    }
    else if (num >=2 && num <= 4){
      return "D";
    }
    else{
      return "E";
    }
  }

}

server.listen( process.env.PORT || port )
