// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!");

const submit = function(e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const location = document.querySelector("#location"),
    cost = document.querySelector("#cost"),
    priority = document.querySelector("#priority"),
    json = {
      location: location.value,
      cost: cost.value,
      priority: priority.value
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body
  }).then(async response => {
    const data = await response.json();
    console.log(data);
    updateData(data);
    console.log(response);
  });

  return false;
};

let updateData = data => {
  const table = document.getElementById("location-body");
  for (let i = table.rows.length; i > 1; i--) {
    table.deleteRow(1);
  }

  data.forEach((entry, i) => {
    const row = document.createElement("tr");

    const location = document.createElement("input");
    location.value = entry.location;
    location.id = "location" + i;
    row.appendChild(location);

    const cost = document.createElement("input");
    cost.value = entry.cost;
    cost.type = 'number'
    cost.id = "cost" + i;

    row.appendChild(cost);

    const priority = document.createElement("input");
    priority.value = entry.priority;
    priority.type = 'number'
    priority.id = "priority" + i;

    row.appendChild(priority);

    const rating = document.createElement("td");
    rating.innerHTML = entry.rating;
    row.appendChild(rating);

    const updateBtn = document.createElement("button");
    updateBtn.innerHTML = "Update";
    updateBtn.className = 'update-button'
    updateBtn.onclick = e => {
      e.preventDefault();
      const newLocation = document.querySelector("#location" + i),
        cost = document.querySelector("#cost" + i),
        priority = document.querySelector("#priority" + i),
        oldLocation = entry.location,
        json = {
          newLocation: newLocation.value,
          cost: cost.value,
          priority: priority.value,
          oldLocation: oldLocation
        },
        body = JSON.stringify(json);

      fetch("/update", {
        method: "POST",
        body
      }).then(async response => {
        const data = await response.json();
        console.log(data);
        updateData(data);
        console.log(response);
      });

      return false;
    };
    row.appendChild(updateBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.onclick = (e) => {
      e.preventDefault();
      const location = entry.location,
        json = { location: location },
        body = JSON.stringify(json);
      fetch("/delete", {
        method: "POST",
        body
      }).then(async response => {
        const data = await response.json();
        updateData(data);
        console.log(response);
      });

      return false;
    };
    row.appendChild(deleteBtn);

    table.appendChild(row);
  });
};

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;

  fetch("/init", {
    method: "GET"
  }).then(async response => {
    const data = await response.json();
    updateData(data);
  });
};
