(() => {
  const squares = new Array(9).fill(null);
  const winningSquares = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let playerA = null;
  let playerB = null;
  let currentPlayer = null;
  let winner = null;

  const $form = document.forms.playerForm;
  const $board = document.querySelector("#board");
  const $status = document.querySelector(".status");
  const $exitButton = document.querySelector(".exitButton");
  const $resetButton = document.querySelector(".resetButton");
  const $formContainer = document.querySelector(".playerForm");
  const $gameContainer = document.querySelector(".gameContainer");
  const $playerAScore = document.querySelector("#playerAScore");
  const $playerBScore = document.querySelector("#playerBScore");

  function generateSquares() {
    const wrapper = document.createDocumentFragment();
    for (let i = 0; i < 9; i++) {
      const square = document.createElement("div");
      square.setAttribute("data-index", i);
      wrapper.appendChild(square);
    }
    return wrapper;
  }

  function createPlayer(name, marker) {
    return {
      name,
      marker,
      score: 0,
    };
  }

  function changeSquareValue(e) {
    if (e.target.parentElement.id === "board") {
      const divIndex = e.target.getAttribute("data-index");
      if (!squares[divIndex] && !winner) {
        squares[divIndex] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWinner()) {
          winner = currentPlayer;
          updateStatus(`Player ${winner} wins!`);

          if (winner === playerA.marker) {
            updateScoreBoard($playerAScore, playerA);
          } else {
            updateScoreBoard($playerBScore, playerB);
          }
        } else if (checkDraw()) {
          updateStatus("It's a draw!");
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          updateStatus(`Player ${currentPlayer}'s turn`);
        }
      }
    }
  }

  function updateScoreBoard($player, player) {
    player.score++;
    $player.querySelector(".playerScore").textContent = player.score;
  }

  function checkDraw() {
    if (squares.every((square) => square)) {
      return true;
    }
  }

  function checkWinner() {
    for (let i = 0; i < winningSquares.length; i++) {
      const [a, b, c] = winningSquares[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return true;
      }
    }
    return false;
  }

  function exitGame() {
    resetBoard();
    $exitButton.removeEventListener("click", exitGame);
    $resetButton.removeEventListener("click", resetBoard);
    $board.removeEventListener("click", changeSquareValue);
    $formContainer.classList.remove("hidden");
    $gameContainer.classList.add("hidden");
    $form.reset();
  }

  function resetBoard() {
    squares.fill(null);
    winner = null;
    currentPlayer = playerA?.marker;
    updateStatus(`Player ${currentPlayer}'s turn`);
    generateBoard();
  }

  function startGame() {
    generateBoard();
    setUpListeners();
    updateStatus(`Player ${currentPlayer}'s turn`);
  }

  function setUpListeners() {
    $formContainer.classList.add("hidden");
    $gameContainer.classList.remove("hidden");
    $board.addEventListener("click", changeSquareValue);
    $exitButton.addEventListener("click", exitGame);
    $resetButton.addEventListener("click", resetBoard);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData($form);
    const nameA = formData.get("playerA");
    const nameB = formData.get("playerB");
    const markerA = formData.get("marker");
    playerA = createPlayer(nameA, markerA);
    playerB = createPlayer(nameB, markerA === "X" ? "O" : "X");
    currentPlayer = playerA?.marker;
    setUpScoreBoard($playerAScore, playerA);
    setUpScoreBoard($playerBScore, playerB);
    startGame();
  }

  function setUpScoreBoard($player, player) {
    $player.querySelector(".playerName").textContent = player.name;
    $player.querySelector(".playerScore").textContent = player.score;
    $player.querySelector(".markerLogo").textContent = player.marker;
  }

  function generateBoard() {
    $board.innerHTML = "";
    const $squares = generateSquares();
    $board.appendChild($squares);
  }

  function updateStatus(statusText) {
    $status.textContent = statusText;
  }

  function init() {
    $gameContainer.classList.add("hidden");
    $form.addEventListener("submit", handleFormSubmit);
  }

  init();
})();
