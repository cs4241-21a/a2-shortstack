window.onload = function() {
  const button = document.querySelector('#submitButton')
  button.onclick = submit
}

const submit = function( e ) {
  // prevent default form action from being carried out
  e.preventDefault()

  const username = document.querySelector( '#username' ),
        balance = document.querySelector( '#balance' ),
        wins = document.querySelector( '#wins' ),
        losses = document.querySelector( '#losses' ),
        initialBalance = document.querySelector( '#initialBalance' )
  if (!username.value) { username.value = "none" }
  if (!balance.value) { balance.value = "none" }
  if (!wins.value) { wins.value = "none" }
  if (!losses.value) { losses.value = "none" }
  if (!initialBalance.value) { initialBalance.value = "none" }
  const user = username.value
  const bal = balance.value

  const json = { username: username.value, balance: balance.value, wins: wins.value, 
                losses: losses.value, initialBalance: initialBalance.value },
        body = JSON.stringify( json )

  fetch( '/submit', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // do something with the reponse 
    return response.json()
  })
  .then( function( json ) {
    let newJson = sortByBalance(json)
    deleteTable()
    createTable(newJson)
    if (loggedIn && currentUser.username === user) {
      updateWallet(parseInt(parseInt(bal)))
    }
    console.log(currentUser.username + " " + user)
  })

  return false
}
function signIn() {
  const input = document.getElementById("loginField"),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  fetch( '/signIn', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // do something with the reponse 
    return response.json()
  })
  .then( function( json ) {
    if (json.username === input.value) {
      loginUser(json)
    }
  })

  return false
}

function updateAccount(username, bet, win) {
  const json = { "username": username, "bet": bet, "win": win },
        body = JSON.stringify( json )

  fetch( '/updateAccount', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // do something with the reponse
    return response.json()
  })
  .then( function( json ) {
    let newJson = sortByBalance(json)
    deleteTable()
    createTable(newJson)
  })
}

function refreshTable() {
  const json = { "test": 1 }
  body = JSON.stringify( json )

  fetch( '/refreshTable', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // do something with the reponse
    return response.json()
  })
  .then( function( json ) {
    let newJson = sortByBalance(json)
    deleteTable()
    createTable(newJson)
  })
  
}

  function submitBet() {
    if (playingState === "Waiting" || playingState === "GameOver") {
      if (parseInt(document.getElementById("bet").value) <= wallet) {
        currentBet = parseInt(document.getElementById("bet").value)
        playHand()
      }
    }
  }

refreshTable()
console.log("Welcome to assignment 2!")

