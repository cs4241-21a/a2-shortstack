let pCards = document.getElementById("pCards")
let cCards = document.getElementById("cCards")
let betAmount = document.getElementById("betAmount")
let playerMoneyText = document.getElementById("playerMoney")
let playerMoney = 100;
let pCardTotalText = document.getElementById("pCardTotal")
let cCardTotalText = document.getElementById("cCardTotal")
let pCardTotal = 0
let cCardTotal = 0
let gameButton = document.getElementById("gameButton")
let gameButtonLower = document.getElementById("gameButtonLower")
let betForm = document.getElementById("betForm")
let moneyVar = 0;
let gameMessage = document.getElementById("message")
let gameStatus = "none";
let helpStatus = "hidden";
let pCardArray = [];
let cCardArray = [];

function displayHelp() {
    let help = document.getElementById("helpText")
    if (helpStatus === "hidden") {
        help.style.visibility = "visible"
        helpStatus = "visible"
    } else if (helpStatus === "visible") {
        help.style.visibility = "hidden"
        helpStatus = "hidden"
    }
}

function startGame() {
    gameMessage.textContent = "How much money would you like to bet?"
    playerMoneyText.textContent = "Money: $" + playerMoney;
    gameStatus = "placeBets"
}

function placeBet() {
    if (gameStatus === "none") {
        gameMessage.textContent = "You need to start the game first!"
    } else if (betAmount.value === "") {
        gameMessage.textContent = "You need to bet money!"
    } else if (betAmount.value < 1) {
        gameMessage.textContent = "You must bet at least 1 dollar!"
    } else if (betAmount.value > playerMoney) {
        gameMessage.textContent = "You don't have enough money for that!"
        betAmount.value = "";
    } else {
        moneyVar = betAmount.value;
        gameMessage.textContent = "What would you like to do?" 
        playerMoney -= betAmount.value;
        playerMoneyText.textContent = "Money: $" + playerMoney;
        let card1 = randomCard();
        let card2 = randomCard();
        let card3 = randomCard();
        let card4 = randomCard();
        pCardArray = [card1, card2]
        cCardArray = [card3, card4]
        gameButton.setAttribute("onclick", "drawCard()")
        gameButton.textContent = "Draw Card"
        gameButtonLower.setAttribute("onclick", "holdCards()")
        gameButtonLower.textContent = "Hold Cards"
        betForm.style.visibility = "hidden";
        updateGame();
    }
}

function randomCard() {
    let card = Math.floor(Math.random() * 13) + 1
    if (card >= 11) {
        card = 10;
    } else if (card === 1) {
        card = 11;
    }
    console.log(card);
    return card;
}

function updateGame() {
    pCards.textContent = "Cards: "
    cCards.textContent = "Cards: "
    pCardTotal = 0;
    cCardTotal = 0;
    for (let i = 0; i < pCardArray.length; i++) {
        pCards.textContent += pCardArray[i] + " "
        pCardTotal += pCardArray[i]
    }
    for (let i = 0; i < cCardArray.length; i++) {
        cCards.textContent += cCardArray[i] + " "
        cCardTotal += cCardArray[i]
    }
    pCardTotalText.textContent = "Total Card Value: " + pCardTotal
    cCardTotalText.textContent = "Total Card Value: " + cCardTotal
    
    if (gameStatus === "holding") {
        if (cCardTotal > pCardTotal && cCardTotal <= 21) {
            gameMessage.textContent = "You Lost!"
            gameStatus = "playerLost"
        } else {
            gameMessage.textContent = "You Won!"
            gameStatus = "playerWon"
        }
    }
    
    if (pCardTotal === 21) {
        gameMessage.textContent = "You Won!"
        gameStatus = "playerWon"
    } else if (cCardTotal === 21) {
        gameMessage.textContent = "You Lost!"
        gameStatus = "playerLost"
    } else if (pCardTotal > 21) {
        gameMessage.textContent = "You Lost!"
        gameStatus = "playerLost"
    } else if (cCardTotal > 21 && pCardTotal < 21) {
        gameMessage.textContent = "You Won!"
        gameStatus = "playerWon"
    }

    if (gameStatus === "playerWon" || gameStatus === "playerLost") {
        endGame();
    }
    console.log("Game Updated")
}

function drawCard() {
    pCardArray.push(randomCard())
    cCardArray.push(randomCard())
    updateGame();
}
function holdCards() {
    gameStatus = "holding"
    gameMessage.textContent = "The computer draws a card..."
    setTimeout(function() {
        cCardArray.push(randomCard())
        updateGame();
    }, 2000)
}

