let dataArr = [];

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
  
    const name = document.querySelector( '#yourname' ),
    major = document.querySelector('#major'),
    sleep = document.querySelector('#hours');

    //Error checking to make sure the fields are not empty
    if (name.value === "" || major.value === "" || sleep.value === "") {
        console.log("All fields are empty")
        alert("All fields needs to be filled.")
        return false
    } 

    //Error checking to make sure the fields are not the starting text
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
      return response.text()
    })

    .then( function ( text ) {
        dataArr.push(JSON.parse(text));
        updateTable();
        console.log("dataArr: " + dataArr);
    })
  
    return false
  }

  const remove = function (e) {
    e.preventDefault()
    console.log("e.target.id.substring(1): " + e.target.id.substring(1))
    dataArr.splice(Number(e.target.id.substring(1)), 1);
    updateTable();
  }

  const modify = function (e) {
    e.preventDefault()

    let entry = dataArr[Number(e.target.id.substring(1))];

    document.querySelector("#yourname").value = entry.yourname
    document.querySelector("#major").value = entry.major
    document.querySelector("#hours").value = entry.hours

    dataArr.splice(Number(e.target.id.substring(1)), 1);
    updateTable();
  }
  
  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }

  function updateTable() {

    let tbody = document.querySelector("tbody")
    tbody.innerHTML = ""

    for (let i = 0; i < dataArr.length; i++) {

        let newRow = document.createElement("tr")

        for (let j = 0; j < 6; j++) {

            let newCell = document.createElement("td")
            let newText;

           switch(j) {
               case 0:
                   newText = document.createTextNode(dataArr[i].yourname);
                   break;
                case 1:
                    newText = document.createTextNode(dataArr[i].major);
                    break;
                case 2:
                    newText = document.createTextNode(dataArr[i].hours);
                    break;
                case 3:
                    newText = document.createTextNode(dataArr[i].advice);
                    break;
                case 4:
                    newText = document.createElement("Input")
                    newText.setAttribute('type','button')
                    newText.setAttribute('value', 'Edit')
                    newText.className = 'editButton';
                    break;
                case 5:
                    newText = document.createElement("Input")
                    newText.setAttribute('type','button')
                    newText.setAttribute('value', 'Remove')
                    newText.className = 'removeButton';
                    break;
           }

            if (j === 4) {
                newText.onclick = modify;
            }

            if (j === 5) {
                newText.onclick = remove;
            }

            newCell.appendChild(newText)
            newRow.appendChild(newCell)
        }
        tbody.appendChild(newRow)
    }   
  }