let lang_dict = null
let starter_dict = null
let icream_dict = null

function deleteEntry(index){
    console.log("Delete Entry: " + index);
    
    let json = {"index": index};
    let body = JSON.stringify(json)

    fetch( '/delete', {
        method:'POST',
        body 
      })
      .then( function( response ) { 
        console.log( response )
        updatePage()
      })

}

function editEntry(index, name, lang, starter, icream) {
    console.log("Edit Entry: " + index + name + lang + starter + icream);
    // set input values in form
    document.getElementById("name").value = name;
    switch(lang){
        case "HTML":
            document.getElementById("html").checked = true;
            break;
        case "CSS":
            document.getElementById("css").checked = true;    
            break;
        case "JS":
            document.getElementById("javascript").checked = true;
            break;
    }
    switch(starter){
        case "Bulbasaur":
            document.getElementById("bulb").checked = true;
            break;
        case "Charmander":
            document.getElementById("char").checked = true;    
            break;
        case "Squirtle":
            document.getElementById("squirt").checked = true;
            break;
    }
    document.getElementById("icream").value = icream;

    // delete old entry
    let json = {"index": index};
    let body = JSON.stringify(json)

    fetch( '/delete', {
        method:'POST',
        body 
    })

    // reveal modal
    const modal = document.getElementById("promptModal");
    modal.style.display = "block";

    // new entry will be added once user clicks submit
}

function initCounts() {
    lang_dict = {"HTML": 0, "CSS": 0, "JS": 0};
    starter_dict = {"Bulbasaur": 0, "Charmander": 0, "Squirtle": 0};
    icream_dict = {"Vanilla": 0, "Chocolate": 0};
}

function updateCounts(key, value){
    if ("lang" === key) lang_dict[value] = lang_dict[value] +  1;
    else if ("starter" === key) starter_dict[value] = starter_dict[value] + 1;
    else icream_dict[value] = icream_dict[value] + 1;
}

function calcStats(){
    // Obtain elements from HTML document
    const langDiv = document.getElementById("lang_stat");
    const starterDiv = document.getElementById("starter_stat");
    const icreamDiv = document.getElementById("icream_stat");
    // calculate language stats
    let reportingLang = null
    let reportingLangCount  = -1;
    let entries = 0;
    for (let [key, value] of Object.entries(lang_dict)) {
        if(value > reportingLangCount) {
            reportingLang = key;
            reportingLangCount = value;
        }
        entries += value;
    }
    langDiv.innerHTML = `<br> <h2>${((reportingLangCount/entries)*100).toString().substring(0,4)}%</h2> dislike ${reportingLang}`
    switch(reportingLang) {
        case "HTML":
            langDiv.style.background = "#9885d6";
            break;
        case "JS":
            langDiv.style.background = "#85d2d6";
            break;
        case "CSS":
            langDiv.style.background = "#e0a2da";
            break;
    }

    // calculate starter stats
    let reportingStarter = null
    let reportingStarterCount  = -1;
    for (let [key, value] of Object.entries(starter_dict)) {
        if(value > reportingStarterCount) {
            reportingStarter = key;
            reportingStarterCount = value;
        }
    }
    starterDiv.innerHTML = `<br> <h2>${((reportingStarterCount/entries)*100).toString().substring(0,4)}%</h2> love ${reportingStarter}`
    switch(reportingStarter) {
        case "Charmander":
            starterDiv.style.background = "#fa8682";
            break;
        case "Squirtle":
            starterDiv.style.background = "#89dcf5";
            break;
        case "Bulbasaur":
            starterDiv.style.background = "#89d685";
            break;
    }

    // calculate ice cream stats
    let reportingCream = null
    let reportingCreamCount  = -1;
    for (let [key, value] of Object.entries(icream_dict)) {
        if(value > reportingCreamCount) {
            reportingCream = key;
            reportingCreamCount = value;
        }
    }
    icreamDiv.innerHTML = `<br> <h2>${((reportingCreamCount/entries)*100).toString().substring(0,4)}%</h2> prefer ${reportingCream}`
    switch(reportingCream) {
        case "Vanilla":
            icreamDiv.style.background = "#8e9fa3";
            break;
        case "Chocolate":
            icreamDiv.style.background = "#8a6e6a";
            break;
    }

    // let lang_html = JSON.stringify(lang_dict) + "\n";
    // let starter_html = JSON.stringify(starter_dict) + "\n";
    // let icream_html = JSON.stringify(icream_dict) + "\n";
    // statsDiv.innerHTML = lang_html + starter_html + icream_html;
}

