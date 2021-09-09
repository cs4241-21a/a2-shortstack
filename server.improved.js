const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000


let records = [
  { entertainment: 10, food: 25, other: 23, total: 58, date: '2021-08-25'},
  { entertainment: 5,  food: 30, other: 30, total: 65, date: '2021-08-28' },
  { entertainment: 30, food: 30, other: 0,  total: 60, date: '2021-09-01'}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    console.log(request.url,'get')
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    console.log(request.url,'post')
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
  const action = request.url.slice( 1 )
  let dataString = ''
  // let chunks = [];

  request.on( 'data', function( data ) {
      dataString += data
    // chunks.push(data);
  })

  request.on( 'end', function() {
    // let data   = Buffer.concat(chunks);
    //let schema = JSON.parse(data);
    const json = {}
    switch (action) {
      case 'load':
        json.records = records
            break
      case 'add':
        let record= JSON.parse(dataString)
        record.total = record.entertainment + record.food + record.other
        record.date = new Date().toISOString().slice(0,10)
        records.push(record)
        json.errorCode = 'ok'
            break
      case 'delete':
        let selected= JSON.parse(dataString)
        console.log(selected)
        const checked = selected.checked
        for (let i = 0; i < checked.length; i++) {
          records.splice(checked[i],1)
        }
        json.errorCode = 'ok'
        break
      case 'edit':
        let edited = JSON.parse(dataString)
        const obj = records[edited.index]
        obj.entertainment=edited.entertainments
        obj.food=edited.foods
        obj.other=edited.others
        obj.total=edited.entertainments + edited.foods + edited.others
        json.errorCode = 'ok'
        break
      default:json.errorCode = "no action match"
    }
    // ... do something with the data here!!!

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(json))
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
