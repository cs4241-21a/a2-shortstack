let dataArr = [];

const submit = function (e) {
    e.preventDefault()

    const name = document.querySelector('#name');
    const age = document.querySelector('#age');
    const color = document.querySelector('#color');

    if (name.value === "" || age.value === "" || color.value === "") {
        console.log("Invalid field.");
        alert("Please fill in all fields!");
        return false;
    }

    let json = { name: name.value, age: age.value, color: color.value }
    let body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(function (response) {
            return response.text()
        })

        .then(function (text) {
            dataArr.push(JSON.parse(text));
            clearTable();
            updateTable();
            console.log("dataArr: " + JSON.stringify(dataArr));
        })

    return false
}

const remove = function (e) {
    e.preventDefault()

    dataArr.splice(Number(e.target.id.substring(6)), 1);
    console.log("Current dataArr after deletion: " + JSON.stringify(dataArr))

    clearTable();
    updateTable();
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit
}

function clearTable() {
    let table = document.querySelector('table');
    table.getElementsByTagName("tbody")[0].innerHTML = table.rows[0].innerHTML;
}

function updateTable() {

    let tbody = document.querySelector('tbody')

    for (let index = 0; index < dataArr.length; index++) {
        let newRow = document.createElement('tr');
        for (let i = 0; i < 5; i++) {
            let newCell = document.createElement('td')
            let cellAdd;

            switch (i) {
                case 0:
                    cellAdd = document.createTextNode(dataArr[index].name);
                    break;
                case 1:
                    cellAdd = document.createTextNode(dataArr[index].age);
                    break;
                case 2:
                    cellAdd = document.createTextNode(dataArr[index].color);
                    break;
                case 3:
                    cellAdd = document.createTextNode(dataArr[index].poggage);
                    break;
                case 4:
                    cellAdd = document.createElement('Input');
                    cellAdd.setAttribute('value', 'Delete');
                    cellAdd.setAttribute('type', 'button');
                    cellAdd.className = 'button';
                    cellAdd.id = "Delete" + index.toString();
                    cellAdd.onclick = remove;
                    break;
            }
            newCell.appendChild(cellAdd);
            newRow.appendChild(newCell);
        }
        tbody.appendChild(newRow);
    }
}