const suits = ["spades", "diams", "clubs", "hearts"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let currentHand = 0
let currentDealerHand = 0
let previousCards = ""
const SUIT = 0, VALUE = 1
let playingState = "Waiting"
let wallet = 1000;
let currentBet = 10;
let loggedIn = false
let currentUser = ""

function initialize() {
  currentHand = 0
  currentDealerHand = 0
  previousCards = ""
  playingState = "Waiting"
  invisibleButtons()
  document.getElementById("curValue").style.color = "black"
  document.getElementById("dealerHand").style.color = "black"
  document.getElementById("dealerHand").innerText = "Dealer's Hand: " + 0
  document.getElementById("gameStatus").innerText = "WAITING"
  document.getElementById("gameStatus").style.color = "black"
  document.getElementById("curValue").innerText = "Current Hand: " + 0

}

function playHand() {
  initialize()
  dealCards()
  visibleButtons()
  playingState = "PlayerChoice"
  document.getElementById("gameStatus").innerText = "PLAYING"
}

function dealCards() {
  deleteCards()
  let firstCard = randomCard()
  addCard("player", firstCard[VALUE], firstCard[SUIT])
  let secondCard = randomCard()
  addCard("player", secondCard[VALUE], secondCard[SUIT])
  currentHand += getCardValue(firstCard[VALUE]) + getCardValue(secondCard[VALUE])
  document.getElementById("curValue").innerText = "Current Hand: " + currentHand
  let firstDealerCard = randomCard()
  addCard("dealer", firstDealerCard[VALUE], firstDealerCard[SUIT])
  currentDealerHand = getCardValue(firstDealerCard[VALUE])
  document.getElementById("dealerHand").innerText = "Dealer's Hand: " + currentDealerHand
}

function randomCard() {
  let randomCard = values[Math.floor(Math.random() * 13)]
  let randomSuit = getSuitValue(Math.floor(Math.random() * 4))
  let newCard = [randomSuit, randomCard]
  return newCard
}

function invisibleButtons() {
  document.getElementById("hit").style.visibility = "hidden"
  document.getElementById("stand").style.visibility = "hidden"
}

function visibleButtons() {
  document.getElementById("hit").style.visibility = "visible"
  document.getElementById("stand").style.visibility = "visible"
}

function getCardValue(card) {
  switch(card) {
    case "A":
      return 1
    case "J":
      return 10
    case "Q":
      return 10
    case "K":
      return 10
    default:
      return parseInt(card)
  }
}

function getSuitValue(card) {
      return suits[card]
}

function hit() {
  if (playingState == "PlayerChoice") {
    let newCard = randomCard()
    addCard("player", newCard[VALUE], newCard[SUIT])
    currentHand += getCardValue(newCard[VALUE])
    document.getElementById("curValue").innerText = "Current Hand: " + currentHand
    if (currentHand > 21) {
      document.getElementById("curValue").style.color = "red"
      playingState = "Busted"
      loss()
    }
  }
}

function stand() {
  if (playingState == "PlayerChoice") {
    playingState = "DealerTurn"
    dealerCards()
  }
}

function dealerCards() {
  let secondCard = randomCard()
  addCard("dealer", secondCard[VALUE], secondCard[SUIT])
  currentDealerHand += getCardValue(secondCard[VALUE])
  while (currentDealerHand < 17) {
    let thirdCard = randomCard()
    addCard("dealer", thirdCard[VALUE], thirdCard[SUIT])
    currentDealerHand += getCardValue(thirdCard[VALUE])
  }
  document.getElementById("dealerHand").innerText = "Dealer's Hand: " + currentDealerHand
  if (currentDealerHand > 21) {
    document.getElementById("dealerHand").style.color = "red"
    win()
  }
  else if (currentDealerHand > currentHand) { loss() }
  else if (currentDealerHand < currentHand) { win() }
  else { tie() }
}

function addToWallet(amount) {
  wallet += amount;
  updateWallet(wallet)
}

function subtractFromWallet(amount) {
  wallet -= amount;
  updateWallet(wallet)
}

function updateWallet(amount) {
  document.getElementById("wallet").innerText = "Wallet: " + amount
}

function win() {
  document.getElementById("gameStatus").innerText = "WIN"
  document.getElementById("gameStatus").style.color = "#90fc03"
  addToWallet(currentBet)
  playingState = "GameOver"
  if (loggedIn) {
    updateAccount(currentUser.username, currentBet, true)
  }
}

function loss() {
  document.getElementById("gameStatus").innerText = "LOSS"
  document.getElementById("gameStatus").style.color = "red"
  subtractFromWallet(currentBet)
  playingState = "GameOver"
  if (loggedIn) {
    updateAccount(currentUser.username, currentBet, false)
  }
}

function tie() {
  document.getElementById("gameStatus").innerText = "TIE"
  document.getElementById("gameStatus").style.color = "yellow"
  playingState = "GameOver"
}

function loginUser(user) {
  wallet = parseInt(user.balance)
  updateWallet(wallet)
  document.getElementById("loginStatus").innerText = "Signed in as: " + user.username
  document.getElementById("signOutButton").style.visibility = "visible"
  initialize()
  loggedIn = true
  currentUser = user
}

function logoutUser() {
  wallet = 1000
  updateWallet(wallet)
  document.getElementById("loginStatus").innerText = ""
  document.getElementById("signOutButton").style.visibility = "hidden"
  initialize()
  loggedIn = false
  currentUser = ""
}

function createTable(json) {
  const table = document.querySelector('table')
  const tableBody = table.querySelector('tbody')
  for (let i = 0; i < json.length; i++) {
    let tableRow = document.createElement('tr')
    tableRow = colorRow(tableRow, i)
    tableBody.appendChild(tableRow)
    let username = document.createElement('th')
    tableRow.appendChild(username)
    username.innerText = json[i].username
    let balance = document.createElement('th')
    tableRow.appendChild(balance)
    balance.innerText = json[i].balance
    let wins = document.createElement('th')
    tableRow.appendChild(wins)
    wins.innerText = json[i].wins
    let losses = document.createElement('th')
    tableRow.appendChild(losses)
    losses.innerText = json[i].losses
    let netProfit = document.createElement('th')
    tableRow.appendChild(netProfit)
    netProfit.innerText = json[i].netProfit
    let initialBalance = document.createElement('th')
    tableRow.appendChild(initialBalance)
    initialBalance.innerText = json[i].initialBalance
  }
}

function deleteTable() {
  const table = document.querySelector('table')
  const tableBody = table.querySelector('tbody')
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.lastChild)
  }
}

function sortByBalance(json) {
  let newJson = []
  let iLength = json.length
  for (let i = 0; i < iLength; i++) {
    let highestBalance = 0
    let highestIndex = 0
    for (let j = 0; j < json.length; j++) {
      if (json[j].balance > highestBalance) {
        highestBalance = json[j].balance
        highestIndex = j
      }
    }
    newJson.push(json[highestIndex])
    json.splice(highestIndex, 1)
  }
  return newJson
}

function colorRow(row, index) {
  if (index === 0) {
    row.style.backgroundColor = "gold"
  }
  else if (index === 1) {
    row.style.backgroundColor = "silver"
  }
  else if (index === 2) {
    row.style.backgroundColor = "#CD7F32"
  }
  return row
}

function deleteCards() {
  const playerCards = document.getElementById("playerCards")
  const dealerCards = document.getElementById("dealerCards")
  while (playerCards.firstChild) {
    playerCards.removeChild(playerCards.lastChild)
  }
  while (dealerCards.firstChild) {
    dealerCards.removeChild(dealerCards.lastChild)
  }
}

function addCard(player, value, suit) {
  if (player === "player") {
    side = document.getElementById("playerCards")
  }
  else if (player === "dealer") {
    side = document.getElementById("dealerCards")
  }
  else { return }
  let divClass = document.createElement("div")
  let spanRank = document.createElement("span")
  let spanSuit = document.createElement("span")
  divClass.setAttribute("class", "card rank-7 " + suit)
  side.appendChild(divClass)
  spanRank.setAttribute("class", "rank")
  spanSuit.setAttribute("class", "suit")
  spanRank.innerText = value
  spanSuit.innerHTML = "&" + suit + ";"
  divClass.appendChild(spanRank)
  divClass.appendChild(spanSuit)
}