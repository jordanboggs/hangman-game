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
var wordBank = ['garnet', 'amethyst',
                'pearl', 'steven',
                'greg', 'peridot', 
                'jasper', 'ruby', 
                'sapphire', 'sardonyx',
                'lars', 'connie',
                'stevonnie', 'ronaldo',
                'sadie', 'onion'];

// number of guesses remaining for player
var guessesLeft = 12;

// Array of letters that player has already guessed
var wrongLetters = [];

// Let's draw the wins, losses, and remaining guesses
function displayWins() {
  document.getElementById("player-wins").innerHTML = playerWins;
}
displayWins();

function displayLosses() {
  document.getElementById("player-losses").innerHTML = playerLosses;
}
displayLosses();

function displayGuesses() {
  document.getElementById("guesses-left").innerHTML = guessesLeft;
}
displayGuesses();

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

// playSpace is defined as an array of underscores that are the length of the word we randomly selected
var playSpace = drawBlanks(activeWord);

// This function draws the playSpace array under #play-space
function drawPlaySpace() {
  for (i = 0; i < playSpace.length; i++) {
    document.getElementById("play-space").innerHTML = playSpace.join(' ');
  }
}

// Ok friends let's put them on the board _ _ _ _ !
drawPlaySpace();

// Capture user's keypress
document.onkeyup = function(event) {
  var keyPress = event.key;
  // make it lowercase
  keyPress = keyPress.toLowerCase();
  // Check if it's valid
  var validCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  var isValid = false;
  for (i = 0; i < validCharacters.length; i++) {
    if (keyPress === validCharacters[i]) {
      isValid = true;
    }
  }
  if (isValid) {
    // Check if it's a repeat
    if (!isRepeat(keyPress)) {
      checkLetter(activeWord, keyPress);             
    } else {
      console.log("keyPress was repeat, letter not checked against activeWord");
    }
  }
}; // end keypress event

// Checks to see if a guess is correct
function checkLetter (wordSelection, playerGuess) {
  console.log("Word selection:",wordSelection);
  console.log("Player guess", playerGuess); 
  
  var doesItMatch = false;

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
    drawWrongLetters();        
    displayGuesses();                     
  }
} // end function

// Function adds wrong guess to wrongLetters array and prints in 
// #wrong-letters id
function choseWrong(badGuess) {
  // Adds to wrongLetters array
  wrongLetters.push(badGuess);
  console.log(wrongLetters);
}

// This puts the wrong letter array on the page
function drawWrongLetters() {
  for (i = 0; i < wrongLetters.length; i++) {
    document.getElementById("wrong-letters").innerHTML = wrongLetters;
  }
}

// This function will return letters that have not been guessed yet
function isRepeat(guess) {
  var repeatLetter = false;
  for (i = 0; i < playSpace.length; i++) {
    if (guess === playSpace[i]) {
      repeatLetter = true;
      console.log(guess + " is a correct repeat");
    } 
  }
  for (i = 0; i < wrongLetters.length; i++) {
    if (guess === wrongLetters[i]) {
      repeatLetter = true;
      console.log(guess + " is an incorrect repeat");
    }
  }
  return repeatLetter;
} // end function

/*
 * Here's what I still need to do:
 * 1. make guesses non-case sensitive                                   DONE
 * 2. repeat wrong guesses don't count                                  DONE
 * 3. only make wrong guesses count if they're letters                  DONE
 * 4. Something has to happen when you win                              
 * 5. Somethign has to happen when you lose                             
 * 6. You forgot to display how many guesses are left                   DONE
 * 7. You forgot to display wins and losses, the 0s do nothing          DONE
 */
