const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const name = document.querySelector('#yourname'),
        make = document.querySelector("#make"),
        model = document.querySelector("#model"),
        year = document.querySelector("#year"),
        plateNum = document.querySelector("#platenumber")

    if (name.value === "" || make.value === "" || model.value === "" || year.value === "" || plateNum.value === "") {
        alert("Need to fill all fields!")
        return false
    }

    if (isNaN(year.value)) {
        alert("Please input a valid year.")
        return false
    }

    let yearNum = parseInt(year.value)

    if (yearNum < 1886) {
        alert("Cars were not invented yet. Please input a valid year.")
        return false
    }

    let d = new Date()
    let d1 = d.getFullYear()

    if (yearNum > d1) {
        alert("This year's models aren't released yet.")
        return false
    }

    year.value = yearNum

    if (plateNum.value.length < 5 || plateNum.value.length > 8) {
        alert("A plate number has a min of 5 and max of 8 characters.")
        return false
    }

    plateNum.value = plateNum.value.toUpperCase()
    let table = document.getElementById("cartable")
    for(let row of table.rows) {
        if(row.cells[4].innerHTML === plateNum.value) {
            alert("Cannot have multiple cars with the same plate number.")
            return false
        }
    }

    json = {
        yourname: name.value,
        make: make.value,
        model: model.value,
        year: year.value,
        plateNum: plateNum.value
    },
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(response => response.text())
        .then(function (text) {
            const data = JSON.parse(text)
            const i = data.length - 1
            let table = document.getElementById("cartable")
            let row = table.insertRow(-1)
            let c1 = row.insertCell(0)
            let c2 = row.insertCell(1)
            let c3 = row.insertCell(2)
            let c4 = row.insertCell(3)
            let c5 = row.insertCell(4)
            let c6 = row.insertCell(5)
            let c7 = row.insertCell(6)
            c1.innerHTML = data.yourname
            c2.innerHTML = data.make
            c3.innerHTML = data.model
            c4.innerHTML = data.year
            c5.innerHTML = data.plateNum
            c6.innerHTML = data.age
            c7.innerHTML = '<button id="delete" onclick="remove(this)">Delete</button>'
            let form = document.getElementById("carform");
            form.reset();
        })

    return false
}

const remove = function (obj) {
    let form = document.getElementById("carform");
    form.reset();

    let rowNum = obj.parentNode.parentNode.rowIndex
    let plateNumber = document.getElementById("cartable").rows[rowNum].cells[4].innerHTML
    document.getElementById("cartable").deleteRow(rowNum)
    const body = JSON.stringify(plateNumber)

    fetch('/remove', {
        method: 'POST',
        body
    })
        .then(response => response.text())
        .then(function (text) {
            console.log("Deleted row from server.")
        })
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit
}