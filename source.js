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
                return `${boardArray[0][i]}`;
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
    const newGameBtn = document.querySelector(".NewGame");
    const nextRoundBtn = document.querySelector(".NextRound");
    const editPlayer = document.querySelectorAll(".Player > button");
    let players = [{
                    name: 'Player 1',
                    mark: 'x',
                    score: 0
                },
            {
                name: 'Player 2',
                mark: 'o',
                score: 0
            }];
    let currTurn = 0;
    boardDisplay.forEach(cell =>{
        cell.addEventListener('click', (event) =>{
            event.preventDefault();
            console.log(event.currentTarget);
            if(board.checkGameStatus()!="Active" || !MakeMove(event.currentTarget.getAttribute("location").split(","))){
                return;
            }
            const cell = document.querySelector(`[location="${event.currentTarget.getAttribute("location")}"]`);
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
                console.log(stat);
                displayStatus(stat);
                const scores = document.querySelectorAll(".scores")
                for(let i=0; i<players.length; i++){
                    if(players[i].mark==stat){
                        players[i].score++;
                        //update score display
                        scores[i].innerText = players[i].score;
                        
                    }
                }
            }
            
        });
    })
    newGameBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        board.resetBoard();
        resetDisplay();
        currTurn = 0;
        const scores = document.querySelectorAll(".scores");
        for(let i=0; i<players.length; i++){
            players[i].score = 0;
            scores[i].innerText = players[i].score;
        }


    })
    nextRoundBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        board.resetBoard();
        resetDisplay();

    })

    function resetDisplay(){
        boardDisplay.forEach(cell =>{
            cell.replaceChildren();
        })
        const gameResult = document.querySelector(".GameResult");
        if(gameResult!=undefined || gameResult!=null){
            gameResult.remove();
        }
    }
    
    const MakeMove = function(coordinates){
        return board.updateBoard(players[currTurn].mark,coordinates[0],coordinates[1]);
        
    }
    const getTurn = () => players[currTurn].mark ;
    
    const displayStatus = (status) =>{
        const gameResult = document.createElement("h1");
        gameResult.className = "GameResult";
        const gameContainer = document.querySelector(".gameContainer");
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
        gameContainer.appendChild(gameResult);

    }
    editPlayer.forEach(btn => {
        btn.addEventListener('click', editName)
    })
    
    function editName(event){
        console.log(event.target.parentNode);
        event.preventDefault();
        event.stopPropagation();
        // console.log(event.currentTarget.getAttribute("playerId"));
        const player = document.querySelector(`[playerId="${event.target.parentNode.getAttribute("playerId")}"]`);
        let currName = player.firstElementChild.innerText;
        const inputName = document.createElement("input");
        // inputName.placeholder = currName;
        inputName.value = currName;
        inputName.id = "new_name";
        console.log(player.childNodes);
        player.replaceChild(inputName, player.childNodes[1]);
        player.childNodes[3].removeEventListener('click',editName);
        player.childNodes[3].innerText = "Save Name";
        player.childNodes[3].addEventListener('click',saveName);
        
    }
    
    function saveName(event){
        console.log(event.target.parentNode);
        event.preventDefault();
        event.stopPropagation();
        const player = document.querySelector(`[playerId="${event.target.parentNode.getAttribute("playerId")}"]`);
        let newNameText = player.childNodes[1].value;
        players[parseInt(event.target.parentNode.getAttribute("playerId"))-1].name = newNameText
        const newName = document.createElement("h2");
        newName.className = "PlayerName";
        newName.innerText = newNameText;
        console.log(newName);
        player.replaceChild(newName, player.childNodes[1]);
        player.childNodes[3].removeEventListener('click',saveName);
        player.childNodes[3].innerText = "Edit Name";
        player.childNodes[3].addEventListener('click',editName);
    }
})();





