// Add some Javascript code here, to run on the front end.


const result = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()
    console.log("get in the result function!")
    body = JSON.stringify( {} );
  
    fetch( '/result', {
      method:'POST',
      body
    })
    .then( response => response.json() )
    .then( function( response ) {
      // do something with the reponse 
      var newContent = ""
      if( Array.isArray(response)){
        for(let i = 0; i < response.length; i++){
            const thing = response[i]
            newContent += "<tr>" +
             "<td>" + thing.name + "</td>" +
             "<td>" + thing.savings + "</td>" +
             "<td>" + thing.cost + "</td>" +
             "<td>" + (thing.savings-thing.cost) + "</td>" +
             "</tr>"
        }
    }
    newContent = "<table><tr><th>Name</th><th>Savings</th><th>Cost</th><th>Balance</th></tr>" + newContent + "</table>"
    document.getElementById("resultDisplay").innerHTML = newContent;
    })
  
    return false
}

const addData = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()
  const input1 = document.querySelector('#fname')
  const input2 = document.querySelector('#fsavings')
  const input3 = document.querySelector('#fcost')
  json = { name: input1.value, savings: parseInt(input2.value), cost: parseInt(input3.value) },
  body = JSON.stringify( json );

  fetch( '/addData', {
    method:'POST',
    body
  })
  .then( response => response.json() )
  .then( function( response ) {
    // do something with the reponse 
    var newContent = ""
    if( Array.isArray(response)){
        for(let i = 0; i < response.length; i++){
            const thing = response[i]
            newContent += "<tr>" +
             "<td>" + thing.name + "</td>" +
             "<td>" + thing.savings + "</td>" +
             "<td>" + thing.cost + "</td>" +
             "<td>" + (thing.savings-thing.cost) + "</td>" +
             "</tr>"
        }
    }
    newContent = "<table><tr><th>Name</th><th>Savings</th><th>Cost</th><th>Balance</th></tr>" + newContent + "</table>"
    document.getElementById("dataTable").innerHTML = newContent;
  })

  return false
}

const deleteData = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()
  const input1 = document.querySelector('#dname')
  json = { name: input1.value },
  body = JSON.stringify( json );

  fetch( '/deleteData', {
    method:'POST',
    body
  })
  .then( response => response.json() )
  .then( function( response ) {
    // do something with the reponse 
    var newContent = ""
    if( Array.isArray(response)){
        for(let i = 0; i < response.length; i++){
            const thing = response[i]
            newContent += "<tr>" +
             "<td>" + thing.name + "</td>" +
             "<td>" + thing.savings + "</td>" +
             "<td>" + thing.cost + "</td>" +
             "<td>" + (thing.savings-thing.cost) + "</td>" +
             "</tr>"
        }
    }
    newContent = "<table><tr><th>Name</th><th>Savings</th><th>Cost</th><th>Balance</th></tr>" + newContent + "</table>"
    document.getElementById("dataTable").innerHTML = newContent;
  })

  return false
}

window.onload = function() {
  const button1 = document.getElementById( 'ServerMemory' )
  button1.onclick = result

  const button2 = document.getElementById( 'addButton' )
  button2.onclick = addData

  const button3 = document.getElementById( 'deleteButton' )
  button3.onclick = deleteData
}

