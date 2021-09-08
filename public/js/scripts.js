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

let sound

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    let speed = 0

    // todo calculate rain speed, add to json
    // todo get background image, add to json
    // todo get rain sound

    let inputs = [
      document.getElementsByName('rain_level'),
      document.getElementsByName('environment'),
      document.getElementsByName('lofi')
    ];
    let input_values = []
    let mix_name = document.getElementsByName('rain_mix_name')[0].value
    let sounds = []
    

    // get input values
    for (i = 0; i < inputs.length; i++) {
      current_input = inputs[i]
      
      for(j = 0; j < current_input.length; j++) {
        if(current_input[j].checked) {
          // console.log(current_input[j].id)
          input_values.push(current_input[j].id)

          // add to sounds array
          sounds.push(current_input[j].id)
        } 
      }
    }



    // store data in json
    json = { 
      rain_mix_name: mix_name,
      rain_level: input_values[0],
      environment: input_values[1],
      lofi: input_values[2],
      sounds: sounds
    },
    body = JSON.stringify( json )

    // const input = document.querySelector( '#rain_mix_name' ),
        
    

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      console.log( response )
    })

    // stop the previous sound
    if (sound !== undefined) {
      sound.stop()
    }
    
    // update the sound
    sound = new Howl({
      // src: ['../sounds/light-rain.wav'],
      src: "../sounds/lofi.mp3",
      autoplay: true,
      loop: true,
    });
    
    sound.play();

    return false
  }

  window.onload = function() {
    const play_button = document.getElementById( 'play' )
    play_button.onclick = submit
    // todo listener for play history

    
  }

  

  // sound.once('load', function(){
  //   sound.play();
  // });

  // todo play history function