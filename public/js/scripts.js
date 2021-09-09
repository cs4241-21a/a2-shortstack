// Add some Javascript code here, to run on the front end.

let arr = [];

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault()

    let name = document.getElementById( 'yourname' ),
        order = document.getElementById('order'),
        dist = document.getElementById('distance'),
          json = { yourname: name.value, yourorder: order.value, distance: dist.value },
          body = JSON.stringify( json );
    if(name.value === ''){
      alert('Please enter proper name')
    }
    else if(order.value === ''){
      alert('Please enter proper order')
    }
    else{
      fetch( '/submit', {
        method:'POST',
        body
      })
      .then( function( response ){
        return response.text();
      })
      .then( function( text ){
        arr.push(JSON.parse(text));
        newData();
      })
    }
    return false
  }

  window.onload = function() {
    const button = document.querySelector( 'button' )
    button.onclick = submit
  }

  function newData(){
    const d = new Date();
    let index = arr.length - 1;

    let table = document.getElementById('dataTable');
    let newRow = table.insertRow(-1);

    let nameCell = newRow.insertCell(0);
    let timeCell = newRow.insertCell(1);
    let orderCell = newRow.insertCell(2);
    let distanceCell = newRow.insertCell(3);
    let dropTimeCell = newRow.insertCell(4);
    let deleteCell = newRow.insertCell(5);
    
    nameCell.innerHTML = arr[index].yourname;
    timeCell.innerHTML = getTime(d);
    orderCell.innerHTML = arr[index].yourorder;
    distanceCell.innerHTML = arr[index].distance;
    dropTimeCell.innerHTML = arr[index].dropTime;
    deleteCell.innerHTML = '<button onclick="remove(this)">Remove</button>';
   }

   function getTime(date){
      let hours;
      if(date.getHours() > 12){
        hours = date.getHours() - 12;
      }
      else{
        hours = date.getHours();
      }

      let minutes = date.getMinutes();
      if(minutes === 0){
        return hours + ":00";
      }
      else if(minutes < 10){
        return hours + ":0" + minutes;
      }
      else{
        return hours + ":" + minutes;
      }
      
   }

   function remove(cell){
      const table = document.getElementById('dataTable');
      let index = cell.parentNode.parentNode.rowIndex;

      table.deleteRow(index);
      let name = table.row[index].cells[0].innerHTML,
        order = table.row[index].cells[2].innerHTML,
        dist = table.row[index].cells[3].innerHTML,
          json = { yourname: name.value, yourorder: order.value, distance: dist.value },
          body = JSON.stringify( json );

      fetch( '/delete', {
        method:'POST',
        body
      })
      .then( function( response ){
          return response.text();
      })
      .then( function( text ){
          console.log(text)
      })
   }
   