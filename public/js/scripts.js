// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

// Update the tasks table data
let updateTasks = (tasks) => {

    const holder = document.querySelector('#task-holder');
    holder.innerHTML = '';

    tasks.forEach(element => {

        // Create table row
        const row = document.createElement('tr');

        const titleData = document.createElement('td');
        const titleInput = document.createElement('input');
        titleData.appendChild(titleInput);
        titleInput.value = element.title;
        titleInput.id = `title-${element.title}`;

        const descriptionData = document.createElement('td');
        const descriptionInput = document.createElement('input');
        descriptionData.appendChild(descriptionInput);
        descriptionInput.value = element.description;
        descriptionInput.id = `description-${element.title}`;

        const priorityData = document.createElement('td');
        const priorityInput = document.createElement('input');
        priorityInput.type = 'number';
        priorityInput.min = 0;
        priorityInput.max = 10;
        priorityData.appendChild(priorityInput);
        priorityInput.value = element.priority;
        priorityInput.id = `priority-${element.title}`;

        const deadlineData = document.createElement('td');
        const deadlineInput = document.createElement('input');
        deadlineInput.readOnly = true;
        deadlineData.appendChild(deadlineInput);
        deadlineInput.value = element.deadline;

        const delBtn = document.createElement('button');
        delBtn.appendChild(document.createTextNode('Delete'));
        delBtn.onclick = () => {

            fetch('/delete', {
                method: 'POST',
                body: JSON.stringify({title: element.title})
            }).then(async (data) => {
                const tasks = await data.json();

                updateTasks(tasks);
            }).catch((err) => {
                console.log(err);
            });
        };

        const editBtn = document.createElement('button');
        editBtn.appendChild(document.createTextNode('Edit'));
        editBtn.onclick = (e) => {

            const priority = document.querySelector(`#priority-${element.title}`);

            if ((!priority.valueAsNumber && priority.valueAsNumber !== 0) || priority.valueAsNumber < 0 || priority.valueAsNumber > 10) {
                alert('Priority must be 0 - 10');
                return;
            }

            fetch('/edit', {
                method: 'POST',
                body: JSON.stringify({
                    oldTitle: element.title,
                    newTitle: document.querySelector(`#title-${element.title}`).value,
                    description: document.querySelector(`#description-${element.title}`).value,
                    priority: priority.valueAsNumber
                })
            }).then(async (data) => {
                const tasks = await data.json();

                if (tasks.error) {
                    alert(tasks.error);
                    return;
                }

                updateTasks(tasks);
            }).catch((err) => {
                console.log(err);
            });
        };

        // Append everything together
        row.appendChild(titleData);
        row.appendChild(descriptionData);
        row.appendChild(priorityData);
        row.appendChild(deadlineData);

        row.appendChild(editBtn);
        row.appendChild(delBtn);

        holder.appendChild(row);
    });
}

const submit = function (e) {
    // prevent default form action from being carried out
    e.preventDefault();

    // Get and format today's date
    var today = new Date();
    const dateString = `${String(today.getMonth() + 1).padStart(2, '0')}/` +
        `${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;

    const title = document.querySelector('#title');
    const description = document.querySelector('#description');

    const priority = document.querySelector('#priority');
    if ((!priority.valueAsNumber && priority.valueAsNumber !== 0) || priority.valueAsNumber < 0 || priority.valueAsNumber > 10) {
        alert('Priority must be 0 - 10');
        return;
    }

    const json = {
        title: title.value,
        description: description.value,
        dateCreated: dateString,
        priority: priority.valueAsNumber
    };
    const body = JSON.stringify(json)

    fetch('/submit', {
        method: 'POST',
        body
    })
        .then(async function (response) {
            const tasks = await response.json();

            if (tasks.error) {
                alert(tasks.error);
                return;
            }

            updateTasks(tasks);
        });

    return false;
}

window.onload = function () {
    const button = document.querySelector('button')
    button.onclick = submit;

    // Get initial table of data from server
    fetch('/get-data', {
        method: 'GET'
    }).then(async (data) => {
        const tasks = await data.json();

        updateTasks(tasks);
    }).catch((err) => {
        console.log(err);
    });
}