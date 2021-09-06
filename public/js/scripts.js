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
    console.log('we reach here!')
    console.log( response )

    const responseBody = response.yourname;
    
    newContent += "<ol>" + responseBody + "</ol>"
    document.getElementById("todoThings").innerHTML = newContent;
    //document.querySelector('#yourname');
    //const div = document.getElementById('')
  })

  return false
}

window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = submit
}

