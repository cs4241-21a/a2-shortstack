const http = require( 'http' ),
    fs   = require( 'fs' ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library used in the following line of code
    mime = require( 'mime' ),
    dir  = 'public/',
    port = 3000

let UUID = 0
const assetModel = function(ticker, amt, purch) {
    tempObj = {}
    tempObj.ticker = ticker;
    tempObj.amt = amt;
    tempObj.purch = purch;
    tempObj.curPrice = Math.floor(Math.random() * 1000)
    tempObj.pl = tempObj.curPrice*amt - tempObj.purch*amt
    tempObj.UUID = UUID
    UUID++;
    return tempObj;
}

const appdata = [
    { username: "cooluser",        assets:[assetModel("BTC", 1, 100), assetModel("F", 20, 5.90)]},
    { username: "hmkyriacou", assets:[assetModel("BTC", 1, 100)]},
    { username: "joeSmith",        assets:[assetModel("BTC", 1, 100), assetModel("F", 20, 5.90), assetModel("AAPL", 100, 150), assetModel("BOTZ", 10, 13)]}
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
        recievedData = JSON.parse( dataString )
        console.log( recievedData )

        if (request.url === '/submit') {
            user = appdata.find(obj => obj.username === recievedData.username)

            if (user === undefined) {
                console.log("User not found")
                response.writeHead(404, "NOT FOUND", {'Content-Type': 'text/plain'})
                response.end()
            } else {
                console.log( user )

                response.writeHead( 200, "OK", {'Content-Type': 'text/plain'})
                response.end(JSON.stringify(user))
            }
        } else if (request.url === '/signup') {
            let user = appdata.find(obj => obj.username === recievedData.username)
            if (user === undefined) {
                // Make new user
                appdata.push({username: recievedData.username, assets:[]})
                let user = appdata.find(obj => obj.username === recievedData.username)

                response.writeHead( 201, "CREATED", {'Content-Type': 'text/plain'})
                response.end(JSON.stringify(user))

            } else {
                // User already exists

                response.writeHead( 409, "CONFLICT", {'Content-Type': 'text/plain'})
                response.end()
            }
        } else if (request.url === '/newAsset') {

            for (let l in recievedData) {
                console.log(l)
                if (l !== "username" && l !== "tick" && l !== "amt" && l !== "purch") {
                    console.log("Reached if: " + l)
                    // incorrecet data format
                    response.writeHead(406, "NOT ACCEPTABLE", {'Content-Type': 'text/plain'})
                    response.end()
                    return
                }
            }
            // Create new asset
            user = appdata.find(obj => obj.username === recievedData.username)
            if (user === undefined){
                console.log( "user does not exist" )
                response.writeHead(404, "NOT FOUND", {'Content-Type': 'text/plain'})
                response.end()
            } else if (recievedData.tick === "" || recievedData.amt === "" || recievedData.purch === "") {
                    response.writeHead(406, "NOT ACCEPTABLE", {'Content-Type': 'text/plain'})
                    response.end()
            } else {
                //user found
                console.log("Making new Asset")
                user.assets.push(assetModel(recievedData.tick, recievedData.amt, recievedData.purch))
                response.writeHead( 200, "OK", {'Content-Type': 'text/plain'})
                response.end(JSON.stringify(user))
            }
        } else if (request.url === '/deleteAsset') {
            user = appdata.find(obj => obj.username === recievedData.username)
            if (user === undefined){
                console.log( "user does not exist" )
                response.writeHead(404, "NOT FOUND", {'Content-Type': 'text/plain'})
                response.end()
            } else {
                user.assets.splice(user.assets.findIndex(obj => obj.UUID === recievedData.UUID), 1)
                response.writeHead( 200, "OK", {'Content-Type': 'text/plain'})
                response.end(JSON.stringify(user))
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
