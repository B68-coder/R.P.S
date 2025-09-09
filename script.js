const state = {
  p1: null,
  p2: null,
  score1: 0,
  score2: 0,
  rounds: 0,
  autoReveal: false,
  target: 5
};

const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');
const show1 = document.getElementById('show1');
const show2 = document.getElementById('show2');
const roundResult = document.getElementById('roundResult');
const historyEl = document.getElementById('history');

function resetRoundDisplays(){
  show1.textContent = '—';
  show2.textContent = '—';
  document.getElementById('status1').textContent = 'Waiting...';
  document.getElementById('status2').textContent = 'Waiting...';
  roundResult.textContent = '— Make your choices —';
}

document.querySelectorAll('.choice-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const p = btn.dataset.player;
    const ch = btn.dataset.choice;
    handleChoice(Number(p), ch);
  });
});

function handleChoice(player, choice){
  if(player === 1){
    state.p1 = choice;
    document.getElementById('status1').textContent = `Picked ${choice}`;
  } else {
    state.p2 = choice;
    document.getElementById('status2').textContent = `Picked ${choice}`;
  }

  if(state.p1 && state.p2){
    revealWinner();
  }
}

function revealWinner(){
  const a = state.p1;
  const b = state.p2;
  show1.textContent = emojiFor(a);
  show2.textContent = emojiFor(b);

  const winner = decideWinner(a,b);
  state.rounds++;
  historyEl.textContent = state.rounds;

  if(winner === 0){
    roundResult.textContent = `It's a tie!`;
  } else if(winner === 1){
    roundResult.textContent = `Player 1 wins this round!`;
    state.score1++;
    score1El.textContent = state.score1;
  } else {
    roundResult.textContent = `Player 2 wins this round!`;
    state.score2++;
    score2El.textContent = state.score2;
  }

  if(state.score1 >= state.target || state.score2 >= state.target){
    const champ = state.score1 > state.score2 ? 'Player 1' : 'Player 2';
    roundResult.textContent = `${champ} wins the game!`;
    disableChoices(true);
  }
}

function disableChoices(disabled){
  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = disabled);
}

function decideWinner(a,b){
  if(a === b) return 0;
  if(a === 'rock' && b === 'scissors') return 1;
  if(a === 'scissors' && b === 'paper') return 1;
  if(a === 'paper' && b === 'rock') return 1;
  return 2;
}

function emojiFor(s){
  if(s==='rock') return '🪨';
  if(s==='paper') return '📄';
  if(s==='scissors') return '✂️';
  return '—';
}

document.getElementById('nextRound').addEventListener('click', () => {
  state.p1 = null;
  state.p2 = null;
  resetRoundDisplays();
  disableChoices(false);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  state.score1 = 0;
  state.score2 = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
});

document.getElementById('resetAll').addEventListener('click', () => {
  state.score1 = 0;
  state.score2 = 0;
  state.rounds = 0;
  state.p1 = null;
  state.p2 = null;
  historyEl.textContent = 0;
  resetRoundDisplays();
  disableChoices(false);
});

document.getElementById('targetScore').addEventListener('change', (e) => {
  state.target = Number(e.target.value);
});

resetRoundDisplays();