function endGame() {
    if (gameStatus === "playerWon") {
        playerMoney += (moneyVar * 2);
        playerMoneyText.textContent = "Money: $" + playerMoney;
    }
    gameStatus = "none"
    gameButton.style.visibility = "hidden"
    gameButtonLower.style.visibility = "hidden"
    setTimeout(function () {
        gameMessage.textContent = "Resetting game..."
    }, 2000)
    setTimeout(function() {
        gameMessage.textContent = "Welcome to Blackjack! Press the Start Game button to begin!"
        gameButton.setAttribute("onclick", "startGame()")
        gameButton.textContent = "Start Game"
        gameButtonLower.setAttribute("onclick", "placeBet()")
        gameButtonLower.textContent = "Place Bet"
        gameButton.style.visibility = "visible"
        gameButtonLower.style.visibility = "visible"
        betForm.style.visibility = "visible"
        moneyVar = 0
        pCardArray.length = 0
        cCardArray.length = 0
        pCardTotal = 0
        cCardTotal = 0
        pCardTotalText.textContent = "Total Card Value: "
        cCardTotalText.textContent = "Total Card Value: "
        pCards.textContent = "Cards: "
        cCards.textContent = "Cards: "
    }, 5000)
}

const scoreDiv = document.querySelector("div.scores");
let tableHeaders = ["Name", "Gender", "Money", "Best Player?"]

function createScores() {
    
    while (scoreDiv.firstChild) scoreDiv.removeChild(scoreDiv.firstChild)

    let scoresTable = document.createElement('table')
    scoresTable.className = 'scoresTable'

    let scoresTableHead = document.createElement('thead')
    scoresTableHead.className = 'scoresTableHead'

    let scoresTableHeaderRow = document.createElement('tr') 
    scoresTableHeaderRow.className = 'scoresTableHeaderRow'

    tableHeaders.forEach(header => {
        let scoreHeader = document.createElement('th')
        scoreHeader.innerText = header
        scoresTableHeaderRow.append(scoreHeader)
    })

    scoresTableHead.append(scoresTableHeaderRow)
    scoresTable.append(scoresTableHead)

    let scoresTableBody = document.createElement('tbody')
    scoresTableBody.className = "scoresTable-Body"
    scoresTable.append(scoresTableBody)
    addScores();

    scoreDiv.append(scoresTable)
}

function appendScores(score) {
    const scoresTable = document.querySelector('.scoresTable')

    let scoresTableBodyRow = document.createElement('tr')
    scoresTableBodyRow.className = 'scoresTableBodyRow'

    let nameData = document.createElement('td')
    nameData.innerText = score.name

    let genderData = document.createElement('td')
    genderData.innerText = score.gender

    let moneyData = document.createElement('td')
    moneyData.innerText = score.money

    let bestPlayerData = document.createElement('td')
    bestPlayerData.innerText = score.isBestPlayer

    scoresTableBodyRow.append(nameData, genderData, moneyData, bestPlayerData)

    scoresTable.append(scoresTableBodyRow)
}


function addScores() {
    let highestValue = 0;
    fetch( 'test.json', {
        method:'GET',
        }).then (function(response) {
        let jsonObject = response.json()
        jsonObject.then(function (data) {
            for (let i = 0; i < data.scores.length; i++) {
                let parsedJSON = JSON.parse(data.scores[i])
                if (parsedJSON["money"] > highestValue) {
                    highestValue = parsedJSON["money"]
                }
            }
            for (let i = 0; i < data.scores.length; i++) {
                let parsedJSON = JSON.parse(data.scores[i])
                if (parsedJSON["money"] === highestValue) {
                    parsedJSON["isBestPlayer"] = true;
                }
                appendScores(parsedJSON)
            }
        })
    })
}

window.onload = function() {
   const button = document.querySelector( '#submitData' )
   button.onclick = makePost
   createScores()
   refreshChart()
}

function refreshChart() {
    setTimeout(function() {
        createScores();
        refreshChart();
    }, 3000)
}

const makePost = function(e) {
    e.preventDefault()
    let name = document.getElementById("nameBox");
    let money = document.getElementById("moneyBox");
    let genderOption = document.getElementById("genderBox");
    let gender = genderOption.options[genderOption.selectedIndex];
    const jsonObject = {
        "name": name.value,
        "money": parseInt(money.value),
        "gender": gender.value,
        "isBestPlayer": false
    }
    if (
        jsonObject["name"] === "" ||
        jsonObject["money"] === "" ||
        jsonObject["gender"] === "none"
        ) {
            window.alert("You have a missing field you need to fill out before submitting!");
        }
    else if (jsonObject["money"] !== playerMoney) {
        window.alert("Your money input must match your actual money value before submitting!")
    }
    else {
        fetch( '/submit', {
            method:'POST',
            body: JSON.stringify(jsonObject),
          })
          .then( function(response) {
              createScores();
              name.value = "";
              money.value = "";
              genderOption.value = "none";
              console.log(response)
        })
    }
}
