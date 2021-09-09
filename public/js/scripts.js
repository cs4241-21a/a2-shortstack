// Add some Javascript code here, to run on the front end.

//let table = document.getElementById("watchlist");
let clientdata = []

function updateWatchlist(data){
  let table = document.getElementById("watchlist");
  let json_data = JSON.parse(data);
//   clientdata = json_data["data"];
 table.innerHTML = "<tr> <th>Title</th><th>Director</th> <th>Genre</th> <th>Year</th><th>In Theaters?</th><th>Leaving Soon?</th></tr>"
 json_data.forEach(element=> addMedia(element["titleEntry"], element["directorEntry"], element["genreEntry"], element["yearEntry"], element["isInTheaters"], element["leavingSoon"]))
 // addMedia(json_data.title, json_data.director, json_data.)
}


function addMedia(title,director,genre,year,isInTheaters, leavingSoon){
  console.log(title,director,genre,year,isInTheaters)
  let table = document.getElementById("watchlist");

  let row = table.insertRow(-1);
  let theaterChecker = document.getElementById("isInTheaters");
  
  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4); 
  let cell5 = row.insertCell(5);
  
  cell0.innerHTML = title;
  cell1.innerHTML = director;
  cell2.innerHTML = genre;
  cell3.innerHTML = year;
  
  if (isInTheaters) {
      cell4.innerHTML = "Yes";
  } else cell4.innerHTML = "No";
  
  cell5.innerHTML = leavingSoon; 
  
}


function myDeleteFunction() {
  document.getElementById("watchLists").deleteRow(-1);
}

console.log("Welcome to assignment 2!")
