let editing = false;

function edit(id) {
    updateEditing(true, id);
}

function confirm(id, hash) {
    updateEditing(false, id);
    updateMessage(id, document.getElementById(`contentInput#${id}`).value, hash).then();
}

function cancel(id) {
    updateEditing(false, id);
}

function updateEditing(e, id) {
    editing = e;
    if (editing) {
        document.getElementById(`message#${id}`).classList.add('editing');
    } else {
        document.getElementById(`message#${id}`).classList.remove('editing');
    }
}
