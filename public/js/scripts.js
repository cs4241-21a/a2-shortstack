tableData = []

  const primaryButton = document.getElementById( 'primaryButton' )
  const secondaryButton = document.getElementById( 'secondaryButton' )

  const inputId = document.getElementById( 'id' )
  const inputFname = document.getElementById( 'fname' )
  const inputLname = document.getElementById( 'lname' )
  const inputSex = document.getElementById( 'sex' )
  const inputClass = document.getElementById( 'class' )
  const inputDateJoined = document.getElementById( 'dateJoined' )
  const inputMembershipType = document.getElementById( 'membershipType' )
  const newExpireDate = document.getElementById( 'expireDate' )

  document.addEventListener( 'DOMContentLoaded', retrieve ); // retrieve is the function name that will fire on page load  

  function retrieve(){
    fetch( '/retrieve')
    .then(response => response.json())
          .then(function(data) {
              tableData = data 
              populateTable()
            })
  }

  function populateTable() {
    console.log('running populate table')
    const tableElement = document.getElementById( 'table' )
    let old_tbody = document.getElementById( 'oldTbody')
    let new_tbody = document.createElement('tbody');
    new_tbody.setAttribute('id', 'newTbody') 
    tableData.forEach(function(object) {
        let tr = document.createElement('tr');
       tr.setAttribute('id', 'row'+ object.id)

        tr.innerHTML = 
        '<td id=\'row'+ object.id + '\'>' + object.id + '</td>' +
        '<td id=\'fname'+ object.id + '\'>' + object.fname + '</td>' +
        '<td id=\'lname'+ object.id + '\'>' + object.lname + '</td>' +
        '<td id=\'sex'+ object.id + '\'>' + object.sex + '</td>' +
        '<td id=\'class'+ object.id + '\'>' + object.ageClass + '</td>' + 
        '<td id=\'dateJoined'+ object.id + '\'>' + object.dateJoined + '</td>' +
        '<td id=\'membershipType'+ object.id + '\'>' + object.membershipType + '</td>' +
        '<td id=\'expireDate'+ object.id + '\'>' + object.expireDate + '</td>' +
        '<td> <span title = \'Modify this entry\' class=\'modifyButtons\' onClick=\'modifyInputBoxes(' + object.id + ')\'> </span> </td>'+
        '<td> <span title = \'Delete this entry\' class=\'deleteButtons\' onClick=\'deleteEntry(' + object.id + ')\'> </span> </td>'
        ; 
         new_tbody.appendChild(tr);
        

          });
      tableElement.replaceChild(new_tbody, old_tbody)
      new_tbody.setAttribute('id', 'oldTbody') 
  }

  const modifyInputBoxes = function ( id ) {

    copyCellsToInputFields(id)
    
    primaryButton.innerHTML = 'Modify'
    primaryButton.style.backgroundColor = '#ffd814'
    primaryButton.style.borderColor = '#ffd814'
    primaryButton.style.color = '0x000000'
    secondaryButton.innerHTML = 'Cancel'

    primaryButton.onclick = modifyEntry;
    secondaryButton.onclick = cancelModify
    
  }

  const copyCellsToInputFields = function ( id ) {
    inputId.value = id
    inputFname.value = document.getElementById( 'fname' +id).innerHTML
    inputLname.value  = document.getElementById( 'lname' +id).innerHTML
    inputSex.value  = document.getElementById( 'sex' + id).innerHTML
    inputClass.value = document.getElementById( 'class' +id).innerHTML
    inputDateJoined.value  = document.getElementById( 'dateJoined' +id).innerHTML
    inputMembershipType.value = document.getElementById( 'membershipType' +id).innerHTML
    newExpireDate.value = document.getElementById( 'expireDate' +id).innerHTML
  }

  const cancelModify = function(e) {

    e.preventDefault()
    clearForm(e);

    primaryButton.innerHTML = 'Add New Member'
    primaryButton.style.backgroundColor = '#42B72A'
    primaryButton.style.borderColor = '#42B72A'
    primaryButton.style.color = '0xffffff'
    secondaryButton.innerHTML = 'Clear Contents'

    primaryButton.onclick = addEntry;
    secondaryButton.onclick = clearForm;
 
  }

  
  const addEntry = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault(e)

    json = createJson('add')
    
    if (verifyJson(json)) {
      body = JSON.stringify( json )
      sendPost(body)
      return false
    }
    alert('One or more form fields are empty')
  }

  const modifyEntry = function ( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    json = createJson('modify')

    if (verifyJson(json)) {
      body = JSON.stringify( json )
      sendPost(body)
      return false
    }
    alert('One or more form fields are empty')
  }

  const deleteEntry = function ( idToDelete ) {
    json = createJson('delete')
    json.id = idToDelete

    body = JSON.stringify( json )
    sendPost(body)
    return false
  }

  const createJson = function (action) {
    return  { 
            requestType: action,
            id: inputId.value,
            fname: inputFname.value,
            lname: inputLname.value,
            sex: inputSex.value,
            ageClass: inputClass.value,
            dateJoined: inputDateJoined.value,
            membershipType: inputMembershipType.value,
            expireDate: newExpireDate.value  
          }
  }

  

  //returns false if there are empty fields in the form
  const verifyJson = function ( json ) {
    d = new Date(json.dateJoined)
    dateIsValid = (d.getTime() === d.getTime())
    if (json.fname === '' || json.lname === '' || !dateIsValid
      ||  json.ageClass === '' || json.membershipType === '')
      {
      return false
      }

    return true
  }

  const updateExpireDate = function ( ) {
     newDate = new Date(inputDateJoined.value)

    switch (inputMembershipType.value) { 
      case 'Monthly':
        newDate.setMonth(newDate.getMonth() + 1)
        break;
      case 'Yearly': 
        newDate.setFullYear(newDate.getFullYear() + 1)
        break;
      case 'Lifetime':
        newDate.setFullYear(newDate.getFullYear() + 100)
        break;
      default:
        console.log('Unknown membership type' + inputMembershipType.value)
    }

    month = (newDate.getMonth() + 1)
    date = newDate.getDate()

    let stringMonth = month
    if (month < 10) {
      stringMonth = '0' + stringMonth
    } 
    let stringDate = date
    if (date < 10) {
      stringDate = '0' + stringDate
    }

    newExpireDate.value = newDate.getFullYear() + '-' + stringMonth + '-' + stringDate
  }

  

  const clearForm = function (e) {

    e.preventDefault()

    inputId.value = ''
    inputFname.value = ''
    inputLname.value = ''
    inputSex.value = ''
    inputClass.value = ''
    inputDateJoined.value = ''
    inputMembershipType.value = ''
    newExpireDate.value = ''
  }

  const sendPost = function (body) {
    fetch( '/submit', {
      method:'POST',
      body 
    })
    .then( function( response ) {
      retrieve()
      console.log( response )
    })
  }
  
  window.onload = function() {

    primaryButton.onclick = addEntry
    secondaryButton.onclick = clearForm

    document.getElementById('expireDate').disabled = true

    
  }