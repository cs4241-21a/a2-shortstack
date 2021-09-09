// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")



const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  json = {
    positionname: document.querySelector('#position').value,
    company: document.querySelector('#company').value,
    location: document.querySelector('#location').value,
    references: document.querySelector('#reference').value,

  }


  if(json.positionname === "" || json.company === "" || json.location === ""|| json.references === ""){
      window.alert('All of the fields must be filled');
        return false;
  }

  window.alert('Application Logged!');


  body = JSON.stringify(json)
  fetch('/submit', {
    method:'POST',
    body
  })
  .then(response => response.json())

      .then(function (response){


        var table = document.getElementById("table1");
        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(1);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        // Add some text to the new cells:
        cell1.innerHTML = response.positionname;
        cell2.innerHTML = response.company;
        cell3.innerHTML = response.location;
        cell4.innerHTML = response.references;
        cell5.innerHTML = response.date;
      })
  return false
}

window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = submit
}