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
  for (i = 0; i < validCharacters.length; i++) {
    if (i === validCharacters[i]) {
      // Check if it's a repeat
      if (!isRepeat(keyPress)) {
        checkLetter(activeWord, keyPress);                // Let's check to see if the guess was correct by comparing the Word to the keypress    
      } else {
        // the function already logs that it was a repeat
      }
    } else {
      console.log("Character not valid");
    }
  }
};

// Checks to see if a guess is correct
function checkLetter (wordSelection, playerGuess) {
  console.log("Word selection:",wordSelection);
  console.log("Player guess", playerGuess); 
  
  var doesItMatch = false;

  for (i = 0; i < wordSelection.length; i++) {      // for every character in the word, do this:
    if (playerGuess === wordSelection[i]) {         // if the player's guess is the same as the (1st, 2nd, 3rd, etc.) character of the word:
      doesItMatch = true;                           // mark it as true
      playSpace[i] = playerGuess;                   // (1st, 2nd, 3rd, etc.) character is set to be the player's guess
    }                                                  // i.e., this is filling in the blank
  }  

  if (doesItMatch) {                                // if it does match
    drawPlaySpace(playSpace);                       // write it on the screen
  } else {                                          // otherwise
    guessesLeft--;                                  // you have one less guess
    choseWrong(playerGuess);                        // and we add it to the wrong guess array
    drawWrongLetters();                             // and then we print the array on the screen (It looks like we're printing one additional letter)
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
 * 1. make guesses non-case sensitive
 * 2. repeat wrong guesses don't count                                  DONE
 *    don't count = don't reduce score and don't decrease guesses left
 * 3. only make wrong guesses count if they're letters
 * 4. Something has to happen when you win
 * 5. Somethign has to happen when you lose
 */
