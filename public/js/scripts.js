// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name = document.getElementById( 'yourname' ),
        gradYear = document.getElementById('grad-year'),
        major = document.getElementById('major'),
        json =
            {
                name: name.value,
                gradYear :gradYear.value,
                major: major.value
            },
        body = JSON.stringify( json )
    console.log(body)

    fetch( '/submit', {
        method:'POST',
        body
    }).then(response => response.json())
        .then( function( data ) {
            name.value = ""
            gradYear.value = ""
            major.value = ""
            updateTable(data)
        })
    return false
}

window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
    preloadDatabase()
}

function updateTable(data) {
    console.log(data)
    let tr = document.createElement("tr")
    let name = document.createElement("td")
    name.textContent = data.name
    tr.appendChild(name)
    let gradYear = document.createElement("td")
    gradYear.textContent = data.gradYear
    tr.appendChild(gradYear)
    let className = document.createElement("td")
    className.textContent = data.className
    tr.appendChild(className)
    let major = document.createElement("td")
    major.textContent = data.major
    tr.appendChild(major)
    document.getElementById("data-table").appendChild(tr)
}

function preloadDatabase() {
    fetch('/database').then(response => response.json()).then(json => {
        console.log(json)
        json.forEach(data => {
            updateTable(data)
        })
    })
}