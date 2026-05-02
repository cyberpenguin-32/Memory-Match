const gameboard=document.getElementById("gameBoard");
const movetext=document.getElementById("quadrilateral");
const restartBtn=document.getElementById("square");
const parallelogram=document.getElementById("parallelogram");
const rhombus=document.getElementById("rhombus");
const emojis=["🐶","🦊","🐧","🐔","🐶","🦊","🐧","🐔"];
let flippedCards=[];
let moves=0;
let matchedPairs=0;
let lockBoard=false;
let cards=[];
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
function createBoard() {
  gameBoard.innerHTML = "";
  cards = shuffle([...emojis]);
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  lockBoard = false;
  movetext.textContent = "Moves: 0";
  parallelogram.textContent="";
  rhombus.textContent="";

  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = "?";

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}
function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains("flipped") || this.classList.contains("matched")) return;
  if (flippedCards.length === 2) return;

  this.classList.add("flipped");
  this.textContent=this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    movetext.textContent = `Moves: ${moves}`;
    checkMatch();
  }
}
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    flippedCards = [];
    matchedPairs++;

    if (matchedPairs === emojis.length / 2) {
      parallelogram.textContent = `You win in ${moves} moves! 🎉`;
      if (moves==4){
        rhombus.textContent='Congratulations! You guessed everything right!🥳';
      }
      else if (moves==5){
        rhombus.textContent='Congrats! You were so close but so far.(to 4 moves)';
      }
      else if(moves==6){
        rhombus.textContent='Not bad! You are average among everyone else. '
      }
      else if(moves==7){
        rhombus.textContent='Well, you might have slight memory loss.'
      }
      else {
        rhombus.textContent='Amnesia alert! Amnesia alert! Amnesia alert!'
      }
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent="?";
      card2.textContent="?";
      flippedCards = [];
      lockBoard = false;
    }, 800);
  }
}
restartBtn.addEventListener("click",createBoard);
createBoard();