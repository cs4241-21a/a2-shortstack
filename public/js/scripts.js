let character = document.getElementById("character");
let frontrope = document.getElementById("frontrope");
let backrope = document.getElementById("backrope");

let scoreModify = document.getElementById("score-modify");
let firstnameModify = document.getElementById("firstname-modify");
let lastnameModify = document.getElementById("lastname-modify");
let idModify = document.getElementById("id-modify");

let submitButton = document.getElementById('submitButton')
let startButton = document.getElementById('startButton')
let jumpButton = document.getElementById('jumpButton')
let editButton = document.getElementById('editButton')

let bar = document.getElementById("bar");
let score = document.getElementById("score")
let counter = 0;
let id = 0;
let isRunning = false;

let selectedPlayer;

//window.onload
window.onload = function() {
    submitButton.onclick = submit
    submitButton.disabled = true

    startButton.onclick = start

    jumpButton.onclick = jump
    jumpButton.disabled = true

    editButton.onclick = editRequest
    editButton.disabled = true

    scoreModify.value = ""
    firstnameModify.value = ""
    lastnameModify.value = ""
    idModify.value = ""

    frontrope.style.animation = "none"
    backrope.style.animation = "none"
    bar.style.animation = "none"
    counter = 0
    score.value = counter;
}

//reset all the values
function reset() {
    submitButton.disabled = true
    startButton.disabled = false
    jumpButton.disabled = true

    frontrope.style.animation = "none"
    backrope.style.animation = "none"
    bar.style.animation = "none"
    counter = 0
    score.value = counter;
}

//attach to submit button - submit a new score entry
const submit = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const inputFirstname = String(document.querySelector('#firstname').value)
    const inputLastname = String(document.querySelector('#lastname').value)
    const inputScore = String(document.querySelector('#score').value)

    var player = { "score": inputScore, "firstname": inputFirstname, "lastname": inputLastname, "id": id }
    var body = JSON.stringify(player)

    reset()

    id++

    fetch('/submit', {
            method: 'POST',
            body
        })
        .then(function(response) {
            response.text().then(function(textdata) {
                console.log(JSON.parse(textdata))
                let appdata = JSON.parse(textdata)
                populateTable(appdata)
            })
        })

    return false
}

//attach to delete icon - delete a given entry
const remove = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    firstnameModify.value = ""
    lastnameModify.value = ""
    scoreModify.value = ""
    editButton.disabled = true

    e = e || window.event;
    var target = e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        let cells = target.getElementsByTagName("td");
        var body = JSON.stringify(cells[4].innerHTML)

        fetch('/delete', {
                method: 'POST',
                body
            })
            .then(function(response) {
                response.text().then(function(textdata) {
                    console.log(JSON.parse(textdata))
                    let appdata = JSON.parse(textdata)
                    populateTable(appdata)
                })
            })
    }
    return false
}

//attach to edit icon - moves data from table row to edit section
const edit = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    e = e || window.event;
    var target = e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        let cells = target.getElementsByTagName("td");
        firstnameModify.value = cells[1].innerHTML
        lastnameModify.value = cells[2].innerHTML
        scoreModify.value = cells[3].innerHTML
        idModify.value = cells[4].innerHTML

        editButton.disabled = false

        window.location.hash = "modify";
        console.log("move to modify section")

    }
    return false
}

//attach to edit button - sends the modified data to the server to be updated
const editRequest = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    if (scoreModify.value < 0 || scoreModify.value > 1000000 || scoreModify.value == '' || firstnameModify.value == '' || lastnameModify.value == '') {
        return
    }

    selectedPlayer = { "score": scoreModify.value, "firstname": firstnameModify.value, "lastname": lastnameModify.value, "id": idModify.value }
    console.log("Selected player: " + selectedPlayer)

    console.log("editRequest")
    if (selectedPlayer != undefined) {
        var body = JSON.stringify(selectedPlayer)
        console.log("Body: " + body)
        fetch('/modify', {
                method: 'POST',
                body
            })
            .then(function(response) {
                response.text().then(function(textdata) {
                    console.log("return from modify fetch request")
                    console.log(JSON.parse(textdata))
                    let appdata = JSON.parse(textdata)
                    populateTable(appdata)
                })
            })
    }
}

//update the scoreboard with the modifed data
function populateTable(appdata) {
    const tableBody = document.getElementById("tableBody")
    tableBody.innerHTML = ""

    for (let player of appdata) {

        const cellRank = document.createElement("td")
        cellRank.appendChild(document.createTextNode(String(player.rank)))

        const cellFirstname = document.createElement("td")
        cellFirstname.appendChild(document.createTextNode(String(player.firstname)))

        const cellLastname = document.createElement("td")
        cellLastname.appendChild(document.createTextNode(String(player.lastname)))

        const cellScore = document.createElement("td")
        cellScore.appendChild(document.createTextNode(String(player.score)))

        const cellID = document.createElement("td")
        cellID.appendChild(document.createTextNode(String(player.id)))

        const cellDelete = document.createElement("td")
        var imgDelete = document.createElement('img')
        imgDelete.src = '../assets/delete.png'
        imgDelete.width = 20;
        imgDelete.onclick = remove
        cellDelete.appendChild(imgDelete)

        const cellEdit = document.createElement("td")
        var imgEdit = document.createElement('img')
        imgEdit.src = '../assets/edit.png'
        imgEdit.width = 20;
        imgEdit.onclick = edit
        cellEdit.appendChild(imgEdit)

        const newRow = document.createElement("tr")
        newRow.append(cellRank, cellFirstname, cellLastname, cellScore, cellID, cellDelete, cellEdit)

        tableBody.appendChild(newRow)
    }


}

//attach to start button- start the minigame
function start() {
    frontrope.style.animation = "frontswing 3000ms infinite linear"
    backrope.style.animation = "backswing 3000ms infinite linear"
    bar.style.animation = "barAnimation 1500ms infinite linear"
    isRunning = true
    document.getElementById("startButton").disabled = true
    document.getElementById("jumpButton").disabled = false
    score.value = counter;
}

//attach to jump button- make game character jump
function jump() {
    if (isRunning) {
        if (character.classList == "animate") { return }
        character.classList.add("animate");
        setTimeout(function() {
            character.classList.remove("animate")
        }, 500);
    }

    let ropeTop = parseInt(window.getComputedStyle(bar).getPropertyValue("top"))
    let isRopeInFront = parseInt(window.getComputedStyle(frontrope).getPropertyValue("opacity"))

    if (ropeTop >= 30 && ropeTop < 90 && isRopeInFront === 1) {
        counter++;
        score.value = counter;
    }
}

//checks every 10 miliseconds to see whether or not you missed the jump
var checkGameOver = setInterval(function() {
    if (isRunning) {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"))
        let ropeTop = parseInt(window.getComputedStyle(bar).getPropertyValue("top"))
        let isRopeInFront = parseInt(window.getComputedStyle(frontrope).getPropertyValue("opacity"))
        if (ropeTop >= 90 && characterTop >= 90 && isRopeInFront === 1) {
            frontrope.style.animation = "none"
            backrope.style.animation = "none"
            alert("Game Over. Score: " + counter);
            isRunning = false;
            document.getElementById("startButton").disabled = true
            document.getElementById("jumpButton").disabled = true
            document.getElementById("submitButton").disabled = false
        }
    }
}, 10);