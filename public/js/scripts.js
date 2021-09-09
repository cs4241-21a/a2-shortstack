const submit = async function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    let formObj = document.querySelector('form')
    var body = JSON.stringify(Object.fromEntries(new FormData(formObj)));

    let valid = formObj.checkValidity()
    formObj.reportValidity()
    if (!valid) {
        return false
    }

    let values = await fetch('/submit', {
        method: 'POST',
        body
    }).then(response => response.json())

    // basic test to see if we got the correct answer
    if (values.length == 0) {
        alert("you guessed correctly!")
        document.getElementById('jellybean').src = "/photo?" + new Date().getTime()
        document.getElementById('table').innerHTML = ''
        document.querySelector('form').reset();
    } else {
        // use values to update the home page
        document.getElementById('table').innerHTML = (values[0] != undefined ? `<tr>${Object.entries(values[0]).map(e => `<th>${capitalize(e[0])}</th>`).join('')}</tr>` : '') + values.map(a => `<tr>${Object.entries(a).map(e => `<td>${e[1]}</td>`).join('')}</tr>`).join('\n');
    }

    return false
}

window.onload = async function () {
    const button = document.querySelector('button')
    button.onclick = submit

    let values = await fetch('/guesses').then(response => response.json())
    document.getElementById('table').innerHTML = (values[0] != undefined ? `<tr>${Object.entries(values[0]).map(e => `<th>${capitalize(e[0])}</th>`).join('')}</tr>` : '') + values.map(a => `<tr>${Object.entries(a).map(e => `<td>${e[1]}</td>`).join('')}</tr>`).join('\n');
}

const capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}