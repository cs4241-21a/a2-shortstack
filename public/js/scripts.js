// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const username = document.querySelector("#yourname"),
    highscore = document.querySelector("#yourscore"),
    json = {
      yourname: username.value,
      yourscore: highscore.value
    };

  const body = JSON.stringify(json);

  if (username === "") {
    alert("Username cannot be empty!");
    return;
  }
  if (highscore === "" || highscore < 0) {
    alert("High Score cannot be less than 0!");
    return;
  }

  fetch("/submit", {
    method: "POST",
    body
  })
    .then(function(response) {
      // do something with the reponse
      console.log(response);
      return response.json();
    })
    .then(function(json) {
      console.log(json);

      const table = document.querySelector("#data_table");

      for (let i = 0; i < json.scores.length; i++) {
        populateTable(table, json.scores[i]);
      }
    });

  return false;
};

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
};

function populateTable(table, score) {
  console.log("[populateTable]");

  const username = table.insertRow(table.length).insertCell(0);
  const highscore = table.insertRow(table.length).insertCell(1);

  username.innerText = score.yourname;
  highscore.innerHTML = score.yourscore;
}
