let entryCount = 0;
let formOpen = -2; // -2 = Not open, -1 = Open for add entry, 0+ = Open for edit index entry

window.onload = () => {
    loadServerData();

    const addButton = document.querySelector("#add-button")
    addButton.onclick = () => {
        clearForm();
        switchForm(-1, entryCount);
    }

    const submitButton = document.querySelector("#submit-button");
    submitButton.onclick = submitData;
}

const loadServerData = () => {
    fetch( "/api", {
        method:"GET",
    })
    .then(res => res.json())
    .then(res => { 
        res.forEach((item, index) => {
            addTableRow(entryCount);    
            setEntry(index, item);
            entryCount++;
        });
    })
}

//#region Table Handling
    // Sets the table data of a given entry for row identified by index
    const setEntry = (index, entry) => {
        const tableRows = document.getElementsByClassName("table-row");
        const entryRow = tableRows[index];

        const tableDatas = entryRow.querySelectorAll("td");
        tableDatas[0].innerText = entry["investment"];
        tableDatas[1].innerText = entry["cost"];
        tableDatas[2].innerText = entry["revenue"];
        tableDatas[3].innerText = parseFloat(entry["roi"]).toFixed(2) + "%";
    }

    // Creates a new row on the table
    const addTableRow = (index) => {
        const emptyRow = document.querySelector("#empty-row");
        const newRow = emptyRow.cloneNode(true);
        newRow.setAttribute("id", "");
        newRow.setAttribute("class", "table-row");
        
        const iconButtonCell = newRow.querySelector(".icon-button-cell");
        iconButtonCell.innerHTML = "";
        iconButtonCell.appendChild(addOptionButtons(index));

        emptyRow.before(newRow);
    }

    // Creates the option buttons for an existing row on the table
    const addOptionButtons = (index) => {
        const onClickEdit = (e) => {
            setForm(index);
            switchForm(index, index);
        }

        const onClickDelete = (e) => {
            deleteData(index);
        }

        const btnContainer = document.createElement("div");
        btnContainer.setAttribute("class", "icon-button-container");

        const btnEdit = document.createElement("button");
        btnEdit.setAttribute("class", "icon-button");
        btnEdit.onclick = onClickEdit;
        
        const imgEdit = document.createElement("img");
        imgEdit.setAttribute("class", "icon edit-icon");
        imgEdit.setAttribute("src", "img/edit.svg");
        imgEdit.setAttribute("title", "Edit Entry");
        
        const btnDelete =  document.createElement("button");
        btnDelete.setAttribute("class", "icon-button");
        btnDelete.onclick = onClickDelete;

        const imgDelete = document.createElement("img");
        imgDelete.setAttribute("class", "icon delete-icon");
        imgDelete.setAttribute("src", "img/delete.svg");
        imgDelete.setAttribute("title", "Delete Entry");

        btnEdit.appendChild(imgEdit);
        btnDelete.appendChild(imgDelete);
        btnContainer.appendChild(btnEdit);
        btnContainer.appendChild(btnDelete);

        return btnContainer;
    }
//#endregion

//#region Form Handling
    const switchForm = (formType, index) => {
        const form = document.querySelector("form");
        if (form.hidden || formType != formOpen) {
            openForm(index);
            formOpen = formType;
        } else hideForm(); 
    }

    const openForm = (index) => {
        const form = document.querySelector("form");
        form["submit-button"].value = index;
        form.hidden = false;
    }

    const hideForm = () => {
        const form = document.querySelector("form");
        form.hidden = true;
        formOpen = -2;
    }

    const setForm = (index) => {
        const tableRows = document.getElementsByClassName("table-row");
        const entryRow = tableRows[index];
        const tableDatas = entryRow.querySelectorAll("td");

        const form = document.querySelector("form");

        form.investment.value = tableDatas[0].innerText;
        form.cost.value = tableDatas[1].innerText;
        form.revenue.value = tableDatas[2].innerText;
    }

    const clearForm = () => {
        const form = document.querySelector("form");
        form.investment.value = "";
        form.cost.value = "";
        form.revenue.value = "";
    }

    // Calculates a ROI as a percent
    const calculateROI = (cost, rev) => {
        return ((rev - cost) / cost) * 100;
    }

    const submitData = e => {
        e.preventDefault();

        const form = document.querySelector("form");

        const investment = form["investment"].value;
        const cost = form["cost"].value;
        const revenue = form["revenue"].value;
        const roi = calculateROI(cost, revenue);

        const index = e.target.value;

        const json = {
            index,
            item: {
                investment, 
                cost,
                revenue,
                roi
            }
        }
        const body = JSON.stringify(json);

        fetch( "/submit", {
            method:"POST",
            body 
        })
        .then(() => {
            if (index >= entryCount) {
                addTableRow(entryCount);
                entryCount++;
            }
            setEntry(index, json["item"]);
        })

        clearForm();
        hideForm();
    }

    const deleteData = (index) => {
        const body = JSON.stringify({index});

        fetch( "/submit", {
            method:"POST",
            body 
        })
        .then(() => {
            window.location.replace(window.location.href);
        })
    }
//#endregion
