// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

const showTable = function (e) {
    e.preventDefault();

}

const submit = function(e) {
    // prevent default form action from being carried out
    e.preventDefault();


    const inputname = document.querySelector("#bookname"),
        inputlength = document.querySelector("#length"),
        inputauthor = document.querySelector("#author"),
        letime = Date.now(),
        retime = letime + 604800*3;
    const json = {
            bookname: inputname.value, length: inputlength.value, author: inputauthor.value, checktime: letime,
            returntime: retime
        },
        body = JSON.stringify(json);

    fetch("/submit", {
        method: "POST",
        body
    }).then(function(response) {
        return response.json();
    })
        .then(function(json) {
            console.log(json);
        });

    return false;
};

const delRecord = function(e){
    e.preventDefault();
    const body = JSON.stringify({'index' : +document.querySelector("#pointer")});

    fetch("/delete", {
        method: "POST",
        body
    }).then(function(response) {
        return response.json();
    })
        .then(function(json) {
            console.log(json);
        });

    return false;
}

const showRecords = function(e){
    e.preventDefault();
    fetch("/reveal", {
        method: "POST"
    }).then( function (d) {
        return d.json()
    }).then(function (arr) {
        document.getElementById('result').innerHTML += '<tr>' +
                '<th>Name of the Book</th>' +
                '<th>Length of the Book</th>' +
                '<th>Author</th>' +
                '<th>Date of Checkout</th>' +
                '<th>Date of Return</th>' +
            '</tr>'
        //adding a table to the
        arr.forEach(el => {
            document.getElementById('result').innerHTML += ``;
            // here result is the id of the div present in the dom
        });
    })
    return false;
}

window.onload = function() {
    const submitButton = document.querySelector("#submit");
    const deleteButton = document.querySelector("#delete");
    const revealButton = document.querySelector("#reveal");
    submitButton.onclick = submit;
    deleteButton.onclick = delRecord;
    revealButton.onclick = showRecords;
};