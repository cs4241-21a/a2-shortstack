const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name = document.querySelector('#yourname'),
    make = document.querySelector("#make"),
    model = document.querySelector("#model"),
    year = document.querySelector("#year"),
    plateNum = document.querySelector("#platenumber")
        
    if(name.value === "" || make.value === "" || model.value === "" || year.value === "" || plateNum.value === "") {
        alert("Need to fill all fields!")
        return false
    }

    if(isNaN(year.value)) {
        alert("Please input a valid year.")
        return false
    }

    let yearNum = parseInt(year.value)

    if(yearNum < 1886) {
        alert("Cars were not invented yet. Please input a valid year.")
        return false
    }

    let d = new Date()
    let d1 = d.getFullYear() + 1

    if(yearNum > d1) {
        alert("This year's models aren't released yet.")
        return false
    }

    if(plateNum.value.length < 5 || plateNum.value.length > 8) {
        alert("A plate number has a min of 5 and max of 8 characters.")
        return false
    }

    year.value = yearNum
    plateNum.value = plateNum.value.toUpperCase()
    
    json = { yourname: name.value, make: make.value, model: model.value, year: year.value, plateNum: plateNum.value },
    body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(function (response) {
            // do something with the reponse 
            console.log(response)
        })

    return false
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit
}