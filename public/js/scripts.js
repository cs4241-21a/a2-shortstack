// Add some Javascript code here, to run on the front end.

let dataArr = []

const submit = function( e ) {
    
    let name = document.querySelector( '#yourname' )

    if (name.value ==="") {
        alert("Fields not filled in")
        return false
    } 


          json = { yourname: name.value }
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      return response.text()
    })

    .then( function ( text ) {
        dataArr.push(JSON.parse(text));
        updateTable();
        console.log("dataArr: " + JSON.stringify(dataArr));
    })

    return false
  }



  const modify = function (e) {

      let entry = dataArr[Number(e.target.id.substring(1))];

      document.querySelector('#yourname').value = entry.yourname

      dataArr.splice(Number(e.target.id.substring(1)), 1);
      console.log("Current dataArr when editing: " + JSON.stringify(dataArr))

      updateTable();
    }

  const remove = function (e) {
    e.preventDefault()

    //Gets the id of the row that needs to be deleted
    dataArr.splice(Number(e.target.id.substring(3)), 1);
    console.log("Current dataArr after deletion: " + JSON.stringify(dataArr))

    updateTable();
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }

  function updateTable() {

    let tbody = document.querySelector('tbody')
    tbody.innerHTML = ""

    for (let index = 0; index < dataArr.length; index++) {

        let newRow = document.createElement('tr')

        for (let cell = 0; cell < 6; cell++) {

            let newCell = document.createElement('td')
            let newText;

           switch(cell) {
               case 0:
                   //Creates a new cell that contains the Name value
                   newText = document.createTextNode(dataArr[index].yourname);
                   break;
                case 1:
                    //Creates a new cell that contains the Edit button
                    newText = document.createElement('Input')
                    newText.setAttribute('type','button')
                    newText.setAttribute('value', 'Edit')
                    newText.className = 'editButton';
                    break;
                case 2:
                    //Creates a new cell that contains the Remove button
                    newText = document.createElement('Input')
                    newText.setAttribute('type','button')
                    newText.setAttribute('value', 'Remove')
                    newText.className = 'removeButton';
                    break;
           }
            //Adds an event to the Edit button
            if (cell === 1) {
                newText.id = "Edit" + index.toString()
                newText.onclick = modify;
            }
            //Adds an event to the Remove button
            if (cell === 2) {
                newText.id = "Delete" + index.toString()
                newText.onclick = remove;
            }
            //Placing each text to there appropriate cell and placing each cell to a row
            newCell.appendChild(newText)
            newRow.appendChild(newCell)
        }
        //Placing the row in the tbody
        tbody.appendChild(newRow)
    }
  }
