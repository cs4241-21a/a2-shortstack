const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = []

const server = http.createServer( function( request,response )
{
  if ( request.method === 'GET' )
  {
    handleGet( request, response )    
  }
  else if ( request.method === 'POST' )
  {
    handlePost( request, response ) 
  }
})


const sendContestantResults = function(uid)
{

}

const handleGet = function( request, response )
{
  const filename = dir + request.url.slice( 1 ) 

  if ( request.url === '/' )
  {
    sendFile( response, 'public/index.html' )
  }
  else
  {
    sendFile( response, filename )
  }
}

const getImpliedWeakness = function(strength)
{
  switch (strength)
  {
    case 'electric':
      return 'flora';
    case 'water':
      return 'electric'
    case 'flame':
      return 'water';
    case 'flora':
      return 'flame';
    default:
      return 'invalid';
  }
}

const settleTurn = function(attacker, defender)
{
  // Calculate possible attack damage
  let attackDamage = parseInt(attacker['power']);
  if (attacker['strength'] === defender['weakness'])
    attackDamage += 1;
  else if (attacker['strength'] === defender['strength'])
    attackDamage -= 1;
  attackDamage = Math.max(attackDamage, 1);

  // Random chance for defender to dodge - based on agility
  if (Math.random() < (0.1 * parseInt(defender['agility'])))
    attackDamage = 0;

  return attackDamage;
}

const settleBattle = function(combatant1, combatant2)
{
  const c1name = combatant1['contestant'];
  const c2name = combatant2['contestant'];
  let turnNum = 1;
  let c1health = 20;
  let c2health = 20;
  let survivor = 'both';

  Math.floor(Math.random() * 11);

  console.log(`FIGHT! ${c1name} vs. ${c2name}!`);

  while (turnNum <= 10) {
    c2health -= settleTurn(combatant1, combatant2);
    c2health = Math.max(c2health, 0);
    console.log(`${c2name}: ${c2health} hp`);
    if (c2health === 0) { survivor = 'c1'; break; }

    c1health -= settleTurn(combatant2, combatant1);
    c1health = Math.max(c1health, 0);
    console.log(`${c1name}: ${c1health} hp`);
    if (c1health === 0) { survivor = 'c2'; break; }

    turnNum++;
  }

  console.log(`Final health: [ ${c1name}: ${c1health} | ${c2name}: ${c2health} ]`);

  return survivor;
}


const handlePost = function( request, response )
{
  let dataString = ''

  request.on( 'data', function( data )
  {
      dataString += data 
  })

  request.on( 'end', function()
  {
    console.log( JSON.parse( dataString ) )
    const formData = JSON.parse(dataString);
    let completeData = { contestant: formData.chrname,
                         power: parseInt(formData.balance),
                         agility: 5 - parseInt(formData.balance),
                         strength: formData.chrtype,
                         weakness: getImpliedWeakness(formData.chrtype),
                         survived: 0,
                         defeated: 0 };
    
    let matchUpdate = {newContestantData: completeData,
                       updateData: {}};
    
    if (appdata.length > 0)
    {
      combatantIndex = Math.floor(Math.random() * appdata.length)
      let battleResult = settleBattle(completeData, appdata[combatantIndex]);
      
      if (battleResult === 'c2')
        completeData.defeated += 1;
      else
        completeData.survived += 1;
      
      if (battleResult === 'c1')
        appdata[combatantIndex].defeated += 1;
      else
        appdata[combatantIndex].survived += 1;

      // Should be a separate GET request - didn't have time to set up
      matchUpdate.updateData = { id: combatantIndex,
                                survived: appdata[combatantIndex].survived,
                                defeated: appdata[combatantIndex].defeated };
    }

    appdata.push(completeData);
    
    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    response.write(JSON.stringify(matchUpdate));
    //response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end()
  })
}

const sendResponse = function(response){
  let s = JSON.stringify(appdata)
  response.writeHeader(200, { 'Content-Type': 'json' })
  response.end(s)
}

const sendFile = function( response, filename )
{
  const type = mime.getType( filename )
  fs.readFile( filename, function( err, content )
  {
    // if the error = null, then we've loaded the file successfully
    if ( err === null )
    {
      // status code: https://httpstatuses.com
      response.writeHeader( 200, { 'Content-Type': type })
      response.end( content )
    }
    else
    {
      // file not found, error code 404
      response.writeHeader( 404 )
      response.end( '404 Error: File Not Found' )
    }
  })
}

server.listen( process.env.PORT || port )
