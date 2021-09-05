let currEdit = 1

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
    initData()
  }

  const initData = function(){
    fetch('/getData', {
        method:'GET'
      })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        const text = document.getElementById( 'contact_counter' )
        text.innerHTML = 'Number of Contacts: ' + Object.values(data).length
        buildTable('dataTable', data) 
    })
  }

  const buildTable = function(tableId, data){
    let tableRef = document.getElementById(tableId)
    for(var i = tableRef.rows.length - 1; i > 0; i--)
        tableRef.deleteRow(i)


        let row = 1
    data.map( function (item){
        let newRow = tableRef.insertRow(-1)
        newRow.classList += "itemRow"
        
        
        let columnNum = tableRef.rows[0].cells.length
        

        for(let i=0; i < columnNum; i++){ 
            let newCell = newRow.insertCell(i)
            let value = Object.values(item)
            let newText 
           
            if(i == 0)
              newText = document.createTextNode(row)
            else 
            newText = document.createTextNode(value[i - 1])

            newCell.appendChild(newText)
        }
        let edit_icon = document.createElement('td')

        edit_icon.id = row - 1

      newRow.onclick= function(){
        currEdit = edit_icon.id
        showEditWindow(edit_icon.id)
      }
      
        row++

    })

  } 

  const showEditWindow = function(icon_number){
    fetch('/getData', {
      method:'GET',
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      let count = 0
      console.log()
      data.map( function(item){
        if(count == icon_number){
          let value = Object.values(item)
          document.getElementById("editName").value = value[0]
          document.getElementById("editEmail").value = value[1]
          document.getElementById("editNumber").value = value[2]
          document.getElementById("editAge").value = value[3]
          document.getElementById("editNotes").value = value[5]
        }
        count++
      })
      
      document.getElementById("popup_1").classList.toggle("active")
  })
    
  }

  function closeEdit() {
    document.getElementById("popup_1").classList.remove("active")
  }

  function updateItem() {
    const name = document.getElementById('editName')
    const email = document.getElementById('editEmail')
    const number = document.getElementById('editNumber')
    const notes = document.getElementById('editNotes')
    const age = document.getElementById('editAge')

    const json = {
        name: name.value,
        email: email.value,
        number: number.value,
        age: age.value,
        age_group: getAge(age.value),
        notes: notes.value,
        modifyInput: currEdit
    }

    let body = JSON.stringify(json)
    // const input = document.querySelector( '#inptName' ),
    //       json = { name: input.value },
    //       body = JSON.stringify( json )
    
    if (json['name'] === ""  || json['email'] === ""   || json['number'] === ""  || json['notes'] === "" || json['age'] === "")
      alert("Please fill in all field before submitting!")
    else{
        fetch( '/update', {
            method:'POST',
            body 
          })
          .then( function( ) {
            initData()
            closeEdit()
          })
    }
  }

function deleteItem(){
  let confirmAction = confirm("Are you sure to delete this item?")
  if (confirmAction) {
    const json = {
      modifyInput: currEdit
    }

  let body = JSON.stringify(json)
    fetch( '/delete', {
         method:'POST',
         body 
        })
        .then( function( ) {
          initData()
          closeEdit()
        })
  }   
}

function getAge(age){
  if(age < 18 && age > 14){
    return "Teenager"
  }
  else if(age < 18){
    return "Child"
  }
  else if(age > 18 && age < 65){
    return "Adult"
  }
  else {
    return "Senior"
  }
}

const inputText = document.getElementById('inptNotes')
const counter = document.getElementById('counter')

inputText.addEventListener('input', updateValue)

function updateValue(e){
    const target = e.target
    const maxLength = target.getAttribute('maxlength')
    const currentLength = target.value.length
    
    counter.innerHTML = `${currentLength}/${maxLength}`
}


const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name = document.getElementById('inptName')
    const email = document.getElementById('inptEmail')
    const number = document.getElementById('inptNumber')
    const notes = document.getElementById('inptNotes')
    const age = document.getElementById('inptAge')

    const json = {
        name: name.value,
        email: email.value,
        number: number.value,
        age: age.value,
        age_group: getAge(age.value),
        notes: notes.value
    }

    let body = JSON.stringify(json)
    // const input = document.querySelector( '#inptName' ),
    //       json = { name: input.value },
    //       body = JSON.stringify( json )
    

    if (json['name'] === ""  || json['email'] === ""   || json['number'] === ""  || json['notes'] === "" || json['age'] === "")
        alert("Please fill in all field before submitting!")
    
    else{
        fetch( '/submit', {
            method:'POST',
            body 
          })
          .then( function() {
            document.getElementById('inptName').value = ""
            document.getElementById('inptEmail').value = ""
            document.getElementById('inptNumber').value = ""
            document.getElementById('inptNotes').value = ""
            document.getElementById('inptAge').value = ""
            document.getElementById('counter').innerHTML=""
            initData()
          })
    }
  }

  

  




 

 