const dataTable = document.getElementById('Leaderboard');
const gameCanvas = document.getElementById('gameCanvas');
let submitBtn = document.getElementById( 'submitBtn' );

window.onload = function() {
    makeTableHead();
    updatePage();
    submitBtn.onclick = submit;
}

const submit = function( e ) {
    e.preventDefault()
    /*/let warning = document.getElementById('warning');

    if (jsonBody['score'] === 0
        || jsonBody['name'] === "your name here") {
        //warning.innerHTML = "Please change name and score points";
    } else {
        //warning.innerHTML = "";*/
    const input = document.querySelector( '#yourname' ),
        input2 = document.getElementById('printScore'),
        json = { yourname: input.value,
            score: input2.innerText,
            rank: "" },
        body = JSON.stringify( json )

    fetch( '/submit', {
        method:'POST',
        body
    })
        .then( function( response ) {
            // do something with the response
            console.log("Post made to server");
        })
        .then( function( json ) {
            console.log(json);
            updatePage();
        })
    return false
}

let count = 3;

let appdata;
const createNode = function (elt) {
    return document.createElement(elt);
};

const makeTableHead = function () {
    let th1 = createNode('th');
    let th2 = createNode('th');
    let th3 = createNode('th');
    let th4 = createNode('th');
    let th5 = createNode('th');
    th1.innerHTML = 'Name';
    th2.innerHTML = 'Score';
    th3.innerHTML = 'Rank';
    th4.innerHTML = "Edit";
    th5.innerHTML = "Report";
    let tableRow = createNode('tr');
    tableRow.appendChild(th1);
    tableRow.appendChild(th2);
    tableRow.appendChild(th3);
    tableRow.appendChild(th4);
    tableRow.appendChild(th5);
    dataTable.appendChild(tableRow);
}; // working

//Edit Function
/*const editPencil = function (pencil, row) {
    modifyIndex = pencil.id[6];
    rightHeader.innerHTML = "Modify Information";
    submitBtn.innerHTML = "Update";
    document.getElementById('yourname').value = row.name;
}*/


//Updates page.
const updatePage = function () {
    fetch('/updatePage', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        appdata = json;
        dataTable.innerHTML = "";
        makeTableHead();
        let rowNum = 1;
        appdata.map(function (row) {
            let tableRow = createNode('tr');
            let td1 = createNode('td');
            let td2 = createNode('td');
            let td3 = createNode('td');
            let td4 = createNode('td');
            let td5 = createNode('td');

            let pencil = createNode('i');
            pencil.id = `pencil${rowNum}`;
            pencil.innerHTML = "&#x270F";
            /*pencil.onclick = function (elt) {
                editPencil(pencil, row);
                elt.preventDefault();
                return false;
            };*/
            let cross = createNode('i');
            cross.id = `cross${rowNum}`;
            cross.innerHTML = "&#x274C";
            /*cross.onclick = function (elt) {
                let body = cross.id;
                fetch('/delete', {
                    method: 'POST',
                    body
                }).then(function (response) {
                    console.log("Delete post sent to server: " + response);
                    updatePage();
                    //count--;
                });
                elt.preventDefault();
                return false;
            };*/

            td1.innerHTML = row.yourname;
            td2.innerHTML = row.score;
            td3.innerHTML = row.rank;
            td4.appendChild(pencil);
            td5.appendChild(cross);

            tableRow.appendChild(td1);
            tableRow.appendChild(td2);
            tableRow.appendChild(td3);
            tableRow.appendChild(td4);
            tableRow.appendChild(td5);
            dataTable.appendChild(tableRow);
            tableRow.className = rowNum;
            rowNum++;
        });
        sortTable();
        myGameArea.clear();
    });
    console.log("Count = "+count);
    fetch('/updatePage', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        appdata = json;
        console.log("APPDATA ON UPDATE = " + appdata.length);
        console.log("APPDATA VALUE\n" + JSON.stringify(appdata));
        count = appdata.length;
        console.log("COUNT ON UPDATE = " + count);
    });
};
updatePage();

let inputSelect;
let modifyIndex = 0;
//Makes page body.
const makePageBody = function () {
    const name = document.getElementById('yourname');
    const score = document.getElementById('printScore');
    const json = {
        name: name.value,
        score: score.value,
        rank: 0,
        modifyIndex
    };
    return JSON.stringify(json);
};

//////////////////////////////////////////

let myGamePiece;
let myObstacles = [];
let myScore;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = document.getElementById('printScore');
    myGameArea.start();
}

let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        gameCanvas.appendChild(this.canvas);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        let ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        let rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.hitTop = function() {
        let heightLimit = 0;
        if (this.y <= heightLimit){
            this.y = heightLimit;
            this.gravitySpeed = 0.25;
        }
    }
    this.crashWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo === 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (let i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    //myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.innerText = myGameArea.frameNo;
    //myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    return (myGameArea.frameNo / n) % 1 === 0;

}

function accelerate(n) {
    myGamePiece.gravity = n;
}

//////////////////////////////////////////////

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("Leaderboard");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            //check if the two rows should switch place:
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
