let editing = false;

function beginEdit(id) {
    updateEditing(true, id);
}

function confirmEdit(e, id) {
    if (e) {
        e.preventDefault();
    }
    updateEditing(false, id);
    updateMessage(id, document.getElementById(`contentInput#${id}`).value).then();
    return false;
}

function cancelEdit(id) {
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
