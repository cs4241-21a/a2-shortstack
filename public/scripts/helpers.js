const renderTemplate = (template, id, data) => {
    document.getElementById(id).innerHTML = Mustache.render(template, { data });
}

const fetchData = async (room) => {
    console.log(`Fetching ${room} chat data...`);
    return await fetch(`/chat/${ room.toLowerCase() }`).then(async response => {
        const data = await response.json();
        console.log(JSON.parse(JSON.stringify(data)));
        return data;
    });
}

const getTimeString = (submitted) => {
    const now = luxon.DateTime.now().toSeconds();
    submitted = luxon.DateTime.fromISO(submitted).toSeconds();
    const seconds = now - submitted;
    if (seconds < 1) {
        return `Just now`;
    } else if (seconds < 60) {
        return `${Math.floor(seconds)} seconds ago`;
    } else if (seconds < 60 * 60) {
        return `${Math.floor(seconds / 60)} minutes ago`;
    } else if (seconds < 24 * 60 * 60) {
        return `${Math.floor(seconds / 60 / 60)} hours ago`;
    } else if (seconds < 7 * 24 * 60 * 60) {
        return `${Math.floor(seconds / 24 / 60 / 60)} days ago`;
    } else if (seconds < 28 * 24 * 60 * 60) {
        return `${Math.floor(seconds / 7 / 24 / 60 / 60)} weeks ago`;
    } else if (seconds < 365 * 24 * 60 * 60) {
        return `${Math.floor(seconds / 30 / 24 / 60 / 60)} months ago`;
    } else {
        return `${Math.floor(seconds / 365 / 24 / 60 / 60)} years ago`;
    }
}

const addMessage = (username, content, room) => {
    return postChatData('POST', { content, room }, '/message/add');
}

const deleteMessage = (id, room) => {
    return postChatData('DELETE', { id, room }, '/message/delete', false);
}

const updateMessage = (id, content, room) => {
    return postChatData('PUT', { id, content, room }, '/message/update', false);
}

const addPoll = (question, choices, room) => {
    return postChatData('POST', { question, choices, room }, '/poll/add');
}

const voteForPoll = (id, choice, room) => {
    return postChatData('POST', { id, choice, room }, '/poll/vote');
}

const postChatData = (method, data, endpoint, scrollAllowed = true) => {
    return new Promise(() => {
        const body = JSON.stringify(data);
        fetch(endpoint, { method: method, body,
            headers: new Headers({'content-type': 'application/json'})}).then(async response => {
            if (response.ok) {
                renderChat(await response.json(), scrollAllowed).then();
            } else {
                window.alert('Unauthorized error. Please login again.');
                location.reload();
            }
        });
    });
}

const login = (username, secret) => {
    return new Promise(resolve => {
        const body = JSON.stringify({ username, secret });
        fetch('/login', { method: 'POST', body, headers: new Headers({'content-type': 'application/json'})})
            .then(async response => {
                if (response.ok) {
                    response.json().then(data => {
                        if (data['newAccount']) {
                            window.alert(`New account "${username}" created!`);
                        }
                    });
                }
                resolve(response.ok)
            });
    });
}

const logout = () => {
    fetch('/logout', { method: 'POST' }).then();
}

const getSession = () => {
    return new Promise(resolve => {
        fetch('/session', { method: 'GET' }).then(async response => resolve(response.ok ? await response.json() : null));
    });
}
