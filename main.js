// Get Player Name
function getPlayerName() { 
    let Name = window.prompt("Enter Your Name Please");
    return Name ? Name: "Unkown" // To Check If Player Doesn't Set Name
}


// Function To Flip Card After "delay"
function flipCards(Card, delay) {
    setTimeout(function() {
        Card.forEach(card => {
            card.classList.add("flip");
        }); 
    }, delay);
}


//  Function To Make Cards Take Random Positions
function makeRandom(Card) {
    Card.forEach(card => {
        let randomOrder = Math.floor(Math.random() * Card.length);
        card.style.order = randomOrder;
    });
}

function playSound() {
    let successSound = document.getElementById("successSound");
    successSound.play()
}
let score = 0;
function calcScore(nonFlippedCards, scoreDiv) {
    if (nonFlippedCards.length === 2) {
        let progLang1 = nonFlippedCards[0].getAttribute("prog-lang");
        let progLang2 = nonFlippedCards[1].getAttribute("prog-lang");

        if (progLang1 === progLang2) {
            nonFlippedCards.forEach(card => {
                card.style.backgroundColor = "#2ecc71";
                card.classList.add("Done");
            });
            playSound();
            console.log("Sief")
            score += 10;
            if (score == 100) {
               
            }
        }
        scoreDiv.innerText = `Score: ${score} / 100`;
    }
}

function clickCard(Card) {
    let clickCount = 0;
    let Counter = 0;
    let nonFlippedCards = [];
    
    Card.forEach(card => {
        card.onclick = function () {
            this.classList.toggle("flip");
            clickCount++;
            Counter ++;

            if (!this.classList.contains("flip")) {
                nonFlippedCards.push(this);
            }

            // ReFlip Card After Third Click
            if (clickCount == 3) {
                nonFlippedCards.forEach(card => {
                    card.classList.add("flip");
                });
                clickCount = 0;
                nonFlippedCards = [];
            }

            // Check If Cards Are Duplicated Or Not
            if (clickCount == 2) {
                let progLang1 = nonFlippedCards[0].getAttribute("prog-lang");
                let progLang2 = nonFlippedCards[1].getAttribute("prog-lang");

                if (progLang1 === progLang2) {
                    nonFlippedCards[0].style.backgroundColor = "#2ecc71";
                    nonFlippedCards[1].style.backgroundColor = "#2ecc71";
                    nonFlippedCards[0].classList.add("Done");
                    nonFlippedCards[1].classList.add("Done");
                    score += 10;
                }
                let scoreDiv = document.querySelector(".Score")
                scoreDiv.innerText = `Score: ${score} / 100`
            }
            
            let divClick = document.querySelector(".Click");
            divClick.innerText = `${Counter} Click`;
        }
    });
}

let timerInterval;
function updateTimer(startTime, timingDiv) {
    let currentTime = Math.floor(Date.now() / 1000);
    let elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / 3600);
    let minutes = Math.floor((elapsedTime % 3600) / 60);
    let seconds = elapsedTime % 60;

    hours   = (hours < 10 ? "0" : "")   + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    timingDiv.textContent = hours + ":" + minutes + ":" + seconds;

    // Stop the timer if the score is 100
    if (score === 100) {
        clearInterval(timerInterval);
        playSound();
    }
}


window.onload = function () {
    let helloDiv = document.querySelector(".Name"); 
    let Name = getPlayerName();
    helloDiv.innerText = `Hello ${Name}`;  // Set Hello Message 
    
    let Card = document.querySelectorAll(".Card");
    makeRandom(Card);
    flipCards(Card, 4000);
    clickCard(Card)
    
    let startTime = Math.floor(Date.now() / 1000);
    let timingDiv = document.querySelector('.Timing');
    
    timerInterval = setInterval(function() {
        updateTimer(startTime, timingDiv);
    }, 1000);
    
}
