const gameBoard = document.querySelector("#gameBoard");
const infoDisplay = document.querySelector("#info");
const startCells = [
    "", "","",
    "","","",
    "","","",
];
let go = "circle";
const crossPlayer = document.querySelector("#crossPlayer");
const circlePlayer = document.querySelector("#circlePlayer");
let crossScore = 0;
let circleScore = 0;
const resetMessage = document.querySelector("#resetMessage");


infoDisplay.textContent = "Circle plays first!"

function createBoard(){
startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
})
};

createBoard();

function resetBoard(){
    gameBoard.innerHTML= '';
    if(go === "circle"){infoDisplay.textContent = "Circle plays first!";};
    if(go === "cross"){infoDisplay.textContent = "Cross plays first!"}
    resetMessage.textContent = " ";
    createBoard();
}

function addGo(e){
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "it is now " + go +"'s turn to play!"
    e.target.removeEventListener("click", addGo);
    checkScore()
}

function checkScore(){
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    winningCombos.forEach(array =>{
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains("circle"))
        
        if(circleWins){
            infoDisplay.textContent = "Circle Wins!";
            circleScore++;
            circlePlayer.textContent = circleScore;
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            resetMessage.textContent = "Resetting Board...";
            setTimeout(resetBoard, 5000);
        }    
    });

    winningCombos.forEach(array =>{
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains("cross"))
        
        if(crossWins){
            infoDisplay.textContent = "Cross Wins!";
            crossScore++;
            crossPlayer.textContent = crossScore;
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            resetMessage.textContent = "Resetting Board...";
            setTimeout(resetBoard, 5000);
        }    
    });

}
