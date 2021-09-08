// deleteEntry(index) helper function
function deleteEntry(index) {
    console.log("Deleting entry " + index);

    let json = { "index": index };
    let body = JSON.stringify(json)

    fetch('/delete', {
        method: 'POST',
        body
    })
        .then(updatePage())

}

// editEntry(index, name, age, color) helper function - technically it just deletes the entry and puts the data in the submit form, but hey it works!
function editEntry(index, name, age, color) {
    console.log("Editing entry " + index);

    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("color").value = color;

    let json = { "index": index };
    let body = JSON.stringify(json);

    fetch('/delete', {
        method: 'POST',
        body
    })
}

// updatePage() helper function
function updatePage() {
    fetch('/update', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        appdata = data;

        // make table
        const resultTable = document.getElementById("results");
        resultsTable.innerHTML = " ";

        // make table headers
        let th1 = document.createElement('th');
        th1.innerHTML = "Name";

        let th2 = document.createElement('th');
        th2.innerHTML = "Age";

        let th3 = document.createElement('th');
        th3.innerHTML = "Favorite Color";

        let th4 = document.createElement('th');
        th2.innerHTML = "Edit";

        let th5 = document.createElement('th');
        th2.innerHTML = "Delete";

        headerRow.appendChild(th1);
        headerRow.appendChild(th2);
        headerRow.appendChild(th3);
        headerRow.appendChild(th4);
        headerRow.appendChild(th5);
        resultTable.appendChild(headerRow);

        // populate table rows
        for (let dataIndex = 0; dataIndex < appdata.length; dataIndex++) {
            let entry = appdata[dataIndex]
            
            let newRow = document.createElement('tr');
            newRow.className = "tableEntry"

            let nameData = document.createElement('td');
            nameData.innerHTML = entry["name"];

            let ageData = document.createElement('td');
            ageData.innerHTML = entry["age"];

            let colorData = document.createElement('td');
            colorData.innerHTML = entry["color"];

            let editButton = document.createElement('td');
            editButton.innerHTML = "Edit";
            editButton.onclick = function (e) {
                e.preventDefault();
                editEntry(dataIndex, entry["name"], entry["age"], entry["color"]);
            }

            // add delete icon
            let deleteButton = document.createElement('td');
            deleteButton.innerHTML = "<button>Delete</button>";
            deleteButton.onclick = function (e) {
                e.preventDefault();
                deleteEntry(dataIndex);
            }

            newRow.appendChild(nameData);
            newRow.appendChild(ageData);
            newRow.appendChild(colorData);
            newRow.appendChild(editButton);
            newRow.appendChild(deleteButton);

            // add to row
            resultsTable.appendChild(newRow);
        }
    })
}

const submit = function (e) {
    e.preventDefault()

    console.log("Adding entry...");

    let name = document.querySelector('#name'),
        age = document.querySelector('#age'),
        color = document.querySelector('#color');

    // Checks that no fields are empty
    if (name.value === "" || age.value === "" || color.value === "") {
        console.log("Empty fields");
        alert("Please fill in all fields!");
        return false;
    }

    const form = document.querySelector("form");
    let json = {};
    let data = new FormData(form);
    for (let pair of data.entries()) {
        json[pair[0]] = pair[1];
    }

    let body = JSON.stringify(json);

    fetch('/add', {
        method: 'POST',
        body
    }).then(function () {
        console.log("Finished add request")
        updatePage()
        form.reset()
    })
}

window.onload = function () {
    const button = document.querySelector("form");
    button.onsubmit = submit;
    updatePage();
}