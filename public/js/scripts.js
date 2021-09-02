const inputText = document.getElementById('inptNotes');
const counter = document.getElementById('counter');

inputText.addEventListener('input', updateValue);

function updateValue(e){
    const target = e.target;

    const maxLength = target.getAttribute('maxlength');

    const currentLength = target.value.length;

    counter.innerHTML = `${currentLength}/${maxLength}`;
};