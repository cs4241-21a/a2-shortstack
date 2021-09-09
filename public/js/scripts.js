// Add some Javascript code here, to run on the front end.

console.log('Welcome to THE PIT!')

const addTableCell = function(row, value)
{
    const cell = document.createElement('td');
    cell.innerText = value;
    row.appendChild(cell);
}

const addTableRow = function(contestant, power, agility, strength, weakness, survived, defeated)
{
    const table = document.getElementById('roster');
    const newRow = document.createElement('tr');
    addTableCell(newRow, contestant);
    addTableCell(newRow, power);
    addTableCell(newRow, agility);
    addTableCell(newRow, strength);
    addTableCell(newRow, weakness);
    addTableCell(newRow, survived);
    addTableCell(newRow, defeated);
    table.appendChild(newRow);
}

const submit = function( e )
{
    // prevent default form action from being carried out
    e.preventDefault()

    const chrname = document.querySelector( '#chrname' ),
          chrtype = document.querySelector( '#chrtype' ),
          balance = document.querySelector( '#balance' );
    
    const json = { chrname: chrname.value, chrtype: chrtype.value, balance: balance.value }

    if (chrname.value === '')
    {
        alert("Name must be filled in!");
        return false;
    }
    const body = JSON.stringify( json );

    fetch( '/submit',
    {
        method:'POST',
        body
    })
    .then(response => response.json())
    .then( function( response )
    {        
        // Add the new contestant
        const newContestantData = response.newContestantData;
        addTableRow(newContestantData.contestant,
                    newContestantData.power,
                    newContestantData.agility,
                    newContestantData.strength,
                    newContestantData.weakness,
                    newContestantData.survived,
                    newContestantData.defeated);

        // Update the other combatant's record
        if (Object.entries(response.updateData).length > 0)
        {
            const row = document.getElementById('roster').children.item(response.updateData.id + 1);
            if (row === null)
                return;
            row.children.item(5).innerText = response.updateData.survived;
            row.children.item(6).innerText = response.updateData.defeated;
        }
    });

    return false;
}

window.onload = function() {
    // Submit button
    const button = document.querySelector('button');
    button.onclick = submit;

    // Set up the slider bar variables
    const balance = document.querySelector('#balance');
    const powerOutput = document.querySelector('#power-output');
    const agilityOutput = document.querySelector('#agility-output');
    const totalPoints = parseInt(balance.max) + 1;

    balance.style.setProperty('--min', balance.min);
    balance.style.setProperty('--max', balance.max);
    balance.style.setProperty('--value', balance.value);

    function updateSliderOutputs()
    {
        powerOutput.textContent = 'Power: ' + balance.value;
        agilityOutput.textContent = 'Agility: ' + (totalPoints - parseInt(balance.value));
        balance.style.setProperty('--value', balance.value);
    }

    updateSliderOutputs();

    balance.addEventListener('input', updateSliderOutputs);
}