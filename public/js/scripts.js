// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

let data = [];

const resFunc = async function (response) {
    data = await response.json();
    data.sort((a, b) => (a.score <= b.score) ? 1 : -1);
    document.getElementById('otherScores').innerText = '';
    document.getElementById('otherPlayers').innerText = '';
    data.map(player => {
        document.getElementById('otherScores').innerText += player['score'] + '\n';
        document.getElementById('otherPlayers').innerText += player['name'] + '\n';
    });
}

const getData = function () {
    console.log("Retrieving!");

    fetch('/submit', {
        method: 'POST'
    }).then(resFunc);
}

const submit = function () {
    // prevent default form action from being carried out
    console.log("Submitting!");

    const input = document.querySelector('#playerName');
    json = { playerName: input.value, score: player.score };
    body = JSON.stringify(json);

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(resFunc);

    return false
}

window.onload = function () {

    getData();
    const button = document.getElementById('onsubmit')
    const input = document.getElementById('playerName');
    button.onclick = (e) => {
        e.preventDefault();
        player.name = input.value;
        updateScore();
        paused = false;
        update();
        document.getElementById('playerForm').style.display = 'none';
        return false;
    };
    // button.onclick = submit;
}