const { report } = require('process')

const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
   
]

let id_counter = 0


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
  } else if( request.url === '/initializeData' ) {
    console.log("Attempting initialize data")
    getInitialDataList( response )
  }else{
    sendFile( response, filename )
  }
}


const handlePost = function( request, response ) {
  if( request.url === '/submit' ) {
    console.log("Attempting add data")
    handleAddition( request, response )
  } else if( request.url === '/deleteEntry' ) {
    handleDeletion(request, response)
    console.log("Attempting delete data")
  }else{
    console.log("I don't know what you want me to do!")
  }

}

function handleAddition(request, response) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
      // console.log("Testing4")
      // dataString += "Heloooooooooooooooooooooooooooooo"
      // response.bodyUsed = true
      // response.body = "testing111"
      // console.log("request")
      // console.log(request)
  })

  // request.on( 'rand_test', function() {
    // console.log("111111111111111111")
  // })

  request.on( 'end', function() {
    console.log("\n\nNEW POST DATA REQUEST")
    // console.log("dataString")
    // console.log( dataString  )
    let dataStringParsed = JSON.parse( dataString )
    // console.log("dataString parsed")
    // console.log( dataStringParsed )
    appdata.push({ 'name': dataStringParsed.yourname, "id": id_counter})
    id_counter = id_counter + 1
    console.log("appData")
    console.log(appdata)
    const string_app_data = JSON.stringify(appdata)
    // console.log("string appData")
    // console.log(string_app_data)
    // let unordered_list = window.document.getElementById("trackedForm");
    // let list_item = document.createElement("newListItem");
    // list_item.innerText = dataString;
    // unordered_list.appendChild(list_item);
    
    // ... do something with the data here!!!

    // const json = JSON.parse(dataString)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain'})
    // response.write(string_app_data)

    // console.log("Response Object")
    // console.log(response.bodyUsed)
    // console.log(response.body)

    // response.bodyUsed = true
    // response.body = string_app_data

    // console.log("Response Object Post Change")
    // console.log(response.bodyUsed)
    // console.log(response.body)

    // response
    // .writeHead(200, {
    //   'Content-Length': Buffer.byteLength(string_app_data),
    //   'Content-Type': 'text/plain'
    // })
    // .end(string_app_data);
    
    // response.write(string_app_data)
    // response.write(string_app_data)
    // response.write(string_app_data)
    // response.write(string_app_data)
    // response.body = string_app_data
    // response.end(string_app_data)
    // response.end("Hello There")
    // response.data = string_app_data
    // response.sendFile = string_app_data
    response.end(string_app_data)
    // response.end(appdata)
  })

}

function handleDeletion(request, response) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {

    console.log("\n\nNEW POST DATA REQUEST")
    // console.log("dataString")
    // console.log( dataString  )
    let dataStringParsed = JSON.parse( dataString )
    console.log("dataString parsed")
    console.log( dataStringParsed )
    // appdata.push({ 'name': dataStringParsed.yourname, "id": id_counter})

    let item_index = -1

    for (let i = 0; i < appdata.length; i++) {
      // console.log("dataString.id")
      // console.log(dataStringParsed.id)
      // console.log("appdata[i].id")
      // console.log(appdata[i].id)
      if (String(appdata[i].id) === String(dataStringParsed.id)){
        // console.log("Found it" + appdata[i].id)
        item_index = i
        break
      } else {
        // console.log("Not " + appdata[i].id)
      }
    } 

    console.log("appData")
    console.log(appdata)
    const string_app_data = JSON.stringify(appdata)
    // console.log("string appData")
    // console.log(string_app_data)
    // let unordered_list = window.document.getElementById("trackedForm");
    // let list_item = document.createElement("newListItem");
    // list_item.innerText = dataString;
    // unordered_list.appendChild(list_item);
    
    // ... do something with the data here!!!

    // const json = JSON.parse(dataString)

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain'})
    // response.write(string_app_data)

    // console.log("Response Object")
    // console.log(response.bodyUsed)
    // console.log(response.body)

    // response.bodyUsed = true
    // response.body = string_app_data

    // console.log("Response Object Post Change")
    // console.log(response.bodyUsed)
    // console.log(response.body)

    // response
    // .writeHead(200, {
    //   'Content-Length': Buffer.byteLength(string_app_data),
    //   'Content-Type': 'text/plain'
    // })
    // .end(string_app_data);
    
    // response.write(string_app_data)
    // response.write(string_app_data)
    // response.write(string_app_data)
    // response.write(string_app_data)
    // response.body = string_app_data
    // response.end(string_app_data)
    // response.end("Hello There")
    // response.data = string_app_data
    // response.sendFile = string_app_data
    response.end(string_app_data)
    // response.end(appdata)
  })

}

const getInitialDataList = function(response){
  // request.on( 'end', function() {
  //   console.log("\n\nNEW GET INITIAL DATA REQUEST")
  //   console.log("appData")
  //   console.log(appdata)
  //   const string_app_data = JSON.stringify(appdata)
  //   response.writeHead( 200, "OK", {'Content-Type': 'text/plain'})
  //   response.end(string_app_data)
  // })
  console.log("\n\nNEW GET INITIAL DATA REQUEST")
  console.log("appData")
  console.log(appdata)
  const string_app_data = JSON.stringify(appdata)
  response.writeHead( 200, "OK", {'Content-Type': 'text/plain'})
  response.end(string_app_data)

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
