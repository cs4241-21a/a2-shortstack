// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")
const submit = async function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    let formData = new FormData(document.querySelector('form'))
    var body = JSON.stringify(Object.fromEntries(formData));;

    let values = await fetch('/submit', {
        method: 'POST',
        body
    }).then(response => response.json())

    // use values to update the 
    console.log(values)

    return false
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit
}
