const dataTable = document.getElementById('Leaderboard');
const gameCanvas = document.getElementById('gameCanvas');

let rowNum = 1;

const submit = function( e ) {
    e.preventDefault()

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
        /*.then( function( json) {
          // options for loops
           if( Array.isArray(json)){
             //json.map( car => car.model)
             //json.map( model => model[0].toUpperCase() + model.slice(1))
             //json.forEach(console.log)

             for( let car of json){
               const model = car.model
               const upperModel = model[0].toUpperCase() + model.slice(1)
               console.log( upperModel)
             }

             //for(let i =0; j < json.length; i++){
              // const car = json [i]
               //const model = car.model
               //const upperModel = model[0].toUpperCase() + model.slice(1)
               //console.log( upperModel)

           }
        })*/
        .then( function( json ) {
            console.log(json);
            insertData(json);
        })

    return false
}
function insertData(json){
    // creating table row elements
    let tableRow = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    let pencil = document.createElement('i');
    pencil.id = `pencil${rowNum}`;
    pencil.innerHTML = "&#x270F";
    /*pencil.onclick = function (elt) {
            editPencil(pencil, row);
            elt.preventDefault();
            return false;
        };*/
    let cross = document.createElement('i');
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

    //Adding values to table row
    td1.innerText = json.yourname;
    td2.innerText = json.score;
    td3.innerText = json.rank;
    td4.appendChild(pencil);
    td5.appendChild(cross);

    tableRow.appendChild(td1);
    tableRow.appendChild(td2);
    tableRow.appendChild(td3);
    tableRow.appendChild(td4);
    tableRow.appendChild(td5);
    dataTable.appendChild(tableRow);
    tableRow.className = `class${rowNum}`;
    rowNum++;
}

function popTable() {

    for(let json of existingTable){
        insertData(json);
    }
}//unfinished

function getData(){
    fetch('/appData', {
        method: 'GET'
    })
        .then(res => {return res.json()})
        .then(data => console.log(data) )
}

///////////////////////////
window.onload = function() {
    getData();
    let submitBtn = document.getElementById( 'submitBtn' );
    submitBtn.onclick = submit;
}
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
