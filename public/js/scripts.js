let numberOfElements = 1;
let seal = false;

function stepOnSeal() {
    seal = true;
    let table = document.getElementById("ratings");
    table.rows[0].cells[3].innerHTML = "<th>Years Till Graduation (Seal Stepped!)</th>"
    updateTable();
    alert("You stepped on the seal! All students now graduate 1 year later than their expected graduation year until the next reload!\n\nFirst-Years:     4 --> 5 years\nSophomores: 3 --> 4 years\nJuniors:          2 --> 3 years\nSeniors:         1 --> 2 years");
}

function updateTable() {
    let table = document.getElementById("ratings");
    if (seal) {
        table.innerHTML = '<tr><th>Response ID</th><th>Name</th><th>Academic Year</th><th>Years Till Graduation (Seal Stepped!)</th><th>Best Dorm?</th><th>Best Dining Hall?</th><th>Favorite Spot?</th><th>Additional Notes</th><th>Change Data</th></tr>';
    } else {
        table.innerHTML = '<tr><th>Response ID</th><th>Name</th><th>Academic Year</th><th>Years Till Graduation</th><th>Best Dorm?</th><th>Best Dining Hall?</th><th>Favorite Spot?</th><th>Additional Notes</th><th>Change Data</th></tr>';
    }
    fetch('/getData', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(function(json) {
        console.log(json);
        let rowIndex = 0;
        for (let rowData of json) {
            numberOfElements = rowData.responseID;
            let row = table.insertRow(-1);

            let responseID = row.insertCell(0);
            let name = row.insertCell(1);
            let studentYear = row.insertCell(2);
            let yearsRemaining = row.insertCell(3);
            let favoriteDorm = row.insertCell(4);
            let favoriteDining = row.insertCell(5);
            let favoriteSpot = row.insertCell(6);
            let notes = row.insertCell(7);
            let modify = row.insertCell(8);

            row.cells[0].innerHTML = rowData.responseID;
            row.cells[1].innerHTML = rowData.name;
            row.cells[2].innerHTML = rowData.studentYear;
            row.cells[3].innerHTML = rowData.yearsRemaining + sealIncrement(rowData.studentYear);
            row.cells[4].innerHTML = rowData.favoriteDorm;
            row.cells[5].innerHTML = rowData.favoriteDining;
            row.cells[6].innerHTML = rowData.favoriteSpot;
            row.cells[7].innerHTML = rowData.notes;

            row.cells[8].innerHTML = "<button class='deleteButton' onclick='deleteRow(" + rowIndex + ")'>Delete!</button>"

            rowIndex++;
        }
    })
}

function sealIncrement(studentYear) {
    let increment = '';

    if (seal) {
        switch (studentYear) {
            case 'First-Year':
                increment = 1;
                break;
            case 'Sophomore':
                increment = 1;
                break;
            case 'Junior':
                increment = 1;
                break;
            case 'Senior':
                increment = 1;
                break;
            case 'Graduate Student':
                increment = '';
                break;
            default:
                increment = '';
                break; 
        }
    }

    return increment;
}
  
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();
  
    /*const input = document.querySelector( '#name' ),
         json = { yourname: input.value },
        body = JSON.stringify( json ) */

    const name = document.getElementById('name').value;
    const studentYear = document.getElementById('studentYear').value;
    const favoriteDorm = document.getElementById('favoriteDorm').value;
    const favoriteDining = document.getElementById('favoriteDining').value;
    const favoriteSpot = document.getElementById('favoriteSpot').value;
    const notes = document.getElementById('notes').value; //Can be blank

    if (name.trim() === '' || studentYear.trim() === '' || favoriteDorm.trim() === '' || favoriteDining.trim() === '' || favoriteSpot.trim() === '') {
        alert("To obtain accurate data, please be sure to respond to every question (except for additional notes)!")
        return false;
    } else {
        numberOfElements++;
        
        const jsonData = {
            responseID: numberOfElements,
            name: name,
            studentYear: studentYear,
            favoriteDorm: favoriteDorm,
            favoriteDining: favoriteDining,
            favoriteSpot: favoriteSpot,
            notes: notes
        }

        let body = JSON.stringify(jsonData);
  
        fetch( '/submit', {
         method:'POST',
         body 
        })
        .then( function( response ) {
            updateTable();
            clearForm();
        })
  
        return true;
    }
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('studentYear').value = 'First-Year';
    document.getElementById('favoriteDorm').value = 'Daniels Hall';
    document.getElementById('favoriteDining').value = 'Campus Center';
    document.getElementById('favoriteSpot').value = '';
    document.getElementById('notes').value = '';
}

function deleteRow(rowIndex) {
    let confirmDelete = confirm("Are you sure you'd like to delete this row?");
    if (confirmDelete) {
        const json = {
            deletingItem: rowIndex
        }

        let body = JSON.stringify(json);
        fetch('/delete', {
            method: 'POST',
            body
        })
        .then( function() {
            updateTable();
        })
    }
}
  
window.onload = function() {
    const button = document.querySelector( 'button' );
    button.onclick = submit;

    updateTable();
}