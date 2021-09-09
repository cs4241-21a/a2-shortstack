const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const title = document.querySelector( '#title' ),
    author = document.querySelector(' #author '),
    score = document.querySelector(' #score '),
    notes = document.querySelector(' #notes '),
    year = document.querySelector(' #year' ),
        json = { title: title.value, author: author.value, score: Number(score.value), notes: notes.value, year: Number(year.value)},
        body = JSON.stringify( json )

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // do something with the reponse 
    console.log( response )
  })
  .then( function( json ) {
    document.querySelector('form').reset();
  })

  return false
}

window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = submit
}