console.log("Welcome to assignment 2!");
// Add some Javascript code here, to run on the front end.
const table = document.getElementById("table");
const submitBtn = document.getElementById("submit");
const ActionHeader = document.getElementById("ActionHeader");
const hLeft = document.getElementById("hours");
let hours = 4;
let serverData;
const createNode = function(elt) {
  return document.createElement(elt);
};

const makeTableHeaders = function() {
  let TableRow = createNode("tr");
  let editHeader = createNode("th");
  editHeader.innerHTML = "";
  TableRow.appendChild(editHeader);
  
  let AssignmentHeader = createNode("th");
  AssignmentHeader.innerHTML = "Assignment";
  TableRow.appendChild(AssignmentHeader);
  
  let ClassHeader = createNode("th");
  ClassHeader.innerHTML = "Class";
  TableRow.appendChild(ClassHeader);
  
  let TimeHeader = createNode("th");
  TimeHeader.innerHTML = "Time Commitment (h)";
  TableRow.appendChild(TimeHeader);
  
  let DueHeader = createNode("th");
  DueHeader.innerHTML = "Due";
  TableRow.appendChild(DueHeader);
  
  let DaysHeader = createNode("th");
  DaysHeader.innerHTML = "Days Before Dedline";
  TableRow.appendChild(DaysHeader);
  
  let deleteHeader = createNode("th");
  deleteHeader.innerHTML = "";
  TableRow.appendChild(deleteHeader);
  
  table.appendChild(TableRow);
};



const updatePage = function() {
  fetch("/updatePage", {
    method: "GET"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      serverData = data;
      table.innerHTML = "";
      makeTableHeaders();
      let rowNum = 1;
      serverData.map(function(row) {
        let pencil = createNode("i");
        pencil.id = `pencil${rowNum}`;
        pencil.innerHTML =  "<img src=\'https://cdn.glitch.com/8f4da487-6973-4029-9294-3a9b03bac40d%2Fthumbnails%2Fsaas-content-marketing-green.png?1631187318027' width=\'50px\' height=\'40px\'>";
        pencil.onclick = function(elt) {
          editRow(pencil, row);
          elt.preventDefault();
          return false;
        };
        let deleteIcon = createNode("i");
        deleteIcon.id = `cross${rowNum}`;
        deleteIcon.innerHTML = "<img src=\'https://cdn.glitch.com/8f4da487-6973-4029-9294-3a9b03bac40d%2Fthumbnails%2Fdelete-icon-14.jpg?1631186667591' width=\'40px\' height=\'40px\'>";
        deleteIcon.onclick = function(elt) {
          let body = deleteIcon.id;
          fetch("/delete", {
            method: "POST",
            body
          }).then(function(response) {
            console.log("Delete response: " + response);
            updatePage();
          });
          elt.preventDefault();
          return false;
        };
        let tableRow = createNode("tr");
        let editdata = createNode("td");
        editdata.appendChild(pencil);
        tableRow.appendChild(editdata);
        let data1 = createNode("td");
        data1.innerHTML = row.Assignment;
        tableRow.appendChild(data1);
        let data2 = createNode("td");
        data2.innerHTML = row.Class;
        tableRow.appendChild(data2);
        let data3 = createNode("td");
        data3.innerHTML = row.time;
        tableRow.appendChild(data3);
        let data4 = createNode("td");
        data4.innerHTML = row.Due;
        tableRow.appendChild(data4);
        let data5 = createNode("td");
        data5.innerHTML = row.Days;
        tableRow.appendChild(data5);
        let remove = createNode("td");
        remove.appendChild(deleteIcon);
        tableRow.appendChild(remove);
        table.appendChild(tableRow);
        tableRow.className = rowNum;
        rowNum++;
      });
    });
  console.log("hours = " + hours);
  fetch("/updatePage", {
    method: "GET"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      serverData = data;
      console.log("Server data updated = " + serverData.length);
      console.log("Server Data:\n" + JSON.stringify(serverData));
      hours = 0;
      for (let i = 0; i < serverData.length; i++) {
        hours = hours + serverData[i].time;
      }
      console.log("UPDATED WORKLOAD = " + hours + " hours");
      hLeft.innerHTML = hours.toString();
    });
};
updatePage();

let inputSelect;
let Index = 0;
const makeBody = function() {
  const Assignment = document.getElementById("Assignment");
  const Class = document.getElementById("Class");
  const time = document.getElementById("time");
  const Due = document.getElementById("Due");
  const json = {
    Assignment: Assignment.value,
    Class: Class.value,
    time: parseInt(time.value),
    Due: Due.value,
    Days: "...",
    Index
  };
  return JSON.stringify(json);
};

const makePost = function() {
  let body = makeBody();
  let jsonBody = JSON.parse(body);
  let warning = document.getElementById("warning");

  if (
    jsonBody["Assignment"] === "" ||
    jsonBody["Class"] === "" ||
    jsonBody["time"] === "" ||
    jsonBody["time"] < 0 ||
    jsonBody["Due"] === "" ) {
    warning.innerHTML = "!Not all fields filled";
  } else {
    warning.innerHTML = "";
    fetch(`/${inputSelect}`, {
      method: "POST",
      body
    }).then(function(response) {
      console.log("Response: " + response);
      updatePage();
      document.getElementById("Assignment").value = "";
      document.getElementById("Class").value = "";
      document.getElementById("time").value = "";
      document.getElementById("Due").value = "";
    });
  }
};

const editRow = function(pencil, row) {
  Index = pencil.id[6];
  ActionHeader.innerHTML = "Edit";
  submitBtn.innerHTML = "Update";
  document.getElementById("Assignment").value = row.Assignment;
  document.getElementById("Class").value = row.Class;
  document.getElementById("time").value = row.time;
  document.getElementById("Due").value = row.Due;
};

const submitForm = function(elt) {
  if (submitBtn.innerHTML === "Submit") {
    inputSelect = "add";
    makePost();
  } else {
    inputSelect = "modify";
    makePost();
    submitBtn.innerHTML = "Submit";
    ActionHeader.innerHTML = "Add Assignment";
    document.getElementById("Assignment").value = "";
    document.getElementById("Class").value = "";
    document.getElementById("time").value = "";
    document.getElementById("Due").value = "";
  }
  elt.preventDefault();
  return false;
};
submitBtn.onclick = submitForm;


