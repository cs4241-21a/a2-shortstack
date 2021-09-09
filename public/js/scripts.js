let numberOfElements = 1;

function stepOnSeal() {
    alert("You stepped on the seal! All students now graduate 1 year later than expected!");

    updateTable(true);

}

function updateTable(incrementGradYear) {
    let table = document.getElementById("ratings");
    
    fetch('/getData', {
        method: 'GET'
    })
    .then(response => response.json)
    .then(function(json) {
        for (let rowData of Object.keys(json)) {
            alert(rowData);
            numberOfElements = json[rowData].responseID;
            let row = table.insertRow(-1);

            let responseID = row.insertCell(0);
            let name = row.insertCell(1);
            let studentYear = row.insertCell(2);
            let yearsRemaining = row.insertCell(3);
            let favoriteDorm = row.insertCell(4);
            let favoriteDining = row.insertCell(5);
            let favoriteSpot = row.insertCell(6);
            let notes = row.insertCell(7);

            row.cells[0].innerHTML = json[rowData].responseID;
            row.cells[1].innerHTML = json[rowData].name;
            row.cells[2].innerHTML = json[rowData].studentYear;
            row.cells[3].innerHTML = json[rowData].yearsRemaining + sealIncrement(json[rowData].studentYear, incrementGradYear);
            row.cells[4].innerHTML = json[rowData].favoriteDorm;
            row.cells[5].innerHTML = json[rowData].favoriteDining;
            row.cells[6].innerHTML = json[rowData].favoriteSpot;
            row.cells[7].innerHTML = json[rowData].notes;
        }
    })
}

function sealIncrement(studentYear, incrementGradYear) {
    let increment = 0;

    if (incrementGradYear) {
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

    numberOfElements++;
  
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
        const jsonData = {
            responseID: numberOfElements,
            name: name,
            studentYear: studentYear,
            yearsRemaining: getYearsRemaining(studentYear),
            favoriteDorm: favoriteDorm,
            favoriteDining: favoriteDining,
            favoriteSpot: favoriteSpot,
            notes: notes
        }

        const body = JSON.stringify(jsonData);
  
        fetch( '/submit', {
         method:'POST',
         body 
        })
        .then( function( response ) {
           updateTable(false);
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

function getYearsRemaining(studentYear) {
    let years = -1;
    
    switch (studentYear) {
        case 'First-Year':
            years = 4;
            break;
        case 'Sophomore':
            years = 3;
            break;
        case 'Junior':
            years = 2;
            break;
        case 'Senior':
            years = 1;
            break;
        case 'Graduate Student':
            years = '∞';
            break;
        default:
            years = 'N/A';
            break; 
    }
    return years;
}
  
window.onload = function() {
    const button = document.querySelector( 'button' );
    button.onclick = submit;

    updateTable(false);
}