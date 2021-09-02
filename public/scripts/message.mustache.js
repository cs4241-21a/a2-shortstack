let editing = false;

function edit(id) {
    updateEditing(true, id);
}

function confirm(id) {
    updateEditing(false, id);
}

function cancel(id) {
    updateEditing(false, id);
}

function updateEditing(e, id) {
    editing = e;
    displayElement(`editButton#${id}`, !e);
    displayElement(`deleteButton#${id}`, !e);
    displayElement(`confirmButton#${id}`, e);
    displayElement(`cancelButton#${id}`, e);
}

const displayElement = (id, display) => {
    document.getElementById(id).style.display = display ? 'flex' : 'none';
}
