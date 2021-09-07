// Add some Javascript code here, to run on the front end.

// console.log("Welcome to assignment 2!")

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

            // do something with the response
            return response.json()
        }).then( function ( json ) {
        console.log('Server response: ' + json)
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

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit

}