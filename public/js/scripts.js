// Add some Javascript code here, to run on the front end.

const form = document.getElementById( "form" )
const formTitle = document.getElementById( "form-title" )
const task = document.getElementById( "name" )
const period = document.getElementById( "period" )
const deadline = document.getElementById( "deadline" )

const taskContainer = document.getElementById( "task-container" )
const taskTemplate = document.getElementById( "task-template" ).content.children[0]

let id = NaN;
let requestType = 0; //0 is add, 1 is edit, 2 is delete

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const json = { id, name: task.value, period: period.value, deadline: deadline.value }
    
    const body = JSON.stringify( json )

    let url

    switch( requestType ) {
        case 0: url = "/add"; form.hidden = true; break
        case 1: url = "/edit"; form.hidden = true; break
    }

    fetch( url, {
        method: "POST",
        body
    })
    .then( ( response ) => response.json() )
    .then( function( appData ) {
        update( appData )
    })

    return false
}

const add = function ( e ) {
    e.preventDefault()

    form.hidden = false
    formTitle.innerText = "Add new task:"
    task.value = "Task Name"
    period.value = "1"
    deadline.value = "2021-09-01T00:00"
    requestType = 0
    id = NaN

    return false
}

const getEditCallback = function( task ) {
    const utask = task
    return function( e ) {
        edit( e, utask )
    }
}

const getRemoveCallback = function( task ) {
    const utask = task
    return function( e ) {
        remove( e, utask )
    }
}

const edit = function( e, utask ) {
    e.preventDefault()

    form.removeAttribute( "hidden" )
    formTitle.innerText = "Edit task:"
    task.value = utask.name
    period.value = utask.period
    deadline.value = utask.deadline
    requestType = 1
    id = utask.id

    return false
}

const remove = function( e, utask ) {
    e.preventDefault()

    requestType = 2
    id = utask.id

    fetch( "/remove", {
        method: "POST",
        body: JSON.stringify( { id } )
    })
    .then( ( response ) => response.json() )
    .then( function( appData ) {
        update( appData )
    })

    return false
}

const update = function ( json ) {
    console.log( json )

    //clear tasks
    taskContainer.innerHTML = ""

    //load tasks from json
    json.forEach(task => {
        let element = taskTemplate.cloneNode( true )
        element.children[0].innerText = task.name
        element.children[1].innerText = task.start
        element.children[2].innerText = task.period
        element.children[3].innerText = task.deadline
        element.children[4].children[0].onclick = getEditCallback( task )
        element.children[4].children[1].onclick = getRemoveCallback( task )

        taskContainer.appendChild( element )
    });

    return false
}

window.onload = function() {
    const submitButton = document.getElementById( "submit-form-button" )
    const addButton = document.getElementById( "add-button" )
    
    submitButton.onclick = submit
    addButton.onclick = add

    //load data from server
    fetch( "/update", {
        method: "POST",
        body: "{}"
    })
    .then( ( response ) => response.json() )
    .then( function( appData ) {
        update( appData )
    })
}
