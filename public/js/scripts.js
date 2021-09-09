let contacts = [];

const submit = function(e) {
  e.preventDefault();

  const fname = document.querySelector("#fname");
  const lname = document.querySelector("#lname");
  const nname = document.querySelector("#nname");
  const phone = document.querySelector("#phone");
  const email = document.querySelector("#email");
  const birthday = document.querySelector("#birthday");

  let json = {
    fname: fname.value,
    lname: lname.value,
    nname: nname.value,
    phone: phone.value,
    email: email.value,
    birthday: birthday.value
  };

  let stringed = JSON.stringify(json);

  fetch('/submit', {
    method: 'POST',
    stringed
  })
  .then(function(response) {
    response.text().then(function(data) {
      createList(JSON.parse(data))
    })
  });
  return false;
};

window.onload = function() {
  fetch('/index.html', {
    method: 'GET'
  }).then(function(response) {
    response.json().then(function(data) {
      contacts = Object.values(data);
      createList();
    });
  });
};
    
window.onload = function() {
  const submitButton = document.querySelector('button');
  submitButton.onclick = submit;
}

let contactsList = document.createElement('table');
const createList = function() {
  let newContact = document.createElement('tr');
  contactsList.appendChild(newContact);
  newContact.setAttribute('id', 'newContact');
  let fullName = document.createElement('p');
  fullName.innerText = contacts.fname + " " + contacts.lname + '(' + contacts.nname + ')';
  newContact.appendChild(fullName);
  let contactInfo = document.createElement('p');
  contactInfo.innerText = 'Phone: ' + contacts.phone + ' Email: ' + contacts.email;
  newContact.appendChild(contactInfo);
  let currentDate = new Date();
  let birthday = document.getElementById("birthday").value
  let milliseconds = currentDate - birthday;
  let age = Math.floor(milliseconds / 1000 / 60 / 60 / 24 / 365.25)
  let ageText = document.CreateElement('p');
  ageText.innerText = age.toString();
  newContact.appendChild(ageText);

}