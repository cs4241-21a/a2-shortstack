'use strict';

const horgTypes = ["Archignathidae","Haplognathidae","Acutignathidae", "Tridentidae",
 "Toxodentidae", "Mycognathidae", "Corrugatidae", "Other", "Undescribed"];

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const date = document.querySelector('#date'),
        family = document.querySelector('#family'),
        notes = document.querySelector('#notes'),
        json = { date: date.value, family: family.value, notes:notes.value },
        body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (json) {
            console.log(json)

            //clear the table
            let horgTable = document.getElementById("entries-wrapper");
            horgTable.innerHTML = "";

            //sort entries by date
            json = json.sort((a,b)=> (a.date < b.date) ? 1 : -1);

            //fill the table
            for ( let i = 0; i < json.length; i++){
                let horgEntry = populateHorgRow(json[i].date, json[i].family, json[i].notes);
                horgTable.appendChild(horgEntry);
            }

        })

    return false
}

const deleteEntry = function () {
    //todo
}

const populateHorgRow = function (date, type, notes) {
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

    return horgEntry;
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
