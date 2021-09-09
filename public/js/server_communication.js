const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#my_form' ).elements
    var json = {}
    for(var i = 0 ; i < input.length - 1 ; i++){ // Subtract 1 because we don't want to include the label
        var item = input.item(i);
        if(item.type == "checkbox") { json[item.name] = item.checked; }
        else { json[item.name] = item.value; }
    }

    if(validate_row(json.list_entry, json.quantity)) {
        body = JSON.stringify( json );
        clear_form();
        fetch( '/submit', { // post request to server. Doenst refer to file. A string that gets passed. Request.url this way you can request different types like /delete
            method:'POST',
            body
        })
            .then( function( response ) {
                // do something with the reponse
                response.text().then(function(text) {
                    update_table(text)
                });
            });
    }
    else {
        // Error message
        alert("Bad Form");
    }
    return false
}

window.onload = function() {
    fetch( '/load', {
        method:'GET',
    }).then( function( response ) {
        response.text().then(function (text) {
            update_table(text)
        });
    });
    const button = document.querySelector( 'button' )
    button.onclick = submit
}

function validate_row(item, quantity) {
    if(item === "" || quantity === "") { return false; }
    if(isNaN(quantity)) { return false; }
    return true;
}

function clear_form() {
    document.getElementById("my_form").reset();
}