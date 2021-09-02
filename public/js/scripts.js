window.onload = function() {
    const addButton = document.querySelector("#add-button")
    addButton.onclick = addEntry;
}

const addEntry = () => {
    addTableRow();
    openForm();
}

// Creates a new row on the table
const addTableRow = () => {
    const emptyRow = document.querySelector("#empty-row");
    const newRow = emptyRow.cloneNode(true);
    newRow.setAttribute("id", "");
    const iconButtonCell = newRow.querySelector(".icon-button-cell");
    iconButtonCell.innerHTML = "";
    iconButtonCell.appendChild(addOptionButtons(0));
    emptyRow.before(newRow);
}

// Creates the option buttons for an existing row on the table
const addOptionButtons = (row) => {
    const onClickEdit = (e) => {
        console.log(`${row} onClickEdit triggered`)
    }

    const onClickDelete = (e) => {
        console.log(`${row} onClickDelete triggered`)
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

const openForm = () => {
    const form = document.querySelector("form");
    form.hidden = false;
}

// const submit = function( e ) {
//     e.preventDefault()

//     const input = document.querySelector( "#yourname" ),
//           json = { yourname: input.value },
//           body = JSON.stringify( json )

//     fetch( "/submit", {
//         method:"POST",
//         body 
//     })
//     .then( function( response ) {
//         console.log( response )
//     })

//     return false
// }