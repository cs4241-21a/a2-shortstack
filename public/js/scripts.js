let list = [];

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    const nameText = document.getElementById( 'name' );
    const targetText = document.getElementById('target-text');
    json = { 
      name: nameText.value,
      message: targetText.value 
    };
    body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      // do something with the reponse 
      response.text().then(function (str) {
        addNewElt(JSON.parse(str));
      })
    })

    return false
  }

const switchView = function(e) {
    if(e.target.id === 'table-nav') {
        document.getElementById('table-root').style.display = 'flex';
        document.getElementById('sentence-root').style.display = 'none';
    } else {
        document.getElementById('table-root').style.display = 'none';
        document.getElementById('sentence-root').style.display = 'flex';
    }
}

function populateWithAppdata(appdata) {
    let normalTable = document.getElementById('normal-table');
    let owoTable = document.getElementById('owo-table');
    let normalSentenceRoot = document.getElementById('normal-sentence-root');
    let owoSentenceRoot = document.getElementById('owo-sentence-root');

    appdata.forEach(element => {
        let normalElt = document.createElement('tr');
        normalElt.innerHTML = 
            `<td>${element.name}</td>
             <td>${element.message}<td>`;
        let owoElt = document.createElement('tr');
        owoElt.innerHTML = 
            `<td>${element.nameowo}</td>
             <td>${element.messageowo}<td>`;
        let normalSentence = document.createElement('p');
        normalSentence.innerHTML = `${element.name} said: "${element.message}"`;
        let owoSentence = document.createElement('p');
        owoSentence.innerHTML = `${element.nameowo} said: "${element.messageowo}"`;
        normalTable.append(normalElt);
        owoTable.append(owoElt);
        normalSentenceRoot.append(normalSentence);
        owoSentenceRoot.append(owoSentence);
    });
}

function addNewElt(element) {
    let normalTable = document.getElementById('normal-table');
    let owoTable = document.getElementById('owo-table');
    let normalSentenceRoot = document.getElementById('normal-sentence-root');
    let owoSentenceRoot = document.getElementById('owo-sentence-root');

    let normalElt = document.createElement('tr');
    normalElt.innerHTML = 
        `<td>${element.name}</td>
            <td>${element.message}<td>`;
    let owoElt = document.createElement('tr');
    owoElt.innerHTML = 
        `<td>${element.nameowo}</td>
            <td>${element.messageowo}<td>`;
    let normalSentence = document.createElement('p');
    normalSentence.innerHTML = `${element.name} said: "${element.message}"`;
    let owoSentence = document.createElement('p');
    owoSentence.innerHTML = `${element.nameowo} said: "${element.messageowo}"`;
    normalTable.append(normalElt);
    owoTable.append(owoElt);
    normalSentenceRoot.append(normalSentence);
    owoSentenceRoot.append(owoSentence);
}

window.onload = function() {
const button = document.querySelector( 'button' )
button.onclick = submit;
const tableLink = document.getElementById('table-nav')
const sentenceLink = document.getElementById('sentence-nav')
tableLink.onclick = switchView;
sentenceLink.onclick = switchView;
fetch('/getAppdata', {
  method:'GET',
}).then(function(response) {
    response.text().then(function(jsonData) {
        console.log(jsonData)
        let appdata = JSON.parse(jsonData);
        if(appdata.length !== 0) {
            populateWithAppdata(appdata);
        }
    })
})
}