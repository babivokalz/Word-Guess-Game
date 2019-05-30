var spanWins = document.getElementById("wins");
var spanWord = document.getElementById("word");
var spanGuesses = document.getElementById("guesses");
var spanLetters = document.getElementById("letters");
var spanWarning = document.getElementById("warning");
var spanImage = document.getElementById("img");

var djSymbols = [
  { dj: "Alan Walker", image: "alan walker.jpg" },
  { dj: "Allison Wonderland", image: "allison wonderland.png" },
  { dj: "Bassnectar", image: "bassnectar.jpeg" },
  { dj: "Deadmaus", image: "deadmaus.jpg" },
  { dj: "Don Diablo", image: "don diablo.jpeg" },
  { dj: "Excision", image: "excision.jpg" },
  { dj: "Ghastly", image: "ghastly.png" },
  { dj: "Gryffin", image: "gryffin.jpeg" },
  { dj: "Illenium", image: "illenium.jpeg" },
  { dj: "Knife Party", image: "knife party.jpeg" },
  { dj: "Marshmello", image: "marshmello.jpg" },
  { dj: "Martin Garrix", image: "martin garrix.jpg" },
  { dj: "Odesza", image: "odesza.jpg" },
  { dj: "Porter Robinson", image: "porter robinson.png" },
  { dj: "Rezz", image: "Rezz.jpg" },
  { dj: "Said the Sky", image: "said the sky.png" },
  { dj: "Seven Lions", image: "seven lions.jpeg" },
  { dj: "Skrillex", image: "skrillex.jpg" },
  { dj: "Slander", image: "slander.jpg" },
  { dj: "Slushii", image: "slushii.jpg" },
  { dj: "Tiesto", image: "tiesto.jpg" },
  { dj: "Tritonal", image: "tritonal.png" },
  { dj: "Valentino Khan", image: "valentino khan.jpg" },
  { dj: "Yellow Claw", image: "yellow claw.png" },
  { dj: "Zhu", image: "zhu.jpeg" }
];

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
    console.warn("display ", new Date());
    function formatWord(string) {
      var newString = "";
      for (var i = 0; i < string.length; i++) {
        newString += string[i] + "&nbsp;";
      }
      return newString;
    }

    spanWins.textContent = game.wins;
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

    var words = djSymbols;
    console.log(djSymbols);
    var randomInt = getRandomInt(1, words.length - 1);
    this.wordSecret = words[randomInt].dj;
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
    const isLetter = !!(input && input.length === 1 && input.match(/[a-z]/i));

    if (isLetter) {
      const guessedLetter = input.toLowerCase();
      const isCorrectLetterGuess = this.wordSecret
        .toLowerCase()
        .includes(guessedLetter);
      if (isCorrectLetterGuess) {
        // Only push if the correct letter is not yet in the array.
        if (!this.lettersRight.includes(guessedLetter)) {
          this.lettersRight.push(guessedLetter);
        }
      } else {
        // Only push if the incorrect letter is not yet in the array.
        if (!this.lettersWrong.includes(guessedLetter)) {
          this.lettersWrong.push(guessedLetter);
        }
      }
      spanWarning.textContent = "";
    } else {
      spanWarning.textContent = "Please enter a letter!";
    }
  },

  updateGuess: function() {
    // Always reset this.wordGuessed.
    this.wordGuessed = "";
    for (var i = 0; i < this.wordSecret.length; i++) {
      const hasCorrectLetterGuessed = this.lettersRight.includes(
        this.wordSecret.charAt(i).toLowerCase()
      );
      if (hasCorrectLetterGuessed) {
        this.wordGuessed = this.wordGuessed + this.wordSecret.charAt(i);
      } else {
        this.wordGuessed = this.wordGuessed + "_";
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
