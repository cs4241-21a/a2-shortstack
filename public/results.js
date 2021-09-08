function generateTopic(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let value in data[0]) {
        if (Object.prototype.hasOwnProperty.call(data[0], value)) {
            let th = document.createElement("th");
            let text = document.createTextNode(value);
            th.appendChild(text);
            row.appendChild(th);
        }
    }
}

function fillTable(table, data) {
    console.log("Filling with data: ", data);
    let tbody = table.createTBody();
    data.forEach(function (item) {
        console.log(item);
        let row = tbody.insertRow();
            for (let key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    let th = document.createElement("td");
                    let text = document.createTextNode(item[key]);
                    th.appendChild(text);
                    row.appendChild(th);
                }
            }
    });
}

window.onload = function () {
    const button = document.querySelector('#submissionButton');
    button.onclick = goToSubmission;
};


const goToSubmission = function(){
    const url = window.location;
    window.location.href = url.protocol + "//" + url.host + "/index.html";
};


let table = document.querySelector("table");

const getUrl = window.location;
const baseUrl = getUrl.protocol + "//" + getUrl.host + "/get-results";
console.log("url: ", baseUrl);
fetch(baseUrl)
    .then(function (data) {
        data.text().then(function (data) {
            console.log(data);
            let json = JSON.parse(data);
            generateTopic(table, json);
            fillTable(table, json);
        });
    })
    .catch(function (error) {
  
});
