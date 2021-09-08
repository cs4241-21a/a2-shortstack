// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    
    const json = {}
    json["courseName"] = document.getElementById("courseName").value
    json["assignmentName"] = document.getElementById("assignmentName").value
    json["dueDate"] = document.getElementById("dueDate").value
    json["submissionType"] = document.getElementById("submissionType").value
    json["description"] = document.getElementById("description").value

    const body = JSON.stringify( json )

    fetch( '/submit', {
        method:'POST',
        body 
    })
    .then( function( response ) {
        return response.json()
    }).then(function(data){
        console.log(data)
    })

    

    return false
}

window.onload = function() {
    const button = document.getElementById( 'formSubmit' )
    button.onclick = submit
}