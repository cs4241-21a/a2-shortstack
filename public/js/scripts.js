// Add some Javascript code here, to run on the front end.

// console.log("Welcome to assignment 2!")

let storedMessages = []


/**
 * Submit
 * Provides the function for submitting messages with the form
 *
 * @param e
 * @returns {boolean}
 */
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name = document.getElementById( "inputName" ),
        color = document.getElementById("inputColor"),
        message = document.getElementById("inputMessage"),
        json = { name: name.value, color: color.value, message: message.value },
        body = JSON.stringify( json )

    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( function( response ) {
            document.getElementById("inputMessage").value = ""

            //"Submission response: " +
            console.log(response)
            // do something with the response
            return response.json()
        }).then( function ( json ) {
            loadMessages()

        // console.log('Server response: ' + json)
        // if(Array.isArray(json)){
        //     for(let car of json){
        //         const model = car.model
        //         const upperModel = model[0].toUpperCase() + model.slice(1)
        //         console.log(upperModel)
        //     }
        // }

        // if(Array.isArray(json)){
        //   json
        //     .map(car => car.model)
        //     .map(model => model[0].toUpperCase() + model.slice(1))
        //     .forEach( m => console.log(m))
        // }

        // if (Array.isArray(json)) {
        //   for (let i = 0; i < json.length; i++) {
        //     const car = json[i]
        //     const model = car.model
        //     const upperModel = model[0].toUpperCase() + model.slice(1)
        //     console.log(upperModel)
        //   }
        // }

        // const field = document.querySelector('#responseField')
        // field.textContent = json.yourname
        // console.log( json )
    })

    return false
}

/**
 * Loads all messages from the server. Only displays new messages
 */
const loadMessages = function (){
    fetch( '/messages', {
        method:'GET'
    }).then(function( response ) {
        return response.json()
    }).then(function (jsonMessages){
        for (const jsonMessage of jsonMessages) {
            if(storedMessages.includes(JSON.stringify(jsonMessage))){
                //Do nothing, we don't want duplicates
            }else {
                storedMessages.push(JSON.stringify(jsonMessage))
                makeMessage(jsonMessage.name, jsonMessage.color, jsonMessage.message)
            }

        }
    })
}

/**
 * makeMessage
 *
 * Takes name, color, and message and creates a new message element and appends it to the screen
 * @param name
 * @param color
 * @param message
 */
const makeMessage = function (name, color, message){
    const messageWrapper = document.createElement("message")
    const nameTag = document.createElement("h3")
    const nameNode = document.createTextNode(name)
    nameTag.appendChild(nameNode)
    const messageBody = document.createElement("p")
    const messageNode = document.createTextNode(message)
    messageBody.appendChild(messageNode)
    messageWrapper.appendChild(nameTag)
    messageWrapper.appendChild(messageBody)
    const documentBody = document.getElementById("main")
    documentBody.appendChild(messageWrapper)
}

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
    loadMessages()
}