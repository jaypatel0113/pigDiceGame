/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. Random number
        var dice = Math.floor((Math.random() * 6) + 1);
        var dice2 = Math.floor((Math.random() * 6) + 1);
        //2. Display the result
        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice2').style.display = 'block';
        document.getElementById('dice1').src = 'dice-' + dice + '.png';
        document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
        //3. Update the round score If the rolled was NOT a 1
        if (dice !== 1 && dice2 !==1) {
            //Add the score
            roundScore += dice+dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            // if(prevRoll === 6 && dice ===6){
            //     console.log('Prev Roll = '+prevRoll);
            //     console.log('Current Roll '+dice);
            //     console.log('Player : '+(activePlayer+1));
            //     console.log('*****************');
            //     scores[activePlayer] = 0;
            //     document.querySelector('#score-'+activePlayer).textContent = '0';
            //     nextPlayer();
            //     prevRoll = 0;
            // }else{
            //     prevRoll = dice;
            // }

        } else {
            //Next Player
            nextPlayer();
            prevRoll = 0;
        }
    }
});

    document.querySelector('.btn-hold').addEventListener('click', function (){
       if(gamePlaying){
           //Current Score to global score
           scores[activePlayer] += roundScore;

            var input = document.querySelector('.finalScore').value;
            var winScore;
            if(input){
                winScore = input;
            }else{
                winScore = 100;
            }
           // Update the UI
           document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

           //Check if Player won the game
           if (scores[activePlayer] >= winScore) {
               document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';
               document.getElementById('dice1').style.display = 'none';
               document.getElementById('dice2').style.display = 'none';
               document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
               document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
               gamePlaying = false;
           } else {
               //Next Player
               nextPlayer();
           }
       }
    });

    function nextPlayer () {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.getElementById('dice1').style.display = 'none';
        document.getElementById('dice2').style.display = 'none';
    }

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    gamePlaying = true;
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}