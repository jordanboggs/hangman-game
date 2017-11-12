/*
 * H A N G M A N
 * An original game concept
 * By Jordan Boggs
 */

// Let's declare some global variables, y'all!!!!
// Scoreboard
var playerWins = 0;
var playerLosses = 0;

// Word bank for the RNG to pick from
var wordBank = ['garnet',
                'amethyst',
                'pearl',
                'steven',
                'greg'];

// number of guesses remaining for player
var guessesLeft = 12;

// Array of letters that player has already guessed
var wrongLetters = [];

// A variable that randomly picks a word from wordBank
var activeWord = wordBank[Math.floor(Math.random() * wordBank.length)];
console.log(activeWord);

// A function that creates an array of blanks based on the word 
// selection
function drawBlanks(wordSelection) {
  var underscoreArray = [];
  for (i = 0; i < wordSelection.length; i++) {
    underscoreArray.push("_");
  }
  return underscoreArray;
}

var playSpace = drawBlanks(activeWord);

// This function draws the playSpace array under #play-space
function drawPlaySpace(arr) {
  for (i = 0; i < arr.length; i++) {
    document.getElementById("play-space").innerHTML += arr[i];
  }
}

// Capture user's keypress
document.onkeyup = function(event) {
  var keyPress = event.key;
  checkLetter(activeWord, keyPress);
};

// Checks to see if a guess is correct
function checkLetter (wordSelection, playerGuess) {
  console.log("Word selection:",wordSelection);
  console.log("Player guess", playerGuess); 
  
  var doesItMatch = false;
  console.log("Does it match:",doesItMatch);

  for (i = 0; i < wordSelection.length; i++) {
    if (playerGuess === wordSelection[i]) {
      doesItMatch = true;
      playSpace[i] = playerGuess;
    }
  }  

  if (doesItMatch) {
    drawPlaySpace(playSpace);
  } else {
    guessesLeft--;
    choseWrong(playerGuess);
  }
}

// Function adds wrong letter to wrongLetters array and prints in 
// #wrong-letters id
function choseWrong(badGuess) {
  // Adds to wrongLetters array
  wrongLetters.push(badGuess);
  console.log(wrongLetters);
}
