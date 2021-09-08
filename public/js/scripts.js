
  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#yourname' ),
          cars = document.querySelector('#cars'),
          json = { yourname: input.value, cars: cars.value },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      console.log(response)
      return response.json()
    })
    .then( function( json ) {
      console.log(json)

      //get table to add them to
      let horgTable = document.getElementById("entries-wrapper")
      
      /*for ( let i = 0; i < json.length; i++){
        const element = document.createElement("p")
        element.innerText = ''+ json[i].yourname + json[i].cars;
      document.body.appendChild(element)
      }
      */

      //create HORG entry
      let horgEntry = document.createElement("div");
      horgEntry.classList.add("entry");

      //add data
      let dateSpan = document.createElement("span");
      dateSpan.innerHTML="testtext";
      horgEntry.appendChild(dateSpan);

      //add x-button
      let btnX = document.createElement("button");
      btnX.innerHTML="x";
      btnX.classList.add("remove");
      horgEntry.appendChild(btnX);

      //add to list!
      horgTable.appendChild(horgEntry);
     
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }
