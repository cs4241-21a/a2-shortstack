// Add some Javascript code here, to run on the front end.

function generateTable() {
  fetch('/table', {
    method: 'POST',
  })
  .then (function ( response ) {
    return response.json()
  })
  .then (function( json ) {
    refreshTable(json)
  })
}

function refreshTable(data) {
  let table = document.querySelector('table')
    let thead = table.createTHead() 
    let header_row = thead.insertRow() 
    let table_columns = ['Hotel Name', 'Hotel Location', 'Cleanliness', 'Service', 'Amenity', 'Overall Score']
    for (let title of table_columns) {
      let th = document.createElement('th')
      let header_text = document.createTextNode(title)
      th.appendChild(header_text)
      header_row.appendChild(th)
    }
    for (let element of data) {
      let row = table.insertRow();
      for(let key of Object.keys(data[0])) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text)
      }
    }
}

const submit = function (e) {
  // prevent default form action from being carried out
  e.preventDefault();

  const hotel_name = document.querySelector('#hotel-name'),
    hotel_location = document.querySelector('#hotel-location'),
    cleanliness_score = document.querySelector('#cleanliness-score'),
    service_score = document.querySelector('#service-score'),
    amenity_score = document.querySelector('#amenity-score'),
    json = {
      hotelname: hotel_name.value,
      hotellocattion: hotel_location.value,
      cleanliness: cleanliness_score.value,
      service: service_score.value,
      amenity: amenity_score.value
    },
    body = JSON.stringify(json);

  fetch('/submit', {
    method: 'POST',
    body,
  }).then(function (response) {
    return response.json()
  })
  .then(function( json ) {
    console.log(json)
  })

  return false;
}

window.onload = function () {
  generateTable()
  const button = document.querySelector('button');
  button.onclick = submit;
};
