let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function Playing() {
  const buttonElement = document.querySelector(".js-button-sub");
  if (buttonElement.innerHTML === "Playing") {
    buttonElement.innerHTML = "Auto Play";
    buttonElement.classList.remove("isPlaying");
  } else {
    buttonElement.innerHTML = "Playing";
    buttonElement.classList.add("isPlaying");
  }
  return buttonElement.innerHTML;
}
//Let just create Auto play function here
//so we can use setInterval() to run the play
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    //Because setInterval returns ID, we would use the id to stop the interval. we would creat a variable to store the setInterval
    //Remember every time it plays the game, it returns a different Id , so in other to save the last time ID, we will create the variable outside the function
    intervalId = setInterval(function () {
      //we need to provide this function with a playerMove
      const playerMove1 = pickComputerMove();
      playGame(playerMove1);
    }, 3000);
    isAutoPlaying = true;
    //now we use an else statement with a function called clear interval to stop the setInterval
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame(playerMove) {
  console.log(score);
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You lose.";
    } else if (computerMove === "Paper") {
      result = "You win.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You win.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You lose.";
    } else if (computerMove === "Scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins = score.wins + 1;
  } else if (result === "You lose.") {
    score.losses = +1;
  } else if (result === "Tie.") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `You
    <img src="Asset/${playerMove}-emoji.png" alt="Rock image" class="move-icon" />
    Computer
    <img
      src="Asset/${computerMove}-emoji.png"
      alt="Scissors image"
      class="move-icon"
    />
    `;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wines: ${score.wins}, losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber > 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}
