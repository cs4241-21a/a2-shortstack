// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( 'form' ),
          json = { yourclass: input.yourclass.value, yourassignment: input.yourassignment.value, 
                  complete: input.complete.value, date: input.date.value},
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
      return response.json()
    })
    .then( function(json) {
      console.log(json)
      
      var row = document.querySelector('#tableID').insertRow()
      row.insertCell(0).innerHTML = json.yourclass
      row.insertCell(1).innerHTML = json.yourassignment
      row.insertCell(2).innerHTML = json.complete
      row.insertCell(3).innerHTML = json.date
      row.insertCell(4).innerHTML = json.calculated
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }