let player = {
    name: "Winnings",
    chips: 10,
    
    winChips: function() {
        player.chips += 10
    },
    
    loseChips: function() {
        player.chips -= 10
        if (player.chips < 0) {
            player.chips = 0
        }
    }
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")
let startEl = document.getElementById("start-el")
let hitEl = document.getElementById("hit-el")
let stayEl = document.getElementById("stay-el")
let isGameOver = true

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    
    if (isGameOver) {
        startEl.textContent = "---------------"
        hitEl.textContent = "HIT"
        stayEl.textContent = "STAY"
        isGameOver = false
        isAlive = true
        hasBlackJack = false
        cards = []
        dealerEl.textContent = "Dealer's Sum:"
        let message = "Want to play a round?"
        messageEl.textContent = message
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    }
    
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
        messageEl.textContent = message
    }
    
    if (sum > 20) {
        stay()
    }
    
}


function newCard() {
    if (isAlive && !hasBlackJack && !isGameOver) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function stay() {
    
    if (!isGameOver) {
        
        if (sum <= 20) {
            
            let dealerSum = Math.floor(Math.random() * 10) + 17
            dealerEl.textContent += " " + dealerSum
            
            if (sum <= dealerSum && dealerSum <= 21) {
                player.loseChips()
                message = "You lose!"
            } else {
                player.winChips()
                message = "You win!"
            }
        } else if (sum === 21) {
            player.winChips()
            message = "You win!"
        } else {
            player.loseChips()
            message = "You lose!"
        }
        
        messageEl.textContent = message
        playerEl.textContent = player.name + ": $" + player.chips
        
        isGameOver = true
        startEl.textContent = "START GAME"
        hitEl.textContent = "---------------"
        stayEl.textContent = "---------------"
    }
}
