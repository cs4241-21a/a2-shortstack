let editing = false;

function beginEdit(id) {
    updateEditing(true, id);
}

function confirmEdit(e, id) {
    if (e) {
        e.preventDefault();
    }
    updateEditing(false, id);
    updateMessage(id, document.getElementById(`contentInput#${id}`).value, room).then();
    return false;
}

function cancelEdit(id) {
    updateEditing(false, id);
}

function beginDelete(id) {
    deleteMessage(id, room).then();
}

function vote(e, id) {
    e.preventDefault();
    const selectedInput = document.getElementById(`pollVotingForm#${id}`).querySelector('input[name=choice]:checked');
    if (selectedInput) {
        voteForPoll(id, selectedInput.value).then();
    }
    return false;
}

function updateEditing(e, id) {
    editing = e;
    if (editing) {
        document.getElementById(`message#${id}`).classList.add('editing');
    } else {
        document.getElementById(`message#${id}`).classList.remove('editing');
    }
}
