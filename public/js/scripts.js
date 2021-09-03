// Add some Javascript code here, to run on the front end.

// console.log("Welcome to assignment 2!")

let previous_app_data = [];

update_based_on_existing_data();

const addItemFunc = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const name_input = document.querySelector("#StudentName"),
    class_input = document.querySelector("#StudentClass"),
    role_input = document.querySelector("#StudentRole"),
    json = {
      StudentName: name_input.value,
      StudentClass: class_input.value,
      StudentRole: role_input.value,
    },
    body = JSON.stringify(json);

  // console.log("json");
  // console.log(json);

  fetch("/submit", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      initialize_list(data);

      previous_app_data = data;

      return data;
    });

  return false;
};

function update_based_on_existing_data() {
  fetch("/initializeData", {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      initialize_list(data);

      previous_app_data = data;

      return data;
    });

  return false;
}

function deleteItemFunc(button) {
  const input = button.path[0].id,
    json = { id: input },
    body = JSON.stringify(json);

  fetch("/deleteEntry", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      initialize_list(data);

      previous_app_data = data;

      return data;
    });

  return false;
}

function updateItemFunc(button) {
  const name_input = document.querySelector("#StudentName"),
    class_input = document.querySelector("#StudentClass"),
    role_input = document.querySelector("#StudentRole"),
    id_value = button.path[0].id,
    json = {
      StudentName: name_input.value,
      StudentClass: class_input.value,
      StudentRole: role_input.value,
      id: id_value,
    },
    body = JSON.stringify(json);

  fetch("/updateEntry", {
    method: "POST",
    body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      initialize_list(data);

      previous_app_data = data;

      return data;
    });

  return false;
}

function initialize_list(data_points) {
  var forum_section = document.getElementById("forum_section");

  if (forum_section != null) {
    forum_section.remove();
  }

  const table_element = document.createElement("table");
  table_element.setAttribute("class", "table_area");
  table_element.setAttribute("id", "forum_section");

  const info_name_header = document.createElement("th");
  const info_class_header = document.createElement("th");
  const info_role_header = document.createElement("th");
  const info_hours_header = document.createElement("th");
  const info_delete_header = document.createElement("th");
  const info_update_header = document.createElement("th");

  const element_table_header_row = document.createElement("tr");
  element_table_header_row.setAttribute("class", "forum_header");

  info_name_header.setAttribute("class", "forum_header");
  info_class_header.setAttribute("class", "forum_header");
  info_role_header.setAttribute("class", "forum_header");
  info_hours_header.setAttribute("class", "forum_header");
  info_delete_header.setAttribute("class", "forum_header");
  info_update_header.setAttribute("class", "forum_header");

  info_name_header.innerHTML = "Student Name";
  info_class_header.innerHTML = "Class Assignment";
  info_role_header.innerHTML = "Student Role";
  info_hours_header.innerHTML = "Student Hours Per Week";
  info_delete_header.innerHTML = "Remove Student";
  info_update_header.innerHTML = "Update Student Information";

  element_table_header_row.appendChild(info_name_header);
  element_table_header_row.appendChild(info_class_header);
  element_table_header_row.appendChild(info_role_header);
  element_table_header_row.appendChild(info_hours_header);
  element_table_header_row.appendChild(info_delete_header);
  element_table_header_row.appendChild(info_update_header);

  table_element.appendChild(element_table_header_row);

  function myFunc(data_point) {
    const element_list_info_name = document.createElement("td");
    const element_list_info_class = document.createElement("td");
    const element_list_info_role = document.createElement("td");
    const element_list_info_hours = document.createElement("td");
    const element_list_delete = document.createElement("BUTTON");
    const element_list_delete_table_cell = document.createElement("td");
    const element_list_update = document.createElement("BUTTON");
    const element_list_update_table_cell = document.createElement("td");

    const element_table_row = document.createElement("tr");
    element_table_row.setAttribute("class", "forum_row");

    element_list_info_name.setAttribute("class", "forum_cell");
    element_list_info_name.innerHTML = data_point.StudentName;
    element_list_info_class.setAttribute("class", "forum_cell");
    element_list_info_class.innerHTML = data_point.StudentClass;
    element_list_info_role.setAttribute("class", "forum_cell");
    element_list_info_role.innerHTML = data_point.StudentRole;
    element_list_info_hours.setAttribute("class", "forum_cell");
    element_list_info_hours.innerHTML = data_point.StudentHours;

    element_list_delete.setAttribute("id", data_point.id);
    element_list_delete.setAttribute("class", "forum_cell_button");
    element_list_delete.innerHTML = "Remove Entry";
    element_list_update.setAttribute("id", data_point.id);
    element_list_update.setAttribute("class", "forum_cell_button");
    element_list_update.innerHTML = "Update Entry";

    element_list_delete_table_cell.setAttribute("class", "forum_cell");
    element_list_update_table_cell.setAttribute("class", "forum_cell");

    element_list_delete.onclick = deleteItemFunc;
    element_list_update.onclick = updateItemFunc;

    element_list_update_table_cell.appendChild(element_list_update);
    element_list_delete_table_cell.appendChild(element_list_delete);

    element_table_row.appendChild(element_list_info_name);
    element_table_row.appendChild(element_list_info_class);
    element_table_row.appendChild(element_list_info_role);
    element_table_row.appendChild(element_list_info_hours);
    element_table_row.appendChild(element_list_delete_table_cell);
    element_table_row.appendChild(element_list_update_table_cell);

    table_element.appendChild(element_table_row);
  }

  data_points.forEach(myFunc);

  document.body.appendChild(table_element);
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = addItemFunc;
};