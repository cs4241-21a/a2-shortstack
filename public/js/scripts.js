  const getRequest = function(endpoint, data, callback) {
  fetch( endpoint, {
    method:'GET',
    data 
  })
  .then( callback(response) )
  return false
}

function login() {
  getRequest('/login', {
    username,
    password
  }, (response) => {
    if (response.success) {
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
}

function loginFailed() {
  document.querySelector('#error-box').innerText = "Error! Wrong username or password!"
}

function getMatches() {
  document.querySelector( '#' )
}

window.onload = function() {
    document.querySelector( '#login-button' ).onclick = (e) => {
      e.preventDefault()
      login()
    }
  }