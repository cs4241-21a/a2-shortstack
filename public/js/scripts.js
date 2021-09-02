const getRequest = function(endpoint, data, callback) {
  fetch( endpoint, {
    method:'GET',
    data 
  })
  .then( response => response.json())
  .then( response => callback(response) )
  return false
}

const postRequest = function(endpoint, data, callback) {
  fetch( endpoint, {
    method:'POST',
    body: JSON.stringify(data) 
  })
  .then( response => callback(response) )
  return false
}

function login() {
  document.querySelector('#error-box').innerText = ""
  let username = document.querySelector("#username").value
  let password = document.querySelector("#password").value
  postRequest('/api/login', {
    username,
    password
  }, (response) => {
    console.log("Login status: " + response.status)
    if (response.status === 200) {
      loginSuccess()
    } else {
      loginFailed()
    }
  })
}

function loginSuccess() {
  document.querySelector( '#loginform' ).style.display = 'none'
  els = document.querySelectorAll( '.logged-in' )
  els.forEach(el => el.style.display = 'block')
  getLostItems()
  getFoundItems()
}

function loginFailed() {
  document.querySelector('#error-box').innerText = "Error! Wrong username or password!"
}

function getItems(listname) {
  getRequest('/api/' + listname, {}, (data) => {
    console.log(data)
    let table = ""
    for (const item in data) {
      let info = data[item]
      let row = ""
      row += `<td>${info.item}</td>`
      row += `<td>${info.when}</td>`
      row += `<td>${info.where}</td>`
      row += `<td>${info.description}</td>`
      row += `<td>${info.photo}</td>`
      row += `<td>${info.emailme}</td>`
      table += `<tr>${row}</tr>`
    }
    document.querySelector('#' + listname).innerHTML = table
  })
}

function getFoundItems() {
  getItems('founditems')
}

function getLostItems() {
  getItems('lostitems')
}

function createElement() {
  // Get fields
  let entry = {
    'lost' : document.querySelector( '#type1' ).checked,
    'found' : document.querySelector( '#type2' ).checked,
    'item' : document.querySelector( '#item' ).value,
    'when' : document.querySelector( '#when' ).value,
    'where' : document.querySelector( '#where' ).value,
    'description' : document.querySelector( '#description' ).value,
    'photo' : document.querySelector( '#photo' ).value,
    'emailme' : document.querySelector( '#emailme' ).value
  }
  // Submit to server
  postRequest('/api/create', entry, (response) => {
    if (response.status === 200) {
      // Empty fields
      console.log('Emptying fields')
      document.querySelectorAll( 'input' )
      .forEach((el) => el.value = "")
      // Update lists
      console.log('Updating lists')
      getFoundItems()
      getLostItems()
    } else {
      document.querySelector('#error-box').innerText = "Error, could not create new item."
    }
  })
}

window.onload = function() {
  document.querySelector( '#login-button' ).onclick = (e) => {
    e.preventDefault()
    login()
  }

  document.querySelector( '#createentry-button' ).onclick = (e) => {
    e.preventDefault()
    createElement()
  }
}