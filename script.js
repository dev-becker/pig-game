"use strict";
const firstPlayerScore = document.querySelector("#score--1");
const secondPlayerScore = document.querySelector("#score--2");
const firstPlayerField = document.querySelector(".player--1");
const secondPlayerField = document.querySelector(".player--2");
const diceCube = document.querySelector(".dice");
const newGameButton = document.querySelector(".btn--new");
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

rollDiceButton.addEventListener("click", genRandomDice);
holdButton.addEventListener("click", updateTotalScores);
newGameButton.addEventListener("click", refreshGame);
window.addEventListener("DOMContentLoaded", refreshGame);

let totalScores, currentScore, activePlayer, playing;

function genRandomDice () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceCube.classList.remove("hidden");
        diceCube.src = `dice-${dice}.png`

        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
}

function updateTotalScores () {
    if (playing) {
        totalScores[activePlayer - 1] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer - 1];

        if (totalScores[activePlayer -1] >= 100) {
            diceCube.classList.add("hidden");
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            switchPlayer();
        }
    }
}

function switchPlayer () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 2 : 1;
    firstPlayerField.classList.toggle("player--active");
    secondPlayerField.classList.toggle("player--active");
}

function refreshGame () {
    totalScores = [0, 0];
    currentScore = 0;
    activePlayer = 1;
    playing = true;
    firstPlayerScore.textContent = 0;
    secondPlayerScore.textContent = 0;
    document.querySelector("#current--1").textContent = 0;
    document.querySelector("#current--2").textContent = 0;
    firstPlayerField.classList.add("player--active");
    document.querySelector(".player--1").classList.remove("player--winner");
    document.querySelector(".player--2").classList.remove("player--winner");
}
