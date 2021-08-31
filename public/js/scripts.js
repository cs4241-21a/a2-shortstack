function addRow (entry) {
    let table = document.getElementById("sleeptable"),
    newRow = table.insertRow(-1),
    nameCell = newRow.insertCell(0),
    majorCell = newRow.insertCell(1),
    hourCell = newRow.insertCell(2),
    adviceCell = newRow.insertCell(3);

    nameCell.innerHTML = entry.yourname;
    majorCell.innerHTML = entry.major;
    hourCell.innerHTML = entry.hours;
    adviceCell.innerHTML = entry.advice;
}

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
        //console.log(json)
        let index = json.length - 1;
        addRow(json[index]);
        console.log(json);
    })
  
    return false
  }
  
  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }