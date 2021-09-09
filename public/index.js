const hwAPIPath = "/homework"

const hwProperties = [
  "name", "priority", "course", "dueDate",
]
const hwPropColNames = [
  "Homework", "Priority", "Course", "Due Date", "Time Due",
]

const homeworkData = { }

function addHWToTable(homeworkTable, homework) {
  console.log(homework)
  
  let homeworkRow = document.createElement('tr')
  // Create each data element for the row
  for(const prop of hwProperties) {
    console.log(homework + " ==> " + prop)
    let homeworkProp = document.createElement('td')
    homeworkProp.textContent = homework[prop]
    homeworkRow.appendChild(homeworkProp)
  }
  homeworkTable.appendChild(homeworkRow)
}

const submit = function ( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const input = document.querySelector( '#homeworkname' ),
        homework = { name: input.value }

  homework.course = "N/A"
  homework.dueDate = "2021-09-09T23:59:00"

  // Calculate submission time
  let currDate = new Date()
  homework.subDate = currDate.toISOString()

  console.log(homework)

  const body = JSON.stringify(homework)
  fetch( hwAPIPath, {
    method:'POST',
    body
  })
  .then( function( response ) {
    const homeworkTable = document.getElementById('assignments')

    // Convert POST response into JSON to extract new homework information
    // Then display homework info on the table
    response.json().then(homework => {
      // Display given homeworks
      homeworkData[homework.subDate] = homework
      addHWToTable(homeworkTable, homework)
    })
  })

  return false
}


window.onload = function() {
  const button = document.querySelector( 'button' )
  button.onclick = submit

  const homeworkTable = document.getElementById('assignments')

  // Initialize Column Names
  let labelRow = document.createElement('tr')
  for(const name of hwPropColNames) {
    let colLabel = document.createElement('th')
    colLabel.textContent = name
    labelRow.appendChild(colLabel)
  }
  homeworkTable.appendChild(labelRow)

  // Request list of homework stored on server
  fetch('/homework', {
    method: 'GET',
  })
  .then(function(response) {
    // Convert GET response into JSON to extract homework information
    // Then display homework info on the table
    response.json().then(assignments => {
      console.log(assignments)
      // Display given homeworks
      for(const homeworkID in assignments) {
        homeworkData[homeworkID] = assignments[homeworkID]
        addHWToTable(homeworkTable, homeworkData[homeworkID])
      }
    })
  })
}