// Add some Javascript code here, to run on the front end.

let currentData = [];

const getData = async () => {
  console.log("Fetching data");
  const res = await fetch("/data", {
    method: "GET",
  });

  currentData = await res.json();

  const table = document.getElementById("dataTable");

  // Clear the table (janky)
  for (let i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  currentData.forEach((person) => {
    const row = table.insertRow();
    //console.log(person);

    ["name", "gender", "birthday", "age", "country"].forEach((key, idx) => {
      const cell = row.insertCell(idx);
      cell.innerHTML = `<p>${person[key]}</p>`;
    });
    /*
    const columnMap = {
      name: 0,
      gender: 1,
      birthday: 2,
      age: 3,
      country: 4,
    };

    Object.keys(person).forEach((key) => {
      if (key === "uuid") return; // Don't show the UUID
      const cell = row.insertCell(columnMap[key]);
      cell.innerHTML = `<p>${person[key]}</p>`;
    });*/
    console.log(person);
    const actionCell = row.insertCell();
    // Quotation hell
    actionCell.innerHTML = `<button onclick="editEntry(\`${person.uuid}\`)">Edit</button> <button onclick="deleteEntry(\`${person.uuid}\`)">Delete</button>`;
  });
};

const editEntry = (uuid) => {
  console.log(`Editing entry with UUID ${uuid}`);
  const entry = currentData.find((e) => e.uuid === uuid);
  if (!entry) {
    console.log("Attempting to edit invalid entry");
    return;
  }

  // Enter edit mode
  // Fill form

  console.log(entry);
};

const deleteEntry = (uuid) => {
  console.log(`Deleting entry with UUID ${uuid}`);
  fetch(`/data?uuid=${uuid}`, {
    method: "DELETE",
  }).then((res) => {
    getData();
  });
};

const submitAdd = () => {
  const { name, gender, birthday, country } = getFormData();

  fetch("/data", {
    method: "POST",
    body: JSON.stringify({
      name,
      gender,
      birthday,
      country,
    }),
  }).then(function (response) {
    getData();
  });

  return false;
};

const getFormData = () => {
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const birthday = document.getElementById("birthday").value;
  const country = document.getElementById("country").value;

  return { name, gender, birthday, country };
};
