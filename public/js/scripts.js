function updateLeaderboard(values) {
    const elements = Object.entries(values)
        .sort(([, a], [, b]) => b.score - a.score)
        .map(([id, x], index) => `<tr id="value${id}">
                                    <td>${index + 1}</td>
                                    <td>${x.username}</td>
                                    <td>${x.score}</td>
                                    <td>${x.date}</td>
                                    <td>
                                        <button type="button" class="edit">Edit</button>
                                        <button type="button" class="remove">Remove</button>
                                    </td>
                                  </tr>`)
        .join("\n");

    const table = document.querySelector("#leaderboard")
    table.tBodies[0].innerHTML = table.rows[0].innerHTML
    table.tBodies[0].innerHTML += elements

    document.querySelectorAll(".remove").forEach(x => x.onclick = removeButton)
    document.querySelectorAll(".edit").forEach(x => x.onclick = editButton)
}

function removeButton(e) {
    // Not necessary, but do anyway just to be safe
    e.preventDefault()

    const targetID = e.path[2].id;
    const id = parseInt(targetID.substring(5))
    console.log("Removing row of id " + id)

    const body = JSON.stringify({
        "id": id,
    })

    fetch('/api/remove', {
        method: 'POST',
        body
    })
        .then(x => x.json())
        .then(updateLeaderboard)

    return false
}

function editButton(e) {
    if (e.path[0].innerHTML === "Edit") {
        e.path[0].innerHTML = "Save"

        console.log(e.path)
        const user = e.path[2].children[1]
        const score = e.path[2].children[2]

        user.innerHTML = `<input value="${user.innerHTML}">`
        score.innerHTML = `<input value="${score.innerHTML}">`
    } else {
        e.path[0].innerHTML = "Edit"

        const body = JSON.stringify({
            "id": parseInt(e.path[2].id.substring(5)),
            "username": e.path[2].children[1].children[0].value,
            "score": parseInt(e.path[2].children[2].children[0].value),
        })

        fetch('/api/edit', {
            method: 'POST',
            body
        })
            .then(x => x.json())
            .then(updateLeaderboard)
    }

    return false
}

function fetchValues() {
    fetch('/api/values', {method: 'GET'})
        .then(x => x.json())
        .then(updateLeaderboard)
}


function addUser(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const username = document.querySelector('#username')
    const score = document.querySelector('#score')

    const body = JSON.stringify({
        "username": username.value,
        "score": score.value,
    })

    fetch('/api/add', {
        method: 'POST',
        body
    })
        .then(x => x.json())
        .then(updateLeaderboard)

    return false
}
