const submit = function(e) {
    // prevent default form action from being carried out
    e.preventDefault()

    const input = document.querySelector('#doc-title');
    const textarea = document.querySelector('#doc-text');
    const json = {
        title: input.value,
        text: textarea.value,
    };
    const body = JSON.stringify(json);

    fetch('/submit', {
            method: 'POST',
            body
        })
        .then(response => response.json())
        .then(handleData);

    return false;
}

async function getCurrentData() {
    const res = await fetch('/data');
    return res.json();
}


window.addEventListener('load', event => {
    const button = document.querySelector('button');
    button.onclick = submit;
    getCurrentData().then(dat => handleData(dat));
});