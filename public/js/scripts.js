// Add some Javascript code here, to run on the front end.
var newContent = ""


const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json );

  fetch( '/submit', {
    method:'POST',
    body
  })
  .then( response => response.json() )
  .then( function( response ) {
    // do something with the reponse 
    // console.log( response )

    const responseBody = response.yourname;
    
    newContent += "<ol>" + responseBody + "</ol>"
    document.getElementById("todoThings").innerHTML = newContent;
    //document.querySelector('#yourname');
    //const div = document.getElementById('')
  })

  return false
}

const result = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    console.log("get in the result function!")
    body = JSON.stringify( {} );
  
    fetch( '/result', {
      method:'POST',
      body
    })
    .then( response => response.json() )
    .then( function( response ) {
      // do something with the reponse 
      // console.log( response )
      if( Array.isArray(response)){
          for(let i = 0; i < reponse.length; i++){
              const thing = reponse[i]
              newContent += "<ol>" + thing + "</ol>"
          }
      }
      document.getElementById("resultDisplay").innerHTML = newContent;
      //document.querySelector('#yourname');
      //const div = document.getElementById('')
    })
  
    return false
  }

window.onload = function() {
  const button1 = document.getElementById( 'submitButton' )
  button1.onclick = submit

  const button2 = document.getElementById( 'ServerMemory' )
  button2.onclick = result
}

