const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
  
    const name = document.querySelector( '#yourname' ),
    major = document.querySelector('#major'),
    sleep = document.querySelector('#hours')
          json = { yourname: name.value, major: major.value, hours:sleep.value },
          body = JSON.stringify( json )
  
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      return response.json()
    })
    .then( function (json ) {
        console.log(json)
    })
  
    return false
  }
  
  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }