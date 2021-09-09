const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name_input = document.querySelector( '#name' ),
          age_input = document.querySelector( '#age' ),
          license_input = document.querySelector( '#license' ),
            json = { name : name_input.value,
                     age : age_input.value,
                     license : license_input.value },
            body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      return response.json()
    })
    .then(function (json) {
      console.log(json)

      var namenode = document.createElement("div")
      namenode.setAttribute("class", "grid-item")
      namenode.innerText = json.name
      document.getElementById("table").appendChild(namenode)

      var agenode = document.createElement("div")
      agenode.setAttribute("class", "grid-item")
      agenode.innerText = json.age
      document.getElementById("table").appendChild(agenode)

      var lnode = document.createElement("div")
      lnode.setAttribute("class", "grid-item")
      lnode.innerText = json.license
      document.getElementById("table").appendChild(lnode)

      var legalnode = document.createElement("div")
      legalnode.setAttribute("class", "grid-item")
      legalnode.innerText = json.legalDriver
      document.getElementById("table").appendChild(legalnode)
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }