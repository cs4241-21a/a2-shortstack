// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 2!")

//function
//request that just gives me data
//have edit function return data as well


function addData(appdata){
    let addedName = document.getElementById("player-name");
    let addedScore = document.getElementById("player-score");
    //let table = document.getElementById("game-leaderboard");

    let addedRank;
    let currentScore;
    let isRankPlaced;
    for(let i = 1; i < appdata.length; i++){
        if(!isRankPlaced){
            currentScore = appdata[i].rank;

            //Check to see if the new score exceeds the analyzed score
            if(addedScore.innerHTML > currentScore){
                //If it does
                // -give the current rank to the added rank 
                // -lower the added rank
                addedRank = i;
                appdata[i].rank += 1;
            }
        } else {
            //Lower the rank of the other appdata 
            appdata[i].rank += 1;
        }
        
    }

    //Push the new data to appdata and then sort the appdata
    appdata.push([addedRank, addedName, addedScore]);
    appdata.sort((a, b) => {
        return a.rank - b.rank;
    });
}

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