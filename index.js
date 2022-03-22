var programming_languages = [
  "python",
  "assembly",
  "cobol",
  "javascript",
  "mongodb",
  "react",
  "json",
  "java",
  "html",
  "css",
  "csharp",
  "basic",
  "php",
  "sql",
  "verilog",
  "vhdl"
]

let answer = '';
let guesses = 10;
let guessed = [];
let wordStatus;
let currentLetter;

//select a random word
function randomWord() {
  answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
  console.log(answer);
  
  //display an asterisk for each letter
  let array = new Array(answer.split('').length).fill('*');
  document.getElementById('wordSpotlight').innerHTML = array.join('');
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    msg(currentLetter + ' does not appear', 'error');
    guesses--;
    updateGuesses();
    checkIfGameLost();
  }
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    msg('Wow You are good!!!', 'success');
    finishedGame()
  }
}

function checkIfGameLost() {
  if (guesses === 0) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    msg('You Lost!!!', 'error');
    finishedGame()
  }
}

//remove line "what is your guess?" and input 
function finishedGame(){
  document.getElementById("guessInput").remove();
  document.getElementById("guessLine").remove();
}

//the guess is not case sensitive
function guessedWord() {
  const arr = answer.split('');
  let gueessedCount = arr.reduce((i, x) =>  x === currentLetter.toLowerCase() ? i + 1 : i + 0 , 0);
  document.getElementById('wordSpotlight').innerHTML = arr.map(letter => (guessed.indexOf(letter) >= 0 ? letter : "*")).join('');

  let appeared;
  if (gueessedCount === 1) appeared = currentLetter + ' appeards only once';
  if (gueessedCount === 2) appeared = currentLetter + ' appears twice';
  if (gueessedCount > 2) appeared = currentLetter + ' appears ' + gueessedCount;


  const data = 'user guessed ' + currentLetter + '\n' + appeared

  msg(data, 'success');
  document.getElementById('guessInput').value = '';
  wordStatus = document.getElementById('wordSpotlight').innerHTML;
}

function updateGuesses() {
  document.getElementById('guesses').innerHTML = guesses;
}

function reset() {
  guesses = 10;
  guessed = [];

  randomWord();
  guessedWord();
  updateGuesses();
}

function keyUphandler(e) {

  if (!e.target.value.length) {
    msg('');
    return;
  }

  
  if (e.target.value.length > 1) {
    msg('Please enter only one letter', 'error');
    return;
  }

  // error message to special signs and numbers
  if (![8, 46].includes(e.keyCode) && (e.keyCode < 65 || e.keyCode > 90)) {
    msg('The guess is invalid', 'error');
    e.target.value = '';
    return;
  }

  // ignore backspace and delete
  if(![8, 46].includes(e.keyCode)) {
    currentLetter = e.target.value;
    handleGuess(e.target.value.toLowerCase());
  }
}

//different messages in cases of success and errors
function msg(msg, type = '') {

  document.getElementById('msg').classList.remove("success", "error");

  switch(type) {
    case 'success':
      document.getElementById('msg').classList.add("success");
      document.getElementById('msg').value = msg;
      break;
      case 'error':
        document.getElementById('msg').classList.add("error");
        document.getElementById('msg').value = msg;
        break;
    default: 
      document.getElementById('msg').innerHTML = '';

  }
  document.getElementById('msg').innerHTML = msg;
}

document.getElementById('guesses').innerHTML = guesses;

randomWord();
