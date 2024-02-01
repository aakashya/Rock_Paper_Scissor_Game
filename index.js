// Getting DOM variable and adding functionality

//  Player Hand Selection Element
const buttons = document.querySelectorAll(".pick");

// Scoreboard Section Element (Player & Computer Score) 
const scoreBoard = document.getElementById("scoreBoard");
const playerScoreElement = document.getElementById("playerScore");
const pcScoreElement = document.getElementById("computerScore");

// Player Hand Section Element
const handSelectionSec =document.getElementById("handSelection");

// Game Play Section Elements
const gameOutcomeSec = document.getElementById("gameOutcome");
const playAgain = document.getElementById("playAgainBtn");
const against = document.getElementById("against");
const matchResult = document.getElementById("result");

// Player & Computer Seleted Hand Element
const playerHand = document.getElementById("playerHand");
const pcHand= document.getElementById("pcHand");

// Rules Section Element
const rulesPopup = document.getElementById("rulesPopup");

// Victory Page Elements
const vistoryPage = document.getElementById("vistoryPage");
const playAgainWin = document.getElementById("playAgainWinBtn");

//function buttons
const buttonNext =document.getElementById("next");
const buttonRules= document.getElementById("rules");
const buttonRulesWin =document.getElementById("rulesWinBtn");
const buttonClose = document.getElementById("closeBtn");

let userMove= undefined;
let myScore = Number(getMyScore());
let pcScore = Number(getPcScore());

// Getting Specific Hand Clicked
buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        userMove = button.getAttribute("selection");
        winner();
    });
});

// button click functionalities 
playAgain.addEventListener("click", () =>{
    handSelectionSec.style.display="flex";
    gameOutcomeSec.style.display ="none";
    buttonRules.style.visibility="visible";
    buttonNext.style.visibility ="hidden";
    buttonRulesWin.style.visibility="hidden";
});

playAgainWin.addEventListener("click", () =>{
    scoreBoard.style.display ="flex";
    handSelectionSec.style.display ="flex";
    gameOutcomeSec.style.display="none";
    vistoryPage.style.display ="none";
});

buttonRules.addEventListener("click", () =>{
    rulesPopup.style.display ="flex";
});
buttonRulesWin.addEventListener("click", () =>{
    rulesPopup.style.display="flex";
});
buttonClose.addEventListener("click", () =>{
    rulesPopup.style.display ="none";
});

buttonNext.addEventListener("click",()=>{
    scoreBoard.style.display ="none";
    handSelectionSec.style.display="none";
    gameOutcomeSec.style.display="none";
    vistoryPage.style.display ="flex";
    buttonRules.style.visibility="visible";
    buttonNext.style.visibility="hidden";
    buttonRulesWin.style.visibility="hidden";
    
});

// Winner Decision 
function winner(){
    const  pcMove =  randomChoice();
    displayGameResult(playerHand, userMove);
    displayGameResult(pcHand,pcMove);
     //Game Draw Case
    if(userMove === pcMove){
        matchResult.innerText = "TIE UP";
        against.style.visibility="hidden";
        playAgain.innerText="REPLAY";
        buttonRules.style.visibility ="visible";
        buttonNext.style.visibility="hidden";
        pcHand.classList.remove("winBg");
        playerHand.classList.remove("winBg");
    } else if(
        (userMove === "paper" && pcMove === "rock") ||
        (userMove === "rock" && pcMove =="scissor") ||
        (userMove === "scissor" && pcMove ==="paper")
    ) {
        // Game Won By User Case
        updateMyScore(1);
        matchResult.innerText ="YOU WIN";
        against.style.visibility="visible";
        playAgain.innerText="PLAY AGAIN";
        buttonNext.style.visibility="visible";
        buttonRules.style.visibility="hidden";
        buttonRulesWin.style.visibility="visible";
        pcHand.classList.remove("winBg");
        playerHand.classList.add("winBg");
    } else {
        // Game Won By  Computer Case
        updatePcScore(1);
        matchResult.innerText="YOU LOST";
        against.style.visibility="visible";
        playAgain.innerText="PLAY AGAIN";
        buttonRules.style.visibility="visible";
        buttonNext.style.visibility="hidden";
        pcHand.classList.add("winBg");
        playerHand.classList.remove("winBg");
    }
     // display Game Result section
     handSelectionSec.style.display="none";
     gameOutcomeSec.style.display="flex";
}

// Player Score Update
function updateMyScore(value){
    myScore += value;
    playerScoreElement.innerText = myScore;
    updatePlayerScoreLocalStorage();   
}

// Computer Score Update
function updatePcScore(value){
    pcScore += value;
    pcScoreElement.innerText =pcScore;
    updateComputerScoreLocalStorage();
}

// Array for Computer to select Random Choice
const choice =["rock","paper","scissor"];

// Computer To Select Random Hand
function randomChoice(){
    return choice[Math.floor(Math.random() * choice.length)];
}

// Choosing Hand Acoording to the choice of Player & Computer
function displayGameResult( selected, option) {
    selected.classList.remove("bg-rock");
    selected.classList.remove("bg-paper");
    selected.classList.remove("bg-scissor");
    
    // Hand image and Background
    const image = selected.querySelector("img");
    selected.classList.add(`bg-${option}`);
    image.src =`./assets/${option}.png`;
    image.alt=option;
}

// Score updated to local storage
function updatePlayerScoreLocalStorage() {
    return localStorage.setItem("Player_Score",myScore);
}
function updateComputerScoreLocalStorage() {
    return localStorage.setItem("Computer_Score", pcScore);
}

// Player Score Updation
function getMyScore(){
    const numRegEx = /^-?[\d.]+(?:e-?\d+)?$/;
    let myScore;
    if (
        localStorage.getItem("Player_Score") === null ||
        !localStorage.getItem("Player_Score").match(numRegEx)
    ) {
        localStorage.setItem("Player_Score", "0");
        myScore = "0";
    } else{
        myScore = localStorage.getItem("Player_Score");
        playerScoreElement.innerText = localStorage.getItem("Player_Score");
    }
    return myScore;
}

//computer Score Updation
function  getPcScore(){
    const numRegEx = /^-?[\d.]+(?:e-?\d+)?$/;
    let pcScore;
    if(
        localStorage.getItem("Computer_Score") === null ||
        !localStorage.getItem("Computer_Score").match(numRegEx)
    ) {
        localStorage.setItem("Computer_Score","0");
        pcScore ="0";
    } else  {
        pcScore =localStorage.getItem("Computer_Score");
        pcScoreElement.innerText =  localStorage.getItem("Computer_Score");
    }
     return pcScore;
}

