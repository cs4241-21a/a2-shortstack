console.log("Welcome to assignment 2!");

// Validate that inputs meet certain preconditions
const validate = function (nameIn, tickerIn, priceIn, sharesIn) {
  if (
    nameIn.value === "" ||
    tickerIn.value === "" ||
    priceIn.value === "" ||
    sharesIn.value === "" ||
    nameIn.value === "Enter Name of Security Here" ||
    tickerIn.value === "Enter Ticker Symbol Here" ||
    priceIn.value === "Enter Price of Security Here" ||
    sharesIn.value === "Enter Shares Owned Here"
  ) {
    console.log("ERROR: Some or all fields are empty");
    alert("ERROR: Some or all fields are empty");
    return false;
  }

  if (
    nameIn.value.length > 12 ||
    tickerIn.value.length > 12 ||
    priceIn.value.length > 12 ||
    sharesIn.value.length > 12
  ) {
    console.log("ERROR: Too many characters entered");
    alert("ERROR: Too many characters entered");
    return false;
  }

  if (isNaN(priceIn.value) || isNaN(sharesIn.value)) {
    console.log("ERROR: Price or shares are not numbers");
    alert("ERROR: Price or shares are not numbers");
    return false;
  }
};

// Append each item in server data array to page
const load = function () {
  fetch("/load", {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (appdata) {
      console.log("Server Data Array:");
      console.log(appdata);
      for (let index = 0; index < appdata.length; index++) {
        append(appdata, index);
      }
    });
};

// Submit input for new entry in server data array and update page
const submit = function (e) {
  e.preventDefault();

  const nameIn = document.querySelector("#name"),
    tickerIn = document.querySelector("#ticker"),
    priceIn = document.querySelector("#price"),
    sharesIn = document.querySelector("#shares");

  const ret = validate(nameIn, tickerIn, priceIn, sharesIn);
  if (ret === false) {
    return ret;
  }

  const json = {
      name: nameIn.value,
      ticker: tickerIn.value,
      price: priceIn.value,
      shares: sharesIn.value,
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (appdata) {
      console.log("Element added to end of array");
      console.log("Server Data Array:");
      console.log(appdata);
      append(appdata, appdata.length - 1);
    });
};

// Remove entry from server data array and update page
const remove = function (e) {
  e.preventDefault();

  const element = this.index,
    json = {
      index: element,
    },
    body = JSON.stringify(json);

  fetch("/remove", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (appdata) {
      console.log("Element " + element + " removed from array");
      console.log("Server Data Array:");
      console.log(appdata);
      let tbody = document.querySelector("#securities-tbody");
      tbody.innerHTML = "";
      for (let index = 0; index < appdata.length; index++) {
        append(appdata, index);
      }
    });
};

// Edit entry with new info in server data array and update page
const edit = function (e) {
  e.preventDefault();

  const nameIn = document.querySelector("#name"),
    tickerIn = document.querySelector("#ticker"),
    priceIn = document.querySelector("#price"),
    sharesIn = document.querySelector("#shares");

  const ret = validate(nameIn, tickerIn, priceIn, sharesIn);
  if (ret === false) {
    return ret;
  }

  const element = this.index,
    json = {
      name: nameIn.value,
      ticker: tickerIn.value,
      price: priceIn.value,
      shares: sharesIn.value,
      index: element,
    },
    body = JSON.stringify(json);

  fetch("/edit", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (appdata) {
      console.log("Element " + element + " edited in array");
      console.log("Server Data Array:");
      console.log(appdata);
      let tbody = document.querySelector("#securities-tbody");
      tbody.innerHTML = "";
      for (let index = 0; index < appdata.length; index++) {
        append(appdata, index);
      }
    });
};

// Append element with given data to specified row on page
const append = function (data, row) {
  let tbody = document.querySelector("#securities-tbody");
  let newRow = document.createElement("tr");
  newRow.setAttribute("class", "securities-tr");
  for (let col = 0; col < 7; col++) {
    let newCol = document.createElement("td");
    if (col != 5 && col != 6) {
      newCol.setAttribute("class", "securities-td");
    } else {
      newCol.setAttribute("class", "securities-td-button");
    }
    let newElement;
    switch (col) {
      case 0:
        newElement = document.createTextNode(data[row].name);
        break;
      case 1:
        newElement = document.createTextNode(data[row].ticker);
        break;
      case 2:
        newElement = document.createTextNode(data[row].price);
        break;
      case 3:
        newElement = document.createTextNode(data[row].shares);
        break;
      case 4:
        newElement = document.createTextNode(data[row].invested);
        break;
      case 5:
        newElement = document.createElement("button");
        newElement.innerHTML = "Remove Entry";
        newElement.setAttribute("class", "button");
        newElement.setAttribute("id", "remove");
        newElement.onclick = remove;
        newElement.index = row;
        break;
      case 6:
        newElement = document.createElement("button");
        newElement.innerHTML = "Edit Entry";
        newElement.setAttribute("class", "button");
        newElement.setAttribute("id", "edit");
        newElement.onclick = edit;
        newElement.index = row;
        break;
    }
    newCol.appendChild(newElement);
    newRow.appendChild(newCol);
  }
  tbody.appendChild(newRow);
};

window.onload = function () {
  load();
  const button = document.querySelector("button");
  button.onclick = submit;
};
