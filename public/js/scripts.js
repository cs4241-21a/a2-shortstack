'use strict';

const horgTypes = ["Archignathidae","Haplognathidae","Acutignathidae", "Tridentidae",
 "Toxodentidae", "Mycognathidae", "Corrugatidae", "Other", "Undescribed"];
const horgColors = ["#366190", "#4AA576", "#64BFB0", "#A9E1FD", "#E4D173", "#E29AA6",
 "#D469C0", "#864E94", "#DEDEDE"];

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    //can we use the uuid npm package to give our entries unique identifiers?
    const date = document.querySelector('#date'),
        family = document.querySelector('#family'),
        notes = document.querySelector('#notes'),
        json = {id: "", date: date.value, family: family.value, notes:notes.value },
        body = JSON.stringify(json)

    fetch('/submit', {
        method: "POST",
        body
    })
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (json) {
            console.log(json)
            displayData(json)
        })

    return false
}

const deleteEntry = function (event) {
    let button = (event.target || event.srcElement);
    let id = button.parentElement.id;

    const json = {id: id},
        body = JSON.stringify(json)
    fetch('/submit', {
        method: "DELETE",
        body
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (json) {
        displayData(json)
    })
}

const displayData = function(data){
    //clear the table
    let horgTable = document.getElementById("entries-wrapper");
    horgTable.innerHTML = "";

    //sort entries by date
    data = data.sort((a,b)=> (a.date < b.date) ? 1 : -1);

    //fill the table
    for ( let i = 0; i < data.length; i++){
        let horgEntry = populateHorgRow(data[i]);
        horgTable.appendChild(horgEntry);
    }

    //update chart
    chartUpdate(data);
}

const populateHorgRow = function (data) {
    const date = data.date,
        type = data.family,
        rare = data.rare,
        notes = data.notes,
        id = data.id
    //create HORG entry
    let horgEntry = document.createElement("div");
    horgEntry.classList.add("entry");

    //add data-
    //date
    let dateSpan = document.createElement("span");
    dateSpan.innerHTML = date;
    horgEntry.appendChild(dateSpan);
    //type
    let typeSpan = document.createElement("span");
    typeSpan.innerHTML = type;
    if (rare) typeSpan.innerHTML += " (unique)"
    horgEntry.appendChild(typeSpan);
    //notes
    let notesSpan = document.createElement("details");
    let notesLabel = document.createElement("summary");
    notesLabel.innerHTML = "See notes..."
    notesSpan.appendChild(notesLabel);
    notesSpan.innerHTML += notes;
    horgEntry.appendChild(notesSpan);

    //add x-button
    let btnX = document.createElement("button");
    btnX.innerHTML = "x";
    btnX.classList.add("remove");
    btnX.onclick = deleteEntry;
    horgEntry.appendChild(btnX);

    //add identifying id
    horgEntry.id = id;

    return horgEntry;
}

const chartUpdate = function(data){
    //clear chart
    let chart = document.getElementById('chart');
    chart.innerHTML = "";

    for (let i = 0; i <horgTypes.length; i++){
        let familyName = horgTypes[i]
        // # of times this type shows up
        let occurrences = data.filter(e => e.family === familyName).length;
        if (occurrences > 0) {
            let slice = document.createElement("div");
            slice.id = familyName;
            // % of total is its height
            let percent = 100 * occurrences/data.length;
            slice.style.display = "inline-block"
            slice.style.height = "25px"
            slice.style.width = percent + "%";
            slice.style.backgroundColor = horgColors[i];
            // a mouseover gives you the label
            slice.title = familyName + ": " + Math.trunc(percent) + "%";
            chart.appendChild(slice);
        }
    }
}

window.onload = function () {
    //remove warning
    let jsWarn = document.getElementById("warn");
    jsWarn.remove();

    //populate taxonomic family
    let familySelect = document.getElementById('family');
    for (let familyName of horgTypes){
        //console.log(familyName);
        var opt = document.createElement('option');
        opt.value = familyName;
        opt.innerHTML = familyName;
        familySelect.appendChild(opt);
    }

    //enable submit button
    const button = document.querySelector('button')
    button.onclick = submit
}
