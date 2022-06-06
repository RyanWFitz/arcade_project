let game_state = {
    board: [],
    playerName: ['', ''],
    //I set the currentPlayerMove to "x" so that I do not have to redeclare a new input when clicked, it will just use the player move value when pushed into the board position. This did cause isses with the computer move      
    currentPlayerMove: "X",     
    getPlayer: function(index) {
        return this.playerName[index];
    },

    gameWin: [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],       
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6],
   ],
   winner: false,
   numberOfTurns: 0,
};


function newGame() {
    game_state.board = 
    [
        {position: '', filled: false},
        {position: '', filled: false},
        {position: '', filled: false},
        {position: '', filled: false},
        {position: '', filled: false},
        {position: '', filled: false},
        {position: '', filled: false},
        {position: '', filled: false},
        {position: '', filled: false},
    ]
    game_state.currentPlayerMove = "X";
    game_state.playerName = ['', ''];
    game_state.winner = false;
    game_state.numberOfTurns= 0;
}

let boardElem = document.querySelector('#game_board');
let playerNames = document.querySelector('#playerName'); 
let playerTurn = document.querySelector('#playerTurn');
const restartGame = document.querySelector('#restart');


function render() {
    boardElem.innerHTML = '';
    for (let i = 0; i < game_state.board.length; i++){
        let grid = document.createElement('div');
        grid.innerHTML = game_state.board[i].position;
        grid.className = 'grid';
        grid.dataset.index = i;
        boardElem.appendChild(grid);
    }
    
}

//I liked Jeff's implementation showing how the inputs/start button can be displayed depending on if players have been added so I wanted to use something similar.
//Since I did not fully understand how his was able to work, I decided to use the following function to achieve the same effect.
function renderName(){
    let newPlayer = [];
    playerNames.innerHTML = '';
    
    if (!game_state.getPlayer(0) && !game_state.getPlayer(1)){   

        let nameInputOne = document.createElement('input');
        nameInputOne.className = 'playerOne';
        nameInputOne.placeholder = 'Enter Player Name';
        newPlayer.push(nameInputOne);
        
        let nameInputTwo = document.createElement('input');
        nameInputTwo.className = 'playerTwo';
        nameInputTwo.placeholder = 'Enter Player Name';        
        newPlayer.push(nameInputTwo);
        
        let startButton = document.createElement('button');
        startButton.className = 'start';
        startButton.innerHTML = 'Submit & Start';
        newPlayer.push(startButton);

        for (let i = 0; i < newPlayer.length; i++){
            playerNames.appendChild(newPlayer[i]);
        }    
 
    } else{
        
        let player1User = document.createElement('div');
        player1User.innerHTML = `Player 1: ${game_state.playerName[0]}`
        newPlayer.push(player1User);
        
        let player2User = document.createElement('div');
        player2User.innerHTML = `Player 2: ${game_state.playerName[1]}`
        newPlayer.push(player2User);


        for (let i = 0; i < newPlayer.length; i++){
            playerNames.appendChild(newPlayer[i]);
        }   
    }
}

function changePlayer(){
    if (game_state.currentPlayerMove === "X"){
        game_state.currentPlayerMove = "O";
        playerTurn.innerHTML = `${game_state.playerName[0]}'s Turn`;
    } 
    else {
        game_state.currentPlayerMove = "X";
        playerTurn.innerHTML = `${game_state.playerName[1]}'s Turn`;
    }

}    

//This was the last function I put into my code. It allows for an uneducated input of a player turn, however It will always say that it is the computer's turn after the first move and 
//will only recognize if the player wins.
//If there's one point in this code that I would like to go back and fix it is this one.
function compTurn(){
    for (let i = 0; i < game_state.board.length; i++){
        if (game_state.board[i].filled === false){
            game_state.board[i].position = "O";
            game_state.board[i].filled = true;
            game_state.numberOfTurns++
            break
        }
    }     

}

//Win function was the most difficult part of the assignment for me, I realize this does not apply to anything more than a 3x3 grid but was able to satisfy the baseline requirement.
//I would like to think of a way to change this but my biggest area that needs to improve is forming more complex loops/nested loops.
function win(){   
    for (let i = 0; i < game_state.gameWin.length; i++){
        let array = game_state.gameWin[i];
        let winIndex = array[0];
        let playerMarkOne = game_state.board[winIndex].position;
        let secondWinIndex = array[1];
        let playerMarkTwo = game_state.board[secondWinIndex].position;
        let thridWinIndex = array[2];
        let playerMarkThree = game_state.board[thridWinIndex].position;
        if (
            (!playerMarkOne  || !playerMarkTwo || !playerMarkThree ) || 
            (playerMarkOne !== playerMarkTwo || playerMarkTwo !== playerMarkThree || playerMarkOne !== playerMarkThree)
            ) {
            
        } else{
            // The following will display if the X or O win, this is because the current turn & input are set to 'X' and 'O', with a bit more time I would have liked to change the 
            // turn to have the game_state.playerName[i] replace it.
            playerTurn.innerHTML = `${game_state.currentPlayerMove} Wins!`;
            game_state.winner = true;
            return true 
            console.log('win');            
        }
    }
    if ((game_state.numberOfTurns === 9) &&
        (game_state.winner === false))
        {
        playerTurn.innerHTML = `It's a Draw!`;
        alert('Draw! Hit the Restart Button to Play Again!');
    }
}


playerNames.addEventListener('click', function(click) {

    const p1Input = document.querySelector('.playerOne').value;
    const p2Input = document.querySelector('.playerTwo').value;

    if (click.target.className === 'start'){            
        
        game_state.playerName[0] = p1Input;
        
        game_state.playerName[1] = p2Input;
        
        if (p2Input === ''){
            console.log('I see this condition')
            game_state.playerName[1] = 'Computer';
        }
        
        renderName()
        changePlayer();
    }
    
})

boardElem.addEventListener('click', function(event) {
    if (game_state.winner === true){
        return;
    }
    let target = event.target;
    let gridIndex = target.dataset.index;
    let click = game_state.board[gridIndex];
    if (!game_state.getPlayer(0) && !game_state.getPlayer(1)){
        alert(`Please Fill Out The "Player Names" Section And Click "Submit & Start" Before Starting!`);
        return
    }
    
    if (!click.filled) {
        game_state.numberOfTurns++;
        changePlayer(event);
        click.position = game_state.currentPlayerMove;
        click.filled = true;
        win();
        if ((game_state.playerName[1] === 'Computer') && (game_state.currentPlayerMove = "O")) {
            compTurn();
        }

    } else {
        alert('Please Choose An Open Block!')
        return
    }

    render()
   
    console.log(game_state);
})

newGame();
render();
renderName();

restartGame.addEventListener('click', function(){
    newGame();
    render();
    renderName();
    playerTurn.innerHTML = "";
    console.log(game_state);
})
