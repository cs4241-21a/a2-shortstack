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

/*function selectedRow () {

    var rIndex, table = document.getElementById("sleeptable")
    
    for (var i = 0; i < table.rows.length; i++) {
        
        table.rows[i].onclick = function() {
            
            rIndex = this.rowIndex;
            console.log(index);
        }
    }
}*/


const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
  
    const name = document.querySelector( '#yourname' ),
    major = document.querySelector('#major'),
    sleep = document.querySelector('#hours');

    if (name.value === "" || major.value === "" || sleep.value === "") {
        console.log("All fields are empty")
        alert("All fields needs to be filled.")
        return false
    } 

    if (name.value === "Enter your name here" || major.value === "Enter your major here") {
        console.log("Not valid data")
        alert("Enter valid fields only.")
        return false
    }
          json = { yourname: name.value, major: major.value, hours:sleep.value }
          body = JSON.stringify( json )
  
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      return response.json()
    })

    .then( function (json ) {
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