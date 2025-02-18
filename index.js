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

  let currentPlayer = "X";
  let winner = null;

  const $board = document.querySelector("#board");
  const $status = document.querySelector(".status");
  const $exitButton = document.querySelector(".exitButton");
  const $resetButton = document.querySelector(".resetButton");

  function generateSquares() {
    const wrapper = document.createDocumentFragment();
    for (let i = 0; i < 9; i++) {
      const square = document.createElement("div");
      square.setAttribute("data-index", i);
      wrapper.appendChild(square);
    }
    return wrapper;
  }

  function changeSquareValue(e) {
    if (e.target.parentElement.id === "board") {
      const divIndex = e.target.getAttribute("data-index");
      if (!squares[divIndex] && !winner) {
        squares[divIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus(`Player ${currentPlayer}'s turn`);
        checkWinner();
      }
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
        winner = currentPlayer;
        updateStatus(`Player ${winner} wins!`);
        $board.removeEventListener("click", changeSquareValue);
        return;
      }
    }

    if (squares.every((square) => square)) {
      updateStatus("It's a draw!");
    }
  }

  function exitGame() {
    resetBoard();
  }

  function resetBoard() {
    squares.fill(null);
    winner = null;
    currentPlayer = "X";
    updateStatus(`Player ${currentPlayer}'s turn`);
    generateBoard();
  }

  function startGame() {
    init();
    generateBoard();
    updateStatus(`Player ${currentPlayer}'s turn`);
  }

  function init() {
    $exitButton.addEventListener("click", exitGame);
    $resetButton.addEventListener("click", resetBoard);
  }

  function generateBoard() {
    $board.innerHTML = "";
    const $squares = generateSquares();
    $board.appendChild($squares);
    $board.addEventListener("click", changeSquareValue);
  }

  function updateStatus(statusText) {
    $status.textContent = statusText;
  }

  startGame();
})();
