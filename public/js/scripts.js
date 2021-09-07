// Get elements from index.html
const modal = document.getElementById("promptModal");
const modalBtn = document.getElementById("modalBtn");
const closeBtn = document.getElementById("exitIcon");

const statistics = document.getElementById("statistics");
const statsBtn = document.getElementById("statsBtn");


// Statistics related code

statsBtn.addEventListener("click", toggleStats);

function toggleStats(){
  if (statistics.style.display === "flex") {
    statistics.style.display = "none";
    statsBtn.innerHTML = "Display Stats"
  }
  else {
    statistics.style.display = "flex";
    statsBtn.innerHTML = "Hide Stats"
  }
}

// Modal related code
modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);

function openModal(){
    // console.log("openMdodal() is called");
    modal.style.display = "block";
}

function closeModal(){
    // console.log("closeMdodal() is called");
    modal.style.display = "none";
}

function outsideClick(e){
    // console.log("outsideClick() is called");
    if(e.target == modal) {
        modal.style.display = "none";
    }
}

// Form-related code



// Starter code
/*
const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value },
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
    const button = document.querySelector( 'button' )
    button.onclick = submit
}
*/