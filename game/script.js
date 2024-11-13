let player1Score = 0;
let player2Score = 0;
let isMultiplayer = false;
let difficulty = 'easy';
let player1PowerUp = null;
const delayTime = 2000; // 2 seconds delay

const MOVES = ["rock", "paper", "scissors", "lizard", "spock"];
const RULES = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"]
};

// Load sound elements
const moveSound = document.getElementById("move-sound");
const powerupSound = document.getElementById("powerup-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");

// Disable buttons during delay
function toggleButtons(enable) {
  document.querySelectorAll(".moves button").forEach(button => {
    button.disabled = !enable;
  });
}

// Initialize the game with a difficulty setting or multiplayer
function startGame(mode) {
  isMultiplayer = mode === 'multiplayer';
  difficulty = mode;
  resetScores();
}

// Reset scores and display them
function resetScores() {
  player1Score = 0;
  player2Score = 0;
  document.getElementById("player1-score").innerText = `Player 1: ${player1Score}`;
  document.getElementById("player2-score").innerText = `Player 2: ${player2Score}`;
}

// Player makes a move
function playerMove(player1Move) {
  // Play move sound
  moveSound.play();

  // Disable buttons during delay
  toggleButtons(false);

  let player2Move = isMultiplayer ? prompt("Player 2, enter your move:") : aiMove();
  if (MOVES.includes(player2Move)) {
    document.getElementById("result").innerText = `Player 1 chose ${player1Move}, Player 2 chose ${player2Move}.`;
    
    // Add delay before determining the winner
    setTimeout(() => {
      determineWinner(player1Move, player2Move);
      toggleButtons(true);  // Enable buttons after result is shown
    }, delayTime);
  } else {
    document.getElementById("result").innerText = "Invalid move by Player 2!";
    toggleButtons(true);  // Enable buttons if there's an error
  }
}

// AI generates a move based on difficulty
function aiMove() {
  if (difficulty === 'easy') {
    return MOVES[Math.floor(Math.random() * MOVES.length)];
  }
  // Hard AI could implement a strategy (e.g., countering the last player move)
  return MOVES[Math.floor(Math.random() * MOVES.length)];
}

// Determine the winner of the round
function determineWinner(player1Move, player2Move) {
  let resultText = "";
  if (player1Move === player2Move) {
    resultText = "It's a tie!";
  } else if (RULES[player1Move].includes(player2Move)) {
    player1Score++;
    winSound.play();  // Play win sound effect
    resultText = "Player 1 wins this round!";
  } else {
    player2Score++;
    loseSound.play();  // Play lose sound effect
    resultText = "Player 2 wins this round!";
  }
  
  updateScores(resultText);
}

// Update the scores and display the result
function updateScores(resultText) {
  document.getElementById("player1-score").innerText = `Player 1: ${player1Score}`;
  document.getElementById("player2-score").innerText = `Player 2: ${player2Score}`;
  document.getElementById("result").innerText = resultText;
}

// Activate a power-up for Player 1
function activatePowerUp(type) {
  player1PowerUp = type;
  powerupSound.play();  // Play power-up sound effect
  document.getElementById("result").innerText = `Player 1 activated ${type}!`;
}
