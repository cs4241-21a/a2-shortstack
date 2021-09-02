const renderTemplate = (template, id, data) =>
    document.getElementById(id).innerHTML = Mustache.render(template, { data });

const parseUsername = () => {
    const usernameMatch = window.location.search.match('username=(.+?)(?:$|&)');
    return usernameMatch ? usernameMatch[1] : null;
}

const fetchData = async () => {
    return await fetch('results').then(async response => {
        return await response.json()
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

const addMessage = (username, content, hash) => {
    return postDataUpdate({ username, content, hash }, '/add');
}

const deleteMessage = (id, hash) => {
    return postDataUpdate({ id, hash }, '/delete');
}

const updateMessage = (id, content, hash) => {
    return postDataUpdate({ id, content, hash }, '/update');
}

const postDataUpdate = (data, endpoint) => {
    return new Promise(() => {
        const body = JSON.stringify(data);
        fetch(endpoint, { method:'POST', body }).then(async response => {
            if (response.ok) {
                renderChat(await response.json()).then();
            } else {
                window.alert('Unauthorized error. Please login again.');
                location.reload();
            }
        });
    });
}

const authenticateUser = (username, secret) => {
    return new Promise(resolve => {
        const body = JSON.stringify({ username, secret });
        fetch('/authenticate', { method:'POST', body })
            .then(async response => resolve(response.ok ? await response.json() : null));
    });
}

const shadowRoute = (route) => {
    const path = `/${route}`;
    window.history.pushState({ path }, '', path);
}
