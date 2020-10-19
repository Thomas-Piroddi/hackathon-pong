
// following youtube tutorial on an online multiplayer game

let gameMode = ""

let playerNumber = 0

let ready = false

let enemyReady = false

let allShipsPlaced = false

let shotFired = -1

const socket = io()

// get your player number

socket.on('player-number', num => {
    if (num === -1) {
        infoDisplay.innerHTML = "sorry, the server is full"
    } else {
        playerNum = parseInt(num)
        if (playerNumber === 1) currentPlayer = "enemy"
    }
})