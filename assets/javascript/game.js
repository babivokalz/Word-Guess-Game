var spanWins = document.getElementById("wins");
var spanWord = document.getElementById("word");
var spanGuesses = document.getElementById("guesses");
var spanLetters = document.getElementById("letters");
var spanWarning = document.getElementById("warning");
var spanImage = document.getElementById("img");

var game = {
  wins: 0,
  lettersRight: [],
  lettersWrong: [],
  wordSecret: [],
  wordURL: "",
  wordGuessed: "",
  gameOver: false,
  numGuesses: 10,

  displayGame: function() {
    function formatWord(string) {
      var newString = "";
      for (var i = 0; i < string.length; i++) {
        newString += string[i] + "&nbsp;";
      }
      return newString;
    }

    spanWins.textContent = this.wins;
    spanWord.innerHTML = formatWord(this.wordGuessed);
    spanGuesses.textContent = this.numGuesses - this.lettersWrong.length;
    spanLetters.innerHTML = formatWord(this.lettersWrong);
    spanImage.innerHTML =
      '<img class="image" src="assets/images/' + this.wordURL + '"/>';
  },

  getWord: function() {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    var words = JSON.parse(djSymbols);
    var randomInt = getRandomInt(1, words.length - 1);

    this.wordSecret = words[randomInt].breed;
    this.wordURL = words[randomInt].image;
  },

  init: function() {
    this.gameOver = false;
    this.getWord();
    this.lettersRight = [];
    this.lettersWrong = [];
    this.wordGuessed = "";
    for (var i = 0; i < this.wordSecret.length; i++) {
      this.wordGuessed += this.wordSecret[i] != " " ? "_" : " ";
    }
  },

  checkGame: function() {
    if (this.wordGuessed == this.wordSecret) {
      this.wins++;
      this.gameOver = true;
    }

    if (this.lettersWrong.length >= this.numGuesses) {
      this.gameOver = true;
    }

    if (this.gameOver) {
      this.playGame();
    }
  },

  getGuess: function(input) {
    function isLetter(letter) {
      return letter.length === 1 && letter.match(/[a-z]/i);
    }

    var guessedLetter = "";

    if (isLetter(input)) {
      guessedLetter = input.toLowerCase();

      if (this.wordSecret.toLowerCase().indexOf(guessedLetter) != -1) {
        if (this.lettersRight.indexOf(guessedLetter) == -1) {
          this.lettersRight.push(guessedLetter);
        }
      } else {
        if (this.lettersWrong.indexOf(guessedLetter) == -1) {
          this.lettersWrong.push(guessedLetter);
        }
      }
      spanWarning.textContent = "";
    } else {
      spanWarning.textContent = "Please enter a letter!";
    }
  },

  updateGuess: function() {
    for (var iR = 0; iR < this.lettersRight.length; iR++) {
      for (var iW = 0; iW < this.wordSecret.length; iW++) {
        if (this.wordSecret[iW].toLowerCase() == this.lettersRight[iR]) {
          this.wordGuessed = this.wordGuessed.replaceAt(
            iW,
            this.wordSecret[iW]
          );
        }
      }
    }
  },
  playGame: function() {
    game.init();
    game.displayGame();

    document.onkeyup = function(event) {
      game.getGuess(event.key);
      game.updateGuess();
      game.displayGame();
      game.checkGame();
    };
  }
};

game.playGame();
