const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  //add a way to validate all fields are filled

  const name = document.getElementById("name")
  const team = document.getElementById("team")
  const time = document.getElementById("time")
  const laps = document.getElementById("laps")
  const fastest = document.getElementById("fastest")
  const json = { name: name.value, team: team.value, time: time.value,
     laps: laps.value, fastest: fastest.value }
  const body = JSON.stringify(json)

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      redrawTable(data);
    })

  return false
}

//function to remove elements that are clicked on in the table
const remove = function (e) {
  // prevent default form action from being carried out
  e.preventDefault()

  const name = e.path[1].cells[0].innerText
  const team = e.path[1].cells[1].innerText
  const json = { name: name, team: team }
  const body = JSON.stringify(json)

  fetch("/remove", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      redrawTable(data);
    });

  return false;
};

function redrawTable(values) {
  const headers = [
    'Racer',
    'Team',
    'Total Time',
    'Number of Laps',
    'Fastest Lap',
    'Average Lap Time',
    'Remove'
  ]
  let table = document.getElementById("results-table");

  //remove all the values from the table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  //create headers
  let r = document.createElement("tr");
  for (let header of headers) {
    let h = document.createElement("th");
    let hval = document.createTextNode(header);
    h.appendChild(hval);
    r.appendChild(h);
  }
  table.appendChild(r);

  if (values.length === 0) {
    return;
  }

  //fill in the values
  values.forEach((element) => {
    let row = document.createElement("tr");
    for (let value in element) {
      let valueNode = document.createElement("td");
      let valueText = document.createTextNode(element[value]);
      valueNode.appendChild(valueText);
      row.appendChild(valueNode);
    }
    let deleteElement = createDelete();
    row.appendChild(deleteElement);
    table.appendChild(row);
  });
}

function createDelete() {
  let deleteNode = document.createElement("td");
  let deleteText = document.createTextNode('delete');
  deleteNode.appendChild(deleteText);
  deleteNode.onclick = remove;
  return deleteNode;
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
