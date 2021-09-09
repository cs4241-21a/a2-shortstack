const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  {'name': 'Mike', 'email': 'mike@wpi.edu', 'number': '718-654-980', 'age': 10, 'occupation': 'Student', 'age_group': 'Child', 'education_level': 'Preschool', 'notes': 'Likes to steal cookies'},
  {'name': 'Emma', 'email': 'eemma@wpi.edu', 'number': '718-634-980',  'age': 19, 'occupation': 'Working', 'age_group': "Adult", 'education_level': 'Highschool Graduate', 'notes': 'Loves to eat shrimp'},
  {'name': 'Steven', 'email': 'steven@wpi.edu', 'number': '713-654-980', 'age': 67, 'occupation': 'Student', 'age_group': "Senior", 'education_level': 'Graduate Program', 'notes': 'This guy is mean'},
  {'name': 'Cooper', 'email': 'b@j.com', 'number': '743-234-5678', 'age': 17, 'occupation': 'Unemployed', 'age_group': "Teenager", 'education_level': 'Never Attended', 'notes': 'This person is the best'}
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

  if(request.url === '/getData') { 
    getData(response, appdata) 
  }
  else if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else{
    sendFile( response, filename )
  }
}

const getData = function(response, data) { 
  console.log('got data')
  const type = mime.getType(data);
  response.writeHead(200, {'Content-Type': type});
  response.end(JSON.stringify(data))
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    console.log(JSON.parse( dataString ) )

    // ... do something with the data here!!!
    if(request.url === '/submit') { appdata.push(JSON.parse(dataString)) }
    else if(request.url === '/update') { updateItemInDatabase(JSON.parse(dataString)) }
    else if(request.url === '/delete') { deleteItemInDatabase(JSON.parse(dataString)) }

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}


const updateItemInDatabase = function(json) {
  console.log("in server update")
  for(let i =0; i < appdata.length; i++){
    if(i == json['modifyInput']){
      let item = appdata[i];
      item['name'] = json['name']
      item['email'] = json['email']
      item['number'] = json['number']
      item['age'] = json['age']
      item['occupation'] = json['occupation']
      item['age_group'] = json['age_group']
      item['education_level'] = json['education_level']
      item['notes'] = json['notes']
    }
  }
}

const deleteItemInDatabase = function(json) {
  console.log("in server delete")
  appdata.splice(json['modifyInput'],1)
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
