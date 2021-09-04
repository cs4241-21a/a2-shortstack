// Add some Javascript code here, to run on the front end.

function generateTable() {
  fetch("/table", {
    method: "POST",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      refreshTable(json);
    });
}

function resetFormToDefault() {
  document.querySelector("#hotel-name").value = "Enter Hotel Name Here";
  document.querySelector("#hotel-location").value = "Enter Hotel Location Here";
  document.querySelector("#cleanliness-score").value = 5;
  document.querySelector("#service-score").value = 5;
  document.querySelector("#amenity-score").value = 5;
}

function refreshTable(data) {
  let table = document.querySelector("table");
  if (table === null) {
    table = document.createElement("table");
    document.body.appendChild(table);
  }
  let tbody = table.createTBody();
  let thead = table.createTHead();
  let header_row = thead.insertRow();
  let table_columns = [
    "Hotel Name",
    "Hotel Location",
    "Cleanliness",
    "Service",
    "Amenity",
    "Overall Score",
    "Edit",
    "Delete",
  ];
  for (let title of table_columns) {
    let th = document.createElement("th");
    let header_text = document.createTextNode(title);
    th.appendChild(header_text);
    header_row.appendChild(th);
  }
  for (let element of data) {
    let row = tbody.insertRow();
    for (let key of Object.keys(data[0])) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }

    // --------------------- Edit Button Code Below ---------------------

    let edit_button_cell = row.insertCell();
    const edit_btn = document.createElement("button");
    const edit_btn_text = "Edit";
    edit_btn.innerHTML = edit_btn_text;
    edit_btn.onclick = () => {
      let original_entry = element;
      document.querySelector("#hotel-name").value = element.hotel;
      document.querySelector("#hotel-location").value = element.location;
      document.querySelector("#cleanliness-score").value = element.cleanliness;
      document.querySelector("#service-score").value = element.service;
      document.querySelector("#amenity-score").value = element.amenity;
      const save_btn = document.querySelector("#Submit-Button");
      save_btn.innerHTML = "Save Changes";
      save_btn.onclick = () => {
        console.log("Just clicked save button");
        const hotel_name = document.querySelector("#hotel-name"),
          hotel_location = document.querySelector("#hotel-location"),
          cleanliness_score = document.querySelector("#cleanliness-score"),
          service_score = document.querySelector("#service-score"),
          amenity_score = document.querySelector("#amenity-score"),
          json = [
            {
              hotel: original_entry.hotel,
              location: original_entry.location,
              cleanliness: original_entry.cleanliness,
              service: original_entry.service,
              amenity: original_entry.amenity,
            },
            {
              hotel: hotel_name.value,
              location: hotel_location.value,
              cleanliness: Number(cleanliness_score.value),
              service: Number(service_score.value),
              amenity: Number(amenity_score.value),
            },
          ],
          body = JSON.stringify(json);
        console.log(hotel_name.value);
        fetch("/edit", {
          method: "POST",
          body,
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            let table = document.querySelector("table");
            table.remove();
            refreshTable(json);
            resetFormToDefault();
            save_btn.innerHTML = "Submit Changes";
            save_btn.onclick = submit;
          });
      };
    };
    edit_button_cell.appendChild(edit_btn);

    // --------------------- Delete Button Code Below ---------------------

    let delete_button_cell = row.insertCell();
    const delete_btn = document.createElement("button");
    const delete_btn_text = "Delete";
    delete_btn.innerHTML = delete_btn_text;
    delete_btn.onclick = () => {
      resetFormToDefault();
      const form_btn = document.querySelector("#Submit-Button");
      form_btn.onclick = submit;
      form_btn.innerHTML = "Submit Review";
      const json = {
          hotel: element.hotel,
          location: element.location,
          cleanliness: element.cleanliness,
          service: element.service,
          amenity: element.amenity,
        },
        body = JSON.stringify(json);
      fetch("/delete", {
        method: "POST",
        body,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          let table = document.querySelector("table");
          table.remove();
          refreshTable(json);
        });
    };
    delete_button_cell.appendChild(delete_btn);
  }
}

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const hotel_name = document.querySelector("#hotel-name"),
    hotel_location = document.querySelector("#hotel-location"),
    cleanliness_score = document.querySelector("#cleanliness-score"),
    service_score = document.querySelector("#service-score"),
    amenity_score = document.querySelector("#amenity-score"),
    json = {
      hotel: hotel_name.value,
      location: hotel_location.value,
      cleanliness: Number(cleanliness_score.value),
      service: Number(service_score.value),
      amenity: Number(amenity_score.value),
    },
    body = JSON.stringify(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      let table = document.querySelector("table");
      table.remove();
      refreshTable(json);
      resetFormToDefault();
    });

  return false;
};

window.onload = function () {
  generateTable();
  const button = document.querySelector("#Submit-Button");
  button.onclick = submit;
};
