// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

//function
//request that just gives me data
//have edit function return data as well



function deleteData(appdata){
    
}

//Adds a row 
function addRow(){
    let addedName = document.getElementById("player-name");
    let addedScore = document.getElementById("player-score");
    let table = document.getElementById("game-leaderboard");

    let addedRank;
    let currentScore;
    let isRankPlaced;
    for(let i = 1; i < appdata.length; i++){
        if(!isRankPlaced){
            currentScore = appdata[i].rank;
            if(addedScore.innerHTML > currentScore){
                addedRank = i;
            }
        } else {
            //Lower the rank of the appdata 
            appdata[i].rank += 1;
        }
    }

    
}

function makeTableFromData(appdata){
    let table = document.getElementById("game-leaderboard");
    let data = Object.keys(appdata[0]);

    table.innerHTML = '';
    generateTableHead(table, data);
    generateTable(table, appdata);

}

function generateTableHead(table, data){
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
      }

}

function generateTable(table, data){

    let i = 0;
    
    for(let element of data){
        i++;
        let row = table.insertRow();
        for(key in element){
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
        let deleteButton = document.createElement("button");
        deleteButton.id = i;
        row.appendChild(deleteButton);
    }
    
}


////////////// 
//Game Code
//////////////

let radius = 100;
let x, y;
let score = 0;
let r, g, b;
let level = 1;
let isCircleClicked = true;
let gameOver = false;
let timeInterval = 1500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(windowWidth);
  y = random(windowHeight);
  r = random(255);
  g = random(255);
  b = random(255);
}

function draw() {
    console.log(gameOver)
  background(0);
  if(!gameOver){
    fill(r, g, b)
    noStroke();
    ellipse(x, y, radius*3, radius*3);
    text("Score: " + score, 10, 20);
    text("Level: " + level, 10, 60);
    textSize(30);
  } else {
    text("Game Over!", windowWidth/2, windowHeight/2);
    textSize(60);
  }
}
  
function mousePressed(){
  let d = dist(mouseX, mouseY, x, y);
    if (d < radius) {
      newCircle();
      score++;

      
      if(score % 10 === 0 && score < 100){
        radius /= 1.1;
        level++;
        timeInterval -= 50;
      }

      /*
      if (score == 10) {
        radius /= 1.3;
        level++;
      }
      
      if (score == 20) {
        radius /= 1.3;
        level++;
      }
      
      if (score == 30) {
        radius /= 1.3;
        level++;
      }
      
      if (score == 40) {
        radius /= 1.3;
        level++;
      }
      
      if (score == 50) {
        radius/= 1.3;
        level++;
      }
      
      if(score == 60) {
        radius /= 1.3;
        level++;
      }
      
      if(score == 70) {
        radius /= 1.3;
        level++;
      }
      
      if (score == 80) {
        radius /= 1.3;
        level++;
      }
      
      if(score == 90) {
        radius /= 1.3;
        level++;
      }
      
      if(score == 100) {
        radius /= 1.3;
        level++;
      }
      */
  
     isCircleClicked = true;
  
    }
      
    }

function newCircle(){
    if(isCircleClicked){
        x = random(windowWidth);
        y = random(windowHeight);
        r = random(255);
        g = random(255);
        b = random(255);
        isCircleClicked = false;
    } else {
        
        //gameOver = true;
    }
}

setInterval(newCircle, timeInterval);

/*
//Sorts the HTML table, allowing for a accurate ranked leaderboard
function sortLeaderboardByRank(){

    let table = document.getElementById("game-leaderboard");
    
    //Booleans that track switching status
    let switching = true;
    let shouldSwitch;

    //This while loop will continue until we no longer have to switch
    while(switching){
        switching = false;
        rows = table.rows;

        //Loop through all table rows except for the first
        for(let i = 1; i < (rows.length-1); i++){
            shouldSwitch = false;

            //Get the two elements we want to compare from the current and next row
            //In this case, we're getting the rank
            let currRow = rows[i].getElementsByTagName("TD")[0];
            let nextRow = rows[i].getElementsByTagName("TD")[0];

            //Check if the two elements should be switched. 
            //If so, mark as a switch and break the loop
            if(currRow.innerHTML > nextRow.innerHTML){
                shouldSwitch = true;
                break;
            }
        }

        //If a switch needs to be made, make the switch and repeat the while loop.
        if(shouldSwitch){
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            switching = true;
        }
    }
}
*/