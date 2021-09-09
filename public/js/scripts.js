// Add some Javascript code here, to run on the front end.

//let table = document.getElementById("streamingTable");
let clientdata = []

function updateCollections(data){
  let table = document.getElementById("streamingTable");
  let json_data = JSON.parse(data);
//   clientdata = json_data["data"];
 table.innerHTML = "<tr> <th>Streaming Service</th><th>Currently Subscribed</th> <th>Name</th> <th>Watch Again (yes or no)?</th><th>Rating (1-10)</th><th>Recommendation (yes or no)?</th><th>Our verdit:</th></tr>"
 json_data.forEach(element=> addMedia(element["streamingServiceItem"], element["subscriptionItem"], element["nameOfItem"], element["watchAgainItem"], element["ratingItem"], element["recommendItem"], element["theVerdict"]))
 // addMedia(json_data.title, json_data.director, json_data.)
}


function addMedia(streamingService,subscribed,name,watchAgain,rating, recommend, theVerdict){
  console.log(streamingService,subscribed,name,watchAgain,rating, recommend)
  let table = document.getElementById("streamingTable");

  let row = table.insertRow(-1);

  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  let cell4 = row.insertCell(4); 
  let cell5 = row.insertCell(5);
  let cell6 = row.insertCell(6);

  cell0.innerHTML = streamingService;
  cell1.innerHTML = subscribed;
  cell2.innerHTML = name;
  cell3.innerHTML = watchAgain;
  cell4.innerHTML = rating;
  cell5.innerHTML = recommend;

  if (watchAgain && recommend) {
      cell6.innerHTML = "I'm lovin it!";
  } else cell6.innerHTML = "I'm gonna let that slide";

  cell6.innerHTML = theVerdict; 

}

console.log("Welcome to Assignment #2! I had fun with Master Yoda and Master Oogway, if you couldn't already tell!")
