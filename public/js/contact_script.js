const inputText = document.getElementById('inptNotes');
const counter = document.getElementById('counter');

inputText.addEventListener('input', updateValue);

function updateValue(e){
    const target = e.target;
    const maxLength = target.getAttribute('maxlength');
    const currentLength = target.value.length;
    
    counter.innerHTML = `${currentLength}/${maxLength}`;
};


const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name = document.getElementById('inptName')
    const email = document.getElementById('inptEmail')
    const number = document.getElementById('inptNumber')
    const notes = document.getElementById('inptNotes')

    const json = {
        name: name.value,
        email: email.value,
        number: number.value,
        notes: notes.value,
    };

    let body = JSON.stringify(json);
    // const input = document.querySelector( '#inptName' ),
    //       json = { name: input.value },
    //       body = JSON.stringify( json )
    

    if (json['name'] === ""  || json['email'] === ""   || json['number'] === ""  || json['notes'] === "")
        alert("Please fill in all field before submitting!")
    
    else{
        fetch( '/submit', {
            method:'POST',
            body 
          })
          .then( function( response ) {
            document.getElementById('inptName').value = "";
            document.getElementById('inptEmail').value = "";
            document.getElementById('inptNumber').value = "";
            document.getElementById('inptNotes').value = "";
            
          });
    }
  }

  window.onload = function(tableId) {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }
