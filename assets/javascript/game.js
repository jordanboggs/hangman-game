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
var guessesLeft = 8;

// Array of letters that player has already guessed
var wrongLetters = [];

// Let's draw the wins, losses, and remaining guesses
function updateDisplay(arg) {
  if (arg === "wins") {
    document.getElementById("player-wins").innerHTML = playerWins;
  } else if (arg === "losses") {
    document.getElementById("player-losses").innerHTML = playerLosses;
  } else if (arg === "guesses") {
    document.getElementById("guesses-left").innerHTML = guessesLeft;
  } else {
    console.log("invalid updateDisplay argument");
  }
} // end function
updateDisplay("wins");
updateDisplay("losses");
updateDisplay("guesses");

document.getElementById("su-default").style.display = "block";

// A variable that randomly picks a word from wordBank
var activeWord = chooseWord();

function chooseWord() {
  newWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  console.log(newWord);
  return newWord;
}

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
    checkWin();                       
  } else {                                        
    guessesLeft--;  
    // displayGuesses();  
    updateDisplay("guesses");                            
    choseWrong(playerGuess);                       
    drawWrongLetters();
    checkLoss();                       
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

// This function checks playSpace array for underscores. No underscores = win
function checkWin() {
  var winCondition = playSpace.length;
  for (i=0; i<playSpace.length; i++) {
    if (playSpace[i] != "_") {
      winCondition--;
      console.log("Spaces left: " + winCondition);
    } else {
      console.log("Spaces left: " + winCondition);
    }
  }
  if (winCondition === 0) {
    // wins increases by 1
    playerWins++;
    // displayWins();
    updateDisplay("wins");
    
    // update .hero-image
    var heroImages = document.getElementsByClassName('hero-image');
    
    for(var i = 0; i != heroImages.length; ++i)
    {
    heroImages[i].style.display = "none";
    }

    var newImage = document.getElementById(activeWord);newImage.style.display = "block";

    // Reset the game
    resetGame();
  } else {
    console.log("No win yet");
  }
} // end function

function checkLoss() {
  if (guessesLeft <= 0) {
    // Losses increases by 1
    playerLosses++;
    // displayLosses();
    updateDisplay("losses");

    // Reset the game
    resetGame();
  } else {
    console.log("No loss yet");
  }
}

function resetGame() {
  // guesses remaining resets
  guessesLeft = 8;
  // displayGuesses();
  updateDisplay("guesses");
  // a new word is chosen
  activeWord = chooseWord();
  // new blanks are drawn
  playSpace = drawBlanks(activeWord);
  drawPlaySpace();
  // bank of guessed letters resets to empty
  wrongLetters = [];
  document.getElementById('wrong-letters').innerHTML = wrongLetters;
}

/*
 * Here's what I still need to do:
 * 1. make guesses non-case sensitive                                   DONE
 * 2. repeat wrong guesses don't count                                  DONE
 * 3. only make wrong guesses count if they're letters                  DONE
 * 4. Something has to happen when you win                              DONE
 *    a. wins increases by 1                                            DONE
 *    b. a song plays?               nah I think that's annoying so   NOT DONE                                                 
 *    c. guesses remaining resets                                       DONE
 *    d. new word is chosen                                             DONE
 *    e. new blanks are drawn                                           DONE
 *    f. bank of guessed letters resets to empty                        DONE
 * 5. Somethign has to happen when you lose                             DONE  
 *    a. losses increases by 1                                          DONE
 *    b. guesses remaining resets                                       DONE
 *    c. new word is chosen                                             DONE
 *    d. new blanks are drawn                                           DONE
 *    e. bank of guessed letters resets to empty                        DONE
 * 6. You forgot to display how many guesses are left                   DONE
 * 7. You forgot to display wins and losses, the 0s do nothing          DONE
 */
