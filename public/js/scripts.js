const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  //add a way to validate all fields are filled

  const name = document.getElementById("name")
  const year = document.getElementById("year")
  const split = document.getElementById("split")
  const time = document.getElementById("time")
  const json = { name: name.value, year: year.value, split: split.value, time: time.value }
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
//TODO
const remove = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

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
  let table = document.getElementById("results-table");

  //remove all the values from the table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  if (values.length === 0) {
    return;
  }

  //create headers
  let r = document.createElement("tr");
  for (let header in values[0]) {
    console.log(header);
    header = header.charAt(0).toUpperCase() + header.slice(1);
    let h = document.createElement("th");
    let hval = document.createTextNode(header);
    h.appendChild(hval);
    r.appendChild(h);
  }
  table.appendChild(r);

  //fill in the values
  values.forEach((element) => {
    let row = document.createElement("tr");
    for (let value in element) {
      let valueNode = document.createElement("td");
      let valueText = document.createTextNode(element[value]);
      valueNode.appendChild(valueText);
      row.appendChild(valueNode);
    }
    table.appendChild(row);
  });
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
