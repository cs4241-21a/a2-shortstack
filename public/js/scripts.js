// Add some Javascript code here, to run on the front end.

// console.log("Welcome to assignment 2!")


// todo rain droplets --> rainyday.js
// function run() {
//     var image = '../backgrounds/default.jpeg';
//     image.onload = function () {
//         var engine = new RainyDay({
//             image: this
//         });
//         engine.rain([
//             [3, 2, 2]
//         ], 100);
//     };
//     image.crossOrigin = 'anonymous';
//     // image.src = '../backgrounds/default.jpeg';
// }

// todo rain sound
    // light rain looping
    // rain loop
    // intense rain loop
    // heavy rain loop
    // downpour loop
// todo lofi music

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    let speed = 0

    const input = document.querySelector( '#rain_mix_name' ),
        // todo calculate rain speed, add to json
        // todo get background image, add to json
        // todo get rain sound
          json = { rain_mix_name: input.value },
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
    })

    return false
  }

  window.onload = function() {
    const play_button = document.getElementById( 'play' )
    play_button.onclick = submit
    // todo listener for play history
  }

  // todo play history function