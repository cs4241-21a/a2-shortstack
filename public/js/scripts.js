// Add some Javascript code here, to run on the front end.
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#yourname' ),
    input2 = document.querySelector( '#birth' ),
    input3 = document.querySelector( '#cur' ),
          json = { yourname: input.value, birth: input2.value, cur: input3.value,},
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      return response.json()
    })

    .then( function(json){
      
    console.log( json )
    const div = document.createElement("div")
    const element = document.createElement('p')
    const element2 = document.createElement('p')
    const element3 = document.createElement('p')
    const element4 = document.createElement('p')
    const element5 = document.createElement('p')
    element.innerHTML =  json.yourname
    element2.innerHTML =  json.birth
    element3.innerHTML =  json.cur
    if (parseInt(json.cur) - parseInt(json.birth) > 30){    element4.innerHTML =  (parseInt(json.cur) - parseInt(json.birth)).toString() + " your too old for the internet!"
    }else    element4.innerHTML =  (parseInt(json.cur) - parseInt(json.birth)).toString() + " your too young for the internet!"

    element5.innerHTML =  "-------------------------------------------------------------------"
    document.body.appendChild(element).appendChild(element2).appendChild(element3).appendChild(element4).appendChild(element5)

    })

    return false}


  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }
