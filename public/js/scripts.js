console.log("Welcome to assignment 2!")

const ACTION_ADD= "add"
const ACTION_MODIFY= "modify"
const ACTION_DELETE = "delete"
const ACTION_NONE = "none"

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const inputName = document.querySelector( '#taskname' )
    const inputPriority = document.querySelector( '#priority' )
    const inputDuedate = document.querySelector( '#duedate' )

    const json = { "taskname": inputName.value, "priority": inputPriority.value, "duedate": inputDuedate.value}
    const body = JSON.stringify( json )
console.log("body = ", body)
    fetch( '/submit', {
      method:'POST',
      body
    })
    .then( function( response ) {
        console.log(response)
        return response.json()
    })
    .then( function( json ) {
      console.log( "Tasks: ")
      
      const table = document.querySelector("#data_display");
      const messagebox = document.querySelector("#message_box")
      
      messagebox.innerHTML = json.message
      
      for (let i = table.rows.length-1; i > 0 ; i--) {
        table.deleteRow(i)
      }
      for (let i = 0; i < json.tasks.length; i++) {  
        addtoTable( table, json.tasks[i] )
      }
    })

    return false
  }

  window.onload = function() {
    const button = document.querySelector( '#submitted' )
    button.onclick = submit
  }

  function addtoTable( table, task) {
    console.log("addtoTable")
    const row = table.insertRow(table.length)
    const c1 = row.insertCell(0)
    const c2 = row.insertCell(1)
    const c3 = row.insertCell(2)
    const c4 = row.insertCell(3)
    c1.innerHTML = task.taskname
    c2.innerHTML = task.priority
    c3.innerHTML = task.duedate
    c4.innerHTML = task.remainingdate;
  }