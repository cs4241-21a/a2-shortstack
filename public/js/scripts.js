let currEdit = 0;



window.onload = function(tableId) {
    initData()
  }

  const initData = function(){
    fetch('/getData', {
        method:'GET',
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const text = document.getElementById( 'contact_counter' )
        text.innerHTML = 'Number of Contacts: ' + Object.values(data).length
        buildTable('dataTable', data)
    })
  }

  const buildTable = function(tableId, data){
    let tableRef = document.getElementById(tableId);
    for(var i = tableRef.rows.length - 1; i > 0; i--)
        tableRef.deleteRow(i);


        let row = 1
    data.map( function (item){
        let newRow = tableRef.insertRow(-1);
        
        let columnNum = tableRef.rows[0].cells.length
        

        for(let i=0; i < columnNum; i++){ 
            let newCell = newRow.insertCell(i);
            let value = Object.values(item)
            let newText 
           
            if(i == 0)
              newText = document.createTextNode(row);
            else 
            newText = document.createTextNode(value[i - 1]);

            newCell.appendChild(newText);  
        }
        let edit_icon = document.createElement('form')

        let edit_item = document.createElement('td')

        edit_icon.classList += "arrow down"
        edit_icon.id = row - 1
        
        edit_icon.onclick = function(){
          currEdit = edit_icon.id
          showEditWindow(edit_icon.id)
      }
      edit_item.appendChild(edit_icon)
      tableRef.rows[row].appendChild(edit_item)
        row++

    })

  } 

  const showEditWindow = function(icon_number){
    fetch('/getData', {
      method:'GET',
    })
    .then(function (response) {
      return response.json();
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
          document.getElementById("editNotes").value = value[3]
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
    console.log("updated")
    submitUpdate()
    
  }

  const submitUpdate = function( e ) {
    // prevent default form action from being carried out
 

    const name = document.getElementById('editName')
    const email = document.getElementById('editEmail')
    const number = document.getElementById('editNumber')
    const notes = document.getElementById('editNotes')

    const json = {
        name: name.value,
        email: email.value,
        number: number.value,
        notes: notes.value,
        modifyInput: currEdit
    };

    let body = JSON.stringify(json);
    // const input = document.querySelector( '#inptName' ),
    //       json = { name: input.value },
    //       body = JSON.stringify( json )
    let jsonPost = JSON.parse(body);
    if (jsonPost['name'] === ""  || jsonPost['email'] === ""   || jsonPost['number'] === ""  || jsonPost['notes'] === "")
    alert("Please fill in all field before submitting!")

    else{
        fetch( '/update', {
            method:'POST',
            body 
          })
          .then( function( response ) {
            initData()
            closeEdit()
          });
    }
    
  }

 