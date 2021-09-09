// Add some Javascript code here, to run on the front end.

//let table = document.getElementById("watchlist");
let clientdata = []

function updateTable(data){
  let table = document.getElementById("streamingTable");
  let json_data = JSON.parse(data);
 table.innerHTML = "<tr> <th>Streaming Service</th><th>Subscription Status</th> <th>Name</th> <th>Watch Again</th><th>Rating Item</th><th>Recommendation</th></tr>"
 json_data.forEach(element=> addMedia(element["streamingServiceItem"], element["subscriptionItem"], element["nameOfItem"], element["watchAgainItem"], element["ratingItem"], element["recommendation"]))
}


function addMedia(streamingService,subscriptionStatus,name,watchAgain,rating,recommendation){
  console.log(streamingService,subscriptionStatus,name,watchAgain,rating)
  let table = document.getElementById("streamingTable");

  let row = table.insertRow(-1);
  let theaterChecker = document.getElementById("watchAgain");
  
  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4); 
  let cell5 = row.insertCell(5);
  
  cell0.innerHTML = streamingService;
  cell1.innerHTML = subscriptionStatus;
  cell2.innerHTML = name;
  cell3.innerHTML = watchAgain;
  cell4.innerlHTML = rating;
  
  
  if (watchAgain.parsedInfo("yes")) {
      cell3.innerHTML = "Yes";
  } else cell3.innerHTML = "No";
  
  cell5.innerHTML = recommendation; 
  
}

console.log("Welcome to assignment 2!")
