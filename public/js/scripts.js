// Add some Javascript code here, to run on the front end.
function clearTable() {
  let table = document.querySelector("table");
  table.getElementsByTagName("tbody")[0].innerHTML = table.rows[0].innerHTML;
}

const renderTable = function() {
  let tableIndexCount = 0;
  clearTable();
  console.log("Now Printing the Contents of tableEntrys");
  for(let i = 0; i < tableEntries[0].length; i++){

    console.log(tableEntries[0][i]);
    let element = tableEntries[0][i];
    let car_name = element.car_name;
    let purchase_price = element.purchase_price;
    let age = 2021 - element.purchase_year;
    let num_repairs = element.repairs;
    let miles_driven = element.miles;
    let estimated_value = element.estimated_value;

    // Acquire the table that we want to add to
    const tableRef = document.getElementById("car_table");
    let newRow = tableRef.insertRow(-1);

    // Construct a new Row
    if (i === tableEntries[0].length - 1) {
      newRow.setAttribute("id", "lastRow");
    } else {
      newRow.setAttribute("id", tableIndexCount);
    }

    // Construct and populate a new cell
    let newCar_cell = newRow.insertCell(-1);
    let newCar_text = document.createTextNode(car_name);
    newCar_cell.appendChild(newCar_text);

    let newPurchase_cell = newRow.insertCell(-1);
    let newPurchase_text = document.createTextNode("$" + purchase_price);
    newPurchase_cell.appendChild(newPurchase_text);

    let newAge_cell = newRow.insertCell(-1);
    let newAge_text = document.createTextNode(age.toString());
    newAge_cell.appendChild(newAge_text);

    let newRepair_cell = newRow.insertCell(-1);
    let newRepair_text = document.createTextNode(num_repairs);
    newRepair_cell.appendChild(newRepair_text);

    let newMiles_cell = newRow.insertCell(-1);
    let newMiles_text = document.createTextNode(miles_driven);
    newMiles_cell.appendChild(newMiles_text);

    let newEstimate_cell = newRow.insertCell(-1);
    let newEstimate_text = document.createTextNode("$" + estimated_value);
    newEstimate_cell.appendChild(newEstimate_text);

    let newTest_cell = newRow.insertCell(-1);
    let newTest_text = document.createElement("input");
    newTest_text.setAttribute("type", "checkbox");
    newTest_text.setAttribute("id", "checkbox" + tableIndexCount);
    newTest_cell.appendChild(newTest_text);

    tableIndexCount++;
    window.onload;
  }
};
let tableEntries = [];
const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const car_name = document.querySelector("#carname");
  const purchase_price = document.querySelector("#purchaseprice");
  const purchase_year = document.querySelector("#purchaseyear");
  const repairs = document.querySelector("#repairs");
  const miles = document.querySelector("#miles");

  json = {
    car_name: car_name.value,
    purchase_price: purchase_price.value,
    purchase_year: purchase_year.value,
    repairs: repairs.value,
    miles: miles.value,
  };

  body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body
  }).then(function(response) {
    return response.json();
  }).then(function(json){
    tableEntries = [];
    tableEntries.push(json);
    renderTable();
  })
  return false;
};

const deleteEntry = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();



  // acquire the table entrys that are selected.
  let table = document.getElementById("car_table")
  json = getCheckedBox(table)
  console.log("Returning from checkedBox");
  console.log(json);

  body = JSON.stringify(json);
  console.log(body);
  fetch("/deleteEntry" + 0, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body
  }).then(function(response) {
    console.log(response.json);
    return response.json();
  }).then(function(json){

    console.log("JSON Response from server");
    tableEntries[0] = json;
    console.log(tableEntries[0]);
    renderTable();
  });

  return false;
};
window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;

  const deleteButton = document.getElementById("deleteButton");
  deleteButton.onclick = deleteEntry;
};
function getCheckedBox(table) {
  for (let i = 1, row; (row = table.rows[i]); i++) {
    //iterate through rows
    if (row.cells[6].querySelector("input").checked) {
      // Add the index to the listofChecked row
      return --i; // to get true index
    }
  }
}