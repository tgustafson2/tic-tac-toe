const board = (function(){
    let boardArray = [['','',''],
                      ['','',''],
                      ['','','']];

    const checkGameStatus = () =>{
        for(let i=0; i<3; i++){
            if(boardArray[i][0] === boardArray[i][1] && boardArray[i][0]==boardArray[i][2] && boardArray[i][0]!=''){
                return `${boardArray[i][0]}`;
            }
            if(boardArray[0][i] === boardArray[1][i] && boardArray[0][i]==boardArray[2][i] && boardArray[0][i]!=''){
                return `${boardArray[i][0]}`;
            }
        }
        if(boardArray[0][0] === boardArray[1][1] && boardArray[0][0]==boardArray[2][2] && boardArray[0][0]!=''){
            return `${boardArray[0][0]}`;
        }
        if(boardArray[0][2] === boardArray[1][1] && boardArray[0][2]==boardArray[2][0] && boardArray[2][0]!=''){
            return `${boardArray[0][2]}`;
        }
        let gameEnd = true;
        boardArray.forEach(row => {
            row.forEach(element =>{
                if(element == '')gameEnd=false;
            })
        });
        if(gameEnd==true){
            return "Draw";
        }
        return "Active";
        
    }

    const resetBoard = () =>{
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                boardArray[i][j]='';
            }
        }
    }

    const updateBoard = (symbol, i,j) =>{
        if(boardArray[i][j]==''){
            boardArray[i][j]=symbol;
            return true;
        }
        return false;
    }

    return {checkGameStatus, resetBoard, updateBoard};
})();

const game = (function() {
    const boardDisplay = document.querySelectorAll(".board-space");
    let players = [{
                    name: '',
                    mark: 'x'
                },
            {
                name: '',
                mark: 'o'
            }];
    let currTurn = 0;
    boardDisplay.forEach(cell =>{
        cell.addEventListener('click', (event) =>{
            event.preventDefault();
            console.log(event.currentTarget);
            if(board.checkGameStatus()!="Active" || !MakeMove(event.currentTarget.getAttribute("location").split(","))){
                return;
            }
            const cell = document.querySelector(`[location="${event.currentTarget.getAttribute("location")}"]`)
            const mark = document.createElement("img");
            mark.className = "mark";
            if(getTurn() == 'x'){
                mark.src = "/images/x-symbol-svgrepo-com.svg";
            }
            else{
                mark.src = "/images/empty-circle-svgrepo-com.svg";
            }
            if(currTurn==0){
                currTurn = 1;
            }
            else{
                currTurn = 0;
            }
            cell.appendChild(mark);
            const stat = board.checkGameStatus();
            if(stat!="Active"){
                displayStatus(stat);
            }
            
        });
    })
    const MakeMove = function(coordinates){
        return board.updateBoard(players[currTurn].mark,coordinates[0],coordinates[1]);
        
    }
    const getTurn = () => players[currTurn].mark ;
    
    const displayStatus = (status) =>{
        const gameResult = document.createElement("h1");
        const body = document.querySelector("body");
        if(status === "Draw"){
            gameResult.innerText = "Draw";
            body.appendChild(gameResult);
            return;
        }
        const winner = players.find(player => player.mark == status);
        // console.log(winner);
        if(winner.name == ''){
            console.log(winner.mark);
            gameResult.innerText = `${winner.mark.toUpperCase()} wins`;
        }
        else{
            gameResult.innerText = `${winner.name} wins`;
        }
        body.appendChild(gameResult);

    }
})();
