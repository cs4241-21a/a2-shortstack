// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

let data = []

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();
    console.log("Submitting!");

    const input = document.querySelector('#playerName');
    json = { playerName: input.value };
    body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(async function (response) {
            // do something with the reponse 
            data = await response.json();
            console.log(data)
            document.getElementById('otherScores').innerText = '';
            document.getElementById('otherPlayers').innerText = '';
            data.map(player => {
                document.getElementById('otherScores').innerText += player['score'] + '\n';
                document.getElementById('otherPlayers').innerText += player['name'] + '\n';
            });
        })

    return false
}

window.onload = function () {
    const button = document.getElementById('onsubmit')
    const input = document.getElementById('playerName');
    button.onclick = () => { player.name = input.value; updateScore(); return false };
}