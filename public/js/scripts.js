const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function submit(e) {
    e.preventDefault();

    const firstName = document.querySelector('#firstname').value;
    const lastName = document.querySelector('#lastname').value;
    const birthday = document.querySelector('#birthday').value;

    const json = {
        firstName,
        lastName,
        birthday
    };

    const body = JSON.stringify(json);

    fetch('/submit', { method:'POST', body })
    .then(() => requestData())
    .catch(err => { alert('Error: ', err); });
}

function requestData() {
    fetch('/getData', {method:'POST', body: ''})
    .then(response => { return response.json() })
    .then(json => { handleData(json) });
}

function handleData(json) {
    document.getElementsByClassName('database-view')[0].innerHTML = '';
    addEntryToDatabaseView({name: 'First Name', birthday: 'Birthday', age: 'Age', fullName: 'Full Name'});
    json.appdata.forEach(entry => {
        const newEntry = {
            name: entry.firstName,
            birthday: dateToReadable(entry.birthday),
            age: entry.age,
            fullName: entry.fullName
        };
        addEntryToDatabaseView(newEntry);
    });
}

function addEntryToDatabaseView(entries) {
    const databaseView = document.getElementsByClassName('database-view')[0];

    const entryDiv = document.createElement('div');
    entryDiv.id = 'entry';

    for(const [key, value] of Object.entries(entries)) {
        const fieldDiv = document.createElement('div');
        const fieldP = document.createElement('p');

        fieldP.innerHTML = entries[key];
        fieldDiv.appendChild(fieldP);
        entryDiv.appendChild(fieldDiv);
    }

    databaseView.appendChild(entryDiv);
}

function dateToReadable(date) {
    const split = date.split('-');
    return monthNames[split[1] - 1] + ' ' + split[2] + ', ' + split[0]
}

window.onload = function() {
    const button = document.querySelector('input[type="submit"]');
    button.onclick = submit;
    requestData();
}