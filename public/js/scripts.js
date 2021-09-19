// Add some Javascript code here, to run on the front end.
function renderTable() {
    var table = document.getElementById("main-tbody")
    table.innerHTML = ""

    //var table = document.getElementById("main-table")

    fetch('/getData', {
        method: 'GET'
      })
    .then(response => response.json())
    .then(function(json) {
        // Parse the response
        var index = 0;
        for (let item of json) {
            var row = table.insertRow()
            for (var i = 0; i < 8; i++) {
                row.insertCell(i)
            }
            row.cells[0].innerHTML = "<input type='checkbox' onclick='setTimeout(function() {deleteItem(" + index + ")}, 250)'>"
            row.cells[1].innerHTML = item.name
            row.cells[2].innerHTML = item.category
            row.cells[3].innerHTML = item.priority
            row.cells[4].innerHTML = item.duedate
            // TODO: Importance NEEDS to get figured out automatically
            row.cells[5].innerHTML = item.importance
            row.cells[6].innerHTML = "<button onclick='updateItem(" + index + ")'>Edit</button>"
            row.cells[7].innerHTML = "<button onclick='deleteItem(" + index + ")'>Delete</button>"
            index++;
        }
    })
}

function deleteItem(index) {
    fetch('/deleteData', {
        method: 'DELETE',
        body: index
    })
    .then(function (response) {
        renderTable()
    })
}

const postItem = function(e) {
    e.preventDefault()

    var name = document.getElementById("input-name").value
    var duedate = document.getElementById("input-duedate").value
    var priority = document.getElementById("input-priority").value
    var category = document.getElementById("input-category").value

    var data = {"name": name, "duedate": duedate, "priority": priority, "importance": 1, "category": category}

    fetch('/postData', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(function (response) {
        renderTable()
        document.getElementById("input-name").value = ""
        document.getElementById("input-duedate").value = ""
        document.getElementById("input-priority").value = "1"
        document.getElementById("input-category").value = ""
    })

    return false
}

function updateItem(item) {
    var table = document.getElementById("main-tbody")
    var name = table.rows[item].cells[1].innerHTML
    var category = table.rows[item].cells[2].innerHTML
    var priority = table.rows[item].cells[3].innerHTML
    var date = table.rows[item].cells[4].innerHTML
    table.rows[item].cells[1].innerHTML = "<input type='text' id='" + item + "-name'>"
    document.getElementById(item + "-name").value = name
    table.rows[item].cells[2].innerHTML = "<input type='text' id='" + item + "-category'>"
    document.getElementById(item + "-category").value = category
    table.rows[item].cells[3].innerHTML = "<select id='" + item + "-priority'><option value='1'>1 (most important)</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4 (least important)</option></select>"
    document.getElementById(item + "-priority").value = priority
    table.rows[item].cells[4].innerHTML = "<input type='date' id='" + item + "-duedate'>"
    document.getElementById(item + "-duedate").value = date
    table.rows[item].cells[6].innerHTML = "<button onclick='updateItem2(" + item + ")'>Update</button>"
}

function updateItem2(item) {
    data = {"index": item, "name": document.getElementById(item + "-name").value, "priority": document.getElementById(item + "-priority").value, "duedate": document.getElementById(item + "-duedate").value}
    fetch('/patchData', {
        method: "PATCH",
        body: JSON.stringify(data)
    })
    .then(function (response) {
        renderTable()
    })
}

window.onload = function () {
    renderTable()

    button = document.querySelector("#input-submit")
    button.onclick = postItem
}