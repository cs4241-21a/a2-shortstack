const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

let logins = [
  { "username": "loren", "balance": 5000, "wins": 20, "losses": 15, "netProfit": 500, "initialBalance": 4500},
  { "username": "harrison", "balance": 150, "wins": 3, "losses": 11, "netProfit": -400, "initialBalance": 550 },
  { "username": "jake", "balance": 2000, "wins": 3, "losses": 3, "netProfit": 0, "initialBalance": 2000 },
  { "username": "gas", "balance": 1340, "wins": 200, "losses": 235, "netProfit": -150, "initialBalance": 1490 },
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  console.log("get")
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }else if (request.url === "/?") {

  }
    else {
      sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const json = JSON.parse(dataString)

    if (request.url === "/submit") {
      let userIndex = 0, userFound = false
      for (let i = 0; i < logins.length; i++) {
        if (json.username === logins[i].username) {
          userFound = true
          userIndex = i
          break
        }
      }
      if (userFound) {
        if (json.balance != "none") { logins[userIndex].balance = parseInt(json.balance) }
        if (json.wins != "none") { logins[userIndex].wins = parseInt(json.wins) }
        if (json.losses != "none") { logins[userIndex].losses = parseInt(json.losses) }
        if (json.initialBalance != "none") { logins[userIndex].initialBalance = parseInt(json.initialBalance) }
        let netProfit = logins[userIndex].balance - logins[userIndex].initialBalance
        logins[userIndex].netProfit = netProfit
      }
      else {
        let balance, wins, losses, initialBalance, netProfit
        if (json.username === "none") {}
        else {
          if (json.balance === "none") { balance = 1000}
          else { balance = parseInt(json.balance) }
          if (json.wins === "none") { wins = 0}
          else { wins = parseInt(json.wins) }
          if (json.losses === "none") { losses = 0}
          else { losses = parseInt(json.losses) }
          if (json.initialBalance === "none") { initialBalance = balance}
          else { initialBalance = parseInt(json.initialBalance) }
          netProfit = balance - initialBalance
          logins.push({ "username": json.username, "balance": balance, "wins": wins, "losses": losses,
        "netProfit": netProfit, "initialBalance": initialBalance})
        }
      }
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end( JSON.stringify(logins))
    }
    else if (request.url === "/signIn") {
      let userFound = false
      let user
      for (let i = 0; i < logins.length; i++) {
        if (logins[i].username === json.yourname) {
          console.log("Logged in as " + json.yourname)
          user = logins[i]
          userFound = true
          break
        }
      }
      if (userFound) {
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end( JSON.stringify(user))
      }
      else {
        json.username = "error"
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.end( JSON.stringify(json))
      }
      
    }
    else if (request.url === "/updateAccount") {
      let targetUser
      for (let i = 0; i < logins.length; i++) {
        if (logins[i].username === json.username) {
          targetUser = logins[i]
          if (json.win) { 
            targetUser.balance += parseInt(json.bet) 
            targetUser.netProfit += parseInt(json.bet)
          }
          else { 
            targetUser.balance -= parseInt(json.bet) 
            targetUser.netProfit -= parseInt(json.bet)
          }
          if (json.win) {
            targetUser.wins++
          }
          else {
            targetUser.losses++
          }
          break
        }
      }
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end( JSON.stringify(logins))
    }
    else if (request.url === "/refreshTable") {
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end( JSON.stringify(logins))
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