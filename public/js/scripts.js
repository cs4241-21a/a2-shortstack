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
let howls = []
let rain_sound, lofi_music

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    // todo get background image, add to json

    let inputs = [
      document.getElementsByName('rain_level'),
      document.getElementsByName('environment'),
      document.getElementsByName('lofi')
    ];
    let input_values = []
    let rain_level_index = 0, environment_index = 1, lofi_index = 2
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
          if (i == rain_level_index || i == lofi_index)
            sounds.push(current_input[j].id)
        } 
      }
    }

    

    


    // store data in json
    json = { 
      rain_mix_name: mix_name,
      rain_level: input_values[rain_level_index],
      environment: input_values[environment_index],
      lofi: input_values[lofi_index],
      sounds: sounds,
      // rain_volume: rain_volume.toFixed(1)
    },
    body = JSON.stringify( json )
        
    

    fetch( '/submit', {
      method:'POST',
      body 
    })
    // .then(response =>{
    //   console.log(response);
    //   if(response.ok){
    //        console.log(response.json()); //first consume it in console.log
    //       return response.json(); //then consume it again, the error happens
    //   }
    // }
    .then(function(response) {
      // console.log('response', response)
      // console.log('response text', response.json())
      if(response.ok)
        // console.log('response', response.text())
        return response.json();
    })
    .then(function (json) {
      console.log('json', json)
      
      playNewSound(json)
      setBG(json.environment)
        // howls[1].volume(0.5)
    })
    return false
  }

  window.onload = function() {
    const play_button = document.getElementById( 'play' )
    play_button.onclick = submit
    // todo listener for play history

    
  }


function setBG(environment) {
  let bg = document.getElementById("body")

  bg.style.backgroundImage = "url(../backgrounds/"+environment+".jpeg)"
}

  // sound.once('load', function(){
  //   sound.play();
  // });

  // todo play history function

// get the audio file paths
function getAudioFiles(input_json) {
  let result = []

  // add lofi if necessary
  if (input_json.lofi === "lofi_on") {
    result.push('../sounds/lofi.mp3')
  }

  // add rain sound
  result.push('../sounds/'+input_json.rain_level+'.wav')

  
  console.log('sounds', result)
  return result
}

// play the new sounds
function playNewSound(json) {
  let newSound = getAudioFiles(json)

  // stop the previous sound
  if (howls[0] !== undefined) {
    howls[0].stop(['rain_sound'])
    howls[0].stop()
  }
  if (howls[1] !== undefined) {
    howls[1].stop(['lofi_music'])
    howls[1].stop()
  }

  // set up the Howl
  for (i = 0; i < newSound.length; i++) {
    howls[i] = new Howl({
      src: newSound[i],
      autoplay: true,
      loop: true
    });
  }



  // play the sound(s)
  rain_sound = howls[0].play();
  howls[0].volume(parseFloat(json.rain_volume));
  if (howls[1] !== undefined)
    lofi_music = howls[1].play();
}