
const computerChoices = document.querySelectorAll(".comp-choice")
const playerButtons = document.querySelectorAll("#player-choice")
const gameButtons = document.querySelectorAll(".game-buttons")
const infoButton = document.querySelector(".info-button")
const closeButton = document.querySelector(".close")
const roundNumber = document.querySelector(".round_number")
const compchoice_container = document.querySelector(".computer_cover")
const Destiny = document.querySelector("#Destiny")
const log = document.getElementById("log")
const rulesOverlay = document.getElementById("rules")

var log_array = []
var secret = []
var round = 0

// interface button functionality
gameButtons[0].addEventListener('click',() => submitRound());
gameButtons[1].addEventListener('click',() => removeChoice());
gameButtons[2].addEventListener('click',() => gameStart());
gameButtons[3].addEventListener('click',() => window.location.reload());
infoButton.addEventListener('click',() => showRules());
closeButton.addEventListener('click',() => closeRules());


// Get random numbers from random.org and push them to the secret variable //
function getSecret () {
    fetch("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
    .then(function(response) {
        return response.text();
      }).then(function(text) {
       secret = (text.split('\n',4))
      }).catch(function() {
        console.log("error");
      });

}


function showRules() {
    rulesOverlay.style.visibility="visible";
}

function closeRules() {
    rulesOverlay.style.visibility="hidden";
}

// player choice buttons functionality //

function playerChoice () {
    Array.from(playerButtons).forEach(function(btn) {
        btn.addEventListener('click', function() {
          addChoices(this.value, this.className);
        });
      });
}


// keep track of current round//

function currentRound() {
    if (round < 10) {
        round++;
        roundNumber.innerHTML = ("Round: " + round);
    }
}


// remove choice from player round selection //
function removeChoice () {
    
    if (log_array.length > 0) { 
    log_array.pop();
    deleteChoice()
    }
}


// constructor function to create peg object when button is created and push it to the log_array // 

function addChoices (number,color){
    if (log_array.length <= 3) { 
         function Peg (number,color) {
         this.number = number;
         this.color = color;
     }
        let pegs = new Peg (number,color)
        log_array.push(pegs)
        appendChoice(color)
    }
    
}

// append the peg object to the current round log //
function appendChoice (color) {
    
    let currentdiv = document.getElementById(round);
    const newpeg = document.createElement("div")
    newpeg.setAttribute("class",color)
    currentdiv.insertAdjacentElement('beforeend', newpeg)   
}

function deleteChoice() {

    var currentdiv = document.getElementById(round)
    return currentdiv.removeChild(currentdiv.lastElementChild);

}


// start game // 
function gameStart () {
    document.querySelector('#overlay').style.visibility ="hidden";
    compchoice_container.classList.add("answer_cover")
    currentRound()
    playerChoice();
    setTimeout (() => {getSecret()},1000);
    setTimeout (() => {appendSecret()},2000)
}

// push secret to board //

function appendSecret () {
    
    secret.forEach((answer,index) => {
    const div = document.querySelector(("#comp-choice-" + index));    
    div.classList.add(assignColor(answer))
    div.setAttribute("value",answer)
    })
}

function assignColor (value) {

const result = ({
    0: "red",
    1: "orange",
    2: "yellow",
    3: "green",
    4: "blue",
    5: "purple",
    6: "pink",
    7: "white",

})[value]

return result
    
}



function submitRound () {
   
    if (log_array.length > 3) {
        resolveRound();
        currentRound();
        log_array = [];
    }
    else {
        alert(" you need to have 4 pegs selected before submiting your response.")
    }
 }   

    function resolveRound() {
    const resultContainer = document.querySelectorAll(".result")
    let computer = secret.slice()    
    let player = (log_array.map(peg => {return peg.number}))
    let correctArr = []
    let matchedArr = []
    

        function correct() {
        let hint = document.createElement("div");
        hint.classList.add("correct")
        resultContainer[round-1].insertAdjacentElement("beforeend",hint)
        }

        function matched() {
        let hint = document.createElement("div");
        hint.classList.add("matched")
        resultContainer[round-1].insertAdjacentElement("beforeend",hint)
        }

        function missed() {
            let hint = document.createElement("div");
            hint.classList.add("missed")
            resultContainer[round-1].insertAdjacentElement("beforeend",hint)
        }



    console.log("answer" ,computer)
    console.log("guess" ,player)

    if (player.every((value,index) => value === computer[index])) {
        gameOver("win")
    } 
    else if (round < 10) {
        
        let x = computer.filter((value,index) => player[index].includes(value))
        correctArr = x

        let newarr = computer.filter((value,index) => !player[index].includes(value))
        let newguess = player.filter((value,index) => !computer[index].includes(value))
        
        
        a = newarr.filter(value => newguess.includes(value))
        b = newguess.filter(value => newarr.includes(value))

        if (a.length > b.length) {
            matchedArr = b
        } else {
            matchedArr = a
        }
       
    correctArr.forEach(value => correct(value));
    matchedArr.forEach(value => matched(value));
    let missedArr = Array.from(Array(4 - (correctArr.length + matchedArr.length)).keys());
    missedArr.forEach(value => missed(value));

    }else { gameOver("lose")}

}


function gameOver(result) {
    document.querySelector('#game-over').style.visibility ="visible";
    switch (result) {
        case "win":
            Destiny.innerHTML = "You WIN!"
            break;
    
        case "lose":
            Destiny.innerHTML = "Sorry you Lose"
            break;
    } 
    
    compchoice_container.classList.add("answer_show")
}