// Add some Javascript code here, to run on the front end.

const form = document.getElementById( "form" )
const formTitle = document.getElementById( "form-title" )
const task = document.getElementById( "name" )
const period = document.getElementById( "period" )
const deadline = document.getElementById( "deadline" )

let id = NaN;
let requestType = 0; //0 is add, 1 is edit, 2 is delete

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    
    deadline.value = "" + Date.prototype.getFullYear() + "-"
                        + Date.prototype.getMonth() + "-"
                        + Date.prototype.getDate() + "T"
                        + Date.prototype.getHours() + ":00"

    const json = {id, name: task.value, period: period.value, deadline: deadline.value }
    
    const body = JSON.stringify( json )

    let url

    switch( requestType ) {
        case 0: url = "/add"; break
        case 1: url = "/edit"; break
        case 2: url = "/remove"; break
    }

    fetch( url, {
        method: "POST",
        body
    })
    .then( function( response ) {
        // do something with the reponse
        update(JSON.parse(response))
    })

    return false
}

const add = function ( e ) {
    e.preventDefault()

    form.removeAttribute( "hidden" )
    formTitle.innerText = "Add new task:"
    task.value = "Task Name"
    period.value = "1"
    deadline.value = "2021-09-01T00:00"
    requestType = 0
    id = NaN

    return false;
}

const update = function ( json ) {
    e.preventDefault()

    console.log(json)

    return false;
}

window.onload = function() {
    const submitButton = document.getElementById( "submit-form-button" )
    const addButton = document.getElementById( "add-button" )
    
    submitButton.onclick = submit
    addButton.onclick = add

    //load data from server
    //connect edit and delete buttons to fetch requests
}
