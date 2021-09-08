// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")
const submit = function (event) {
    event.preventDefault();

    const
        name = document.querySelector('#name'),
        contentType = getType(),
        content = document.querySelector('#content'),
        json = {
            name: name.value,
            type: contentType,
            content: content.value
        },
        body = JSON.stringify(json);


    fetch('/submit', {method: 'POST', body})
        .then(
            function (response) {
                console.log(response)
            });

    return false
};

window.onload = function () {
    const button = document.querySelector('#submitButton');
    const resultsButton = document.querySelector('#resultsButton');
    button.onclick = submit;
    resultsButton.onclick = goHomework;
    updateContentLabel();
};

const goHomework = function(){
    const url = window.location;
    window.location.href = url.protocol + "//" + url.host + "/results.html";
};

function getType() {
    let typeSelector = document.querySelector('#contentTypeSelector');
    return typeSelector.options[typeSelector.selectedIndex].value;
}

function updateContentLabel() {
    document.getElementById('contentLabel').innerHTML = 'Your ' + getType() + " Description: ";
}
