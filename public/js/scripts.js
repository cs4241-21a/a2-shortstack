
  const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    /**const input = document.querySelector( '#yourname' ),
          json = { yourname: input.value },
          body = JSON.stringify( json )**/

    let websiteName = document.querySelector("#websiteName")
    let username = document.querySelector("#username")
    let pw = document.querySelector("#pw")
    let json = {
      websiteName: websiteName.value,
      username: username.value,
      pw: pw.value,
      critique: ""}
    let body = JSON.stringify(json)
    fetch( '/submit', {
      method:'POST',
      body
    })
    .then( async function ( response ) {
      let newData = await response.json()
      refreshInfo(newData)
      console.log( newData )
    })

    return false
  }

  function refreshInfo(newData) {
    const board = document.getElementById("heldData")
    board.innerHTML = ""

    newData.forEach((element, index) => {
        board.innerHTML +=
          "<tr><td>" + element.websiteName + "</td><td>"
          + element.username + "</td><td>"
          + element.pw + "</td><td>"
          + element.critique + "</td></tr>"
      })
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }
