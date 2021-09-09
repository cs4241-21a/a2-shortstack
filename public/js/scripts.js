// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

let editFlag = -1

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input1 = document.querySelector( '#descrip' ),
          input2 = document.querySelector( '#expectedTime' ),
          input3 = document.querySelector( '#dueDate' ),
          prompt = document.querySelector("#prompt"),
          json = { descrip: input1.value,
                   expectedTime: input2.value,
                   dueDate: input3.value },
          body = editFlag != -1 ? "EDIT" + editFlag + JSON.stringify( json ) : JSON.stringify( json )


    editFlag = -1

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( response => response.json() )
    .then( function ( json ) {
      // do something with the reponse
      const element = document.querySelector('#taskTable')
      
      for(let i = 1; i <= json.length; i++){
        if(i < element.rows.length){
          element.rows[i].cells[0].innerHTML = json[i-1].descrip
          element.rows[i].cells[1].innerHTML = json[i-1].expectedTime
          element.rows[i].cells[2].innerHTML = json[i-1].dueDate
          element.rows[i].cells[3].innerHTML = json[i-1].DueDate
        } else {
          let newRow = element.insertRow(i)

          newRow.insertCell(0)
          newRow.insertCell(1)
          newRow.insertCell(2)
          newRow.insertCell(3)

          newRow.cells[0].innerHTML = json[i-1].descrip
          newRow.cells[1].innerHTML = json[i-1].expectedTime
          newRow.cells[2].innerHTML = json[i-1].dueDate
          newRow.cells[3].innerHTML = json[i-1].DueDate

          let editBtn = document.createElement("button")
          editBtn.classList.add("tableBtn")
          editBtn.classList.add("edit")
          editBtn.innerHTML = "Edit"
          editBtn.onclick = function () {
            input1.value = newRow.cells[0].innerHTML
            input2.value = newRow.cells[1].innerHTML
            input3.value = newRow.cells[2].innerHTML
            prompt.innerHTML = "Enter new data for this row"
            editFlag = i;
          }
          let dltBtn = document.createElement("button")
          dltBtn.classList.add("tableBtn")
          dltBtn.classList.add("delete")
          dltBtn.innerHTML = "Delete"
          dltBtn.onclick = function () {
            let body = "DELETE" + i
            fetch( '/submit', {
              method:'POST',
              body 
            })
            element.deleteRow(i)
          }
          newRow.appendChild(editBtn)
          newRow.appendChild(dltBtn)
        }
      }

      // element.innerText = json[0].descrip
      // document.body.appendChild( element )
      // console.log(JSON.stringify(json))
    })

    prompt.innerHTML = "Enter a task"

    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    if(button !== null)
      button.onclick = submit

    let body = "GETDATA"
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( response => response.json() )
    .then( function ( json ) {
      // do something with the reponse
      const element = document.querySelector('#taskTable')
      
      for(let i = 1; i <= json.length; i++){
        if(i < element.rows.length){
          element.rows[i].cells[0].innerHTML = json[i-1].descrip
          element.rows[i].cells[1].innerHTML = json[i-1].expectedTime
          element.rows[i].cells[2].innerHTML = json[i-1].dueDate
          element.rows[i].cells[3].innerHTML = json[i-1].DueDate
        } else {
          let newRow = element.insertRow(i)

          newRow.insertCell(0)
          newRow.insertCell(1)
          newRow.insertCell(2)
          newRow.insertCell(3)

          newRow.cells[0].innerHTML = json[i-1].descrip
          newRow.cells[1].innerHTML = json[i-1].expectedTime
          newRow.cells[2].innerHTML = json[i-1].dueDate
          newRow.cells[3].innerHTML = json[i-1].DueDate

          if(document.title === "CS4241 Assignment 2"){
            let editBtn = document.createElement("button")
            editBtn.classList.add("tableBtn")
            editBtn.classList.add("edit")
            editBtn.innerHTML = "Edit"
            editBtn.onclick = function () {
              input1.value = newRow.cells[0].innerHTML
              input2.value = newRow.cells[1].innerHTML
              input3.value = newRow.cells[2].innerHTML
              prompt.innerHTML = "Enter new data for this row"
              editFlag = i;
            }
            let dltBtn = document.createElement("button")
            dltBtn.classList.add("tableBtn")
            dltBtn.classList.add("delete")
            dltBtn.innerHTML = "Delete"
            dltBtn.onclick = function () {
              let body = "DELETE" + i
              fetch( '/submit', {
                method:'POST',
                body 
              })
              element.deleteRow(i)
            }
            newRow.appendChild(editBtn)
            newRow.appendChild(dltBtn)
          }
        }
      }

      // element.innerText = json[0].descrip
      // document.body.appendChild( element )
      // console.log(JSON.stringify(json))
    })
  }