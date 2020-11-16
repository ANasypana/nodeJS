import { GameObject } from './scripts/GameObject.js';

const btnStart = document.getElementById('start');
const roundInfo = document.getElementById('round');
const scoreP1 = document.getElementById('score-p1');
const scoreP2 = document.getElementById('score-p2');
const message = document.getElementById('message');
const newGame = new GameObject();

btnStart.addEventListener('click', async (e) => {
  e.preventDefault();
  if(e.target.textContent === 'Start Again'){
    newGame.stop();
    scoreP1.textContent = '0';
    scoreP2.textContent = '0';
    message.textContent = '';
  };

  newGame.gameStart();
  roundInfo.textContent = `Round: 1`;
  await newGame.startRound();

  while (newGame.score.player1 < 10  && newGame.score.player2 < 10 && newGame.round < 60){
    roundInfo.textContent = `Round: ${newGame.round + 1}`;
    scoreP1.textContent = `${newGame.score.player1}`;
    scoreP2.textContent = `${newGame.score.player2}`;
    await newGame.startRound();
  }
  scoreP1.textContent = `${newGame.score.player1}`;
  scoreP2.textContent = `${newGame.score.player2}`;
  let text = '';
  if(newGame.score.player1 > newGame.score.player2){
    text = 'Player1 won!'
  }else if(newGame.score.player1 < newGame.score.player2){
    text = 'Player2 won!'
  } else {
    text = 'Draw'
  };

  message.textContent = text;
  btnStart.textContent = 'Start Again';

})