function updatePage() {
    // POST /update Request
    fetch('/update', {
        method: 'GET'
    }).then(function(response){
        return response.json();
    }).then(function(data){
        // appdata from server.js
        appdata = data;
        initCounts()
        // clear table's data
        const resultsTable = document.getElementById("results");
        resultsTable.innerHTML = " ";

        // create table row
        let headRow = document.createElement('tr');

        // create table headers
        let th1 = document.createElement('th');
        th1.innerHTML = 'Name';
        headRow.appendChild(th1);
        
        let th2 = document.createElement('th');
        th2.innerHTML = 'Dislikes';
        headRow.appendChild(th2);

        let th3 = document.createElement('th');
        th3.innerHTML = 'Starter';
        headRow.appendChild(th3);

        let th4 = document.createElement('th');
        th4.innerHTML = 'Prefers';
        headRow.appendChild(th4);

        // add to the table
        resultsTable.appendChild(headRow)

        for (let dataIndex = 0; dataIndex < appdata.length; dataIndex++) {
            let entry = appdata[dataIndex]
            // Create new row
            let newRow = document.createElement('tr');
            newRow.className = "tableEntry"
            // Extract data and append
            let nameData = document.createElement('td');
            nameData.innerHTML = entry["name"]
            newRow.appendChild(nameData)

            let langData = document.createElement('td');
            langData.innerHTML = entry["lang"]
            newRow.appendChild(langData)
            updateCounts("lang", entry["lang"])

            let starterData = document.createElement('td');
            starterData.innerHTML = entry["starter"]
            newRow.appendChild(starterData)
            updateCounts("starter", entry["starter"])

            let icreamData = document.createElement('td');
            icreamData.innerHTML = entry["icream"]
            newRow.appendChild(icreamData)
            updateCounts("icream", entry["icream"])

            // add edit icon
            let editIcon = document.createElement('td');
            editIcon.innerHTML = "<span class=\"icon\">&#x270E;</span>";
            editIcon.onclick = function(e) {
                e.preventDefault();
                editEntry(dataIndex, entry["name"], entry["lang"], entry["starter"], entry["icream"]);
            }
            newRow.appendChild(editIcon);

            // add delete icon
            let deleteIcon = document.createElement('td');
            deleteIcon.innerHTML = "<span class=\"icon\">&#x1F5D1;</span>";
            deleteIcon.onclick = function(e) {
                e.preventDefault();
                deleteEntry(dataIndex);
            }
            newRow.appendChild(deleteIcon);
            
            // add to row
            resultsTable.appendChild(newRow);
        }
        // derived field calculation
        calcStats()
        // close modal form
        const modal = document.getElementById("promptModal");
        modal.style.display = "none";
    })
}

const submitForm = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    // obtain form
    const form = document.querySelector("form");
    // setup JSON object
    let json = {}
    // Iterate through data in form
    let data = new FormData(form);
    for (let pair of data.entries()){
        json[pair[0]] = pair[1]
    }
    // set the body for request
    let body = JSON.stringify(json)

    // POST /add Request
    fetch( '/add', {
      method:'POST',
      body 
    })
    .then( function( response ) { 
      console.log( response )
    }).then( function() { 
        console.log( "Finished add request" )
        updatePage()
        form.reset()
    })
  }

window.onload = function() {
    const button = document.querySelector('form')
    button.onsubmit = submitForm
    updatePage()
}