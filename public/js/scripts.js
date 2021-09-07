const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  let foodInput = document.getElementById( 'fname' );
  let calInput = document.getElementById( 'cal' );
  let servInput = document.getElementById( 'numserv' );
  let mytable = document.getElementById("foodtable");
  for(let i = 0; i < mytable.rows.length; i++){
      if(foodInput.value === mytable.rows[i].cells[0].innerHTML){
        alert("Invalid input: Duplicate item");
        return false;
      }
  }
  if(calInput.value < 0 || servInput.value < 0){
    alert("Invalid input: Negative value");
  }
  else{
  let json = { fname: foodInput.value, cal: calInput.value, numserv: servInput.value};
  let body = JSON.stringify( json );

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( response => response.text())
  .then( function( text ){
      const entry = JSON.parse(text);
      const i = entry.length - 1;
      let table = document.getElementById("foodtable");
      let row = table.insertRow(-1);
      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);
      let c4 = row.insertCell(3);
      let c5 = row.insertCell(4);
      let c6 = row.insertCell(5);
      c1.innerHTML = entry[i].fname;
      c2.innerHTML = entry[i].cal;
      c3.innerHTML = entry[i].numserv;
      c4.innerHTML = entry[i].tcal;
      c5.innerHTML = '<button id="edit" onclick="edit(this)">Edit</button>';
      c6.innerHTML = '<button id="delete" onclick="remove(this)">Delete</button>';
      let form = document.getElementById("foodform");
      form.reset();
  })
  }
  return false
}

const edit = function( obj ) {
  let i = obj.parentNode.parentNode.rowIndex;
  const name = document.getElementById("foodtable").rows[i].cells[0].innerHTML;
  const calories = document.getElementById("foodtable").rows[i].cells[1].innerHTML;
  const serv = document.getElementById("foodtable").rows[i].cells[2].innerHTML;

  document.getElementById("fname2").value = name;
  document.getElementById("cal2").value = calories;
  document.getElementById("numserv2").value = serv;
}

const update = function( e ){
  e.preventDefault();

  let foodUpdate = document.getElementById( 'fname2' );
  let calUpdate = document.getElementById( 'cal2' );
  let servUpdate = document.getElementById( 'numserv2' );

  if(calUpdate.value < 0 || servUpdate.value < 0){
    alert("Invalid input: Negative value");
  }
  else{
  let json = { fname: foodUpdate.value, cal: calUpdate.value, numserv: servUpdate.value};
  let body = JSON.stringify( json );

  fetch( '/update', {
    method:'POST',
    body 
  })
  .then( response => response.text())
  .then( function( text ){
      const entry = JSON.parse(text);
      const name = entry[0].fname;
      let table = document.getElementById("foodtable");
      for(let i = 0; i < table.rows.length; i++){
        if(table.rows[i].cells[0].innerHTML === name){
          table.rows[i].cells[1].innerHTML = entry[0].cal;
          table.rows[i].cells[2].innerHTML = entry[0].numserv;
          table.rows[i].cells[3].innerHTML = entry[0].tcal;
          break;
        }
      }
      let form = document.getElementById("updateform");
      form.reset();
  })
}
  return false
}

const remove = function( obj ) {
  let i = obj.parentNode.parentNode.rowIndex;
  const name = document.getElementById("foodtable").rows[i].cells[0].innerHTML;
  document.getElementById("foodtable").deleteRow(i);
  const body = JSON.stringify(name);
  fetch( '/remove', {
    method:'POST',
    body
  })
  .then( response => response.text())
  .then( function( text ){
        console.log(text);
  })
  return false
}

window.onload = function() {
  const button = document.getElementById( 'add' )
  button.onclick = submit

  const button2 = document.getElementById( 'update' )
  button2.onclick = update
}