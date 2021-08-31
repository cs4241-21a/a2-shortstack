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
