
const computerChoices = document.querySelectorAll(".comp-choice")
const playerButtons = document.querySelectorAll(".player-choice")
const gameButtons = document.querySelectorAll(".game-buttons")
const roundNumber = document.querySelector(".round_number")
const compchoice_container = document.querySelector(".computer_cover")


var log_array = []
var player_choice = []
var peg_ammount = 0
var log = document.getElementById("log")
var secret = []
let round = 0


// interface button functionality
gameButtons[0].addEventListener('click',() => endRound(secret,player_choice))
gameButtons[1].addEventListener('click',() => removechoice())
gameButtons[2].addEventListener('click', () => gameStart())


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


// player choice buttons functionality //

function playerChoice () {
    Array.from(playerButtons).forEach(function(btn) {
        btn.addEventListener('click', function() {
          addchoices(this.value, this.id);
        });
      });
}


// function to keep track of current round//

function currentRound() {
    round++;
    roundNumber.innerHTML = ("round: " + round);
}


// function to remove choice from player round selection //
function removechoice () {
    
    if (peg_ammount > 0) {
    peg_ammount--;
    player_choice.pop();
    log_array.pop();
    deleteChoice()
    }
}


// push choices to player selection array and add/delete peg object to log of the current round // 

function addchoices (number,color){
  
    if (peg_ammount <= 3) { 
         function Peg (number,color) {
         this.number = number;
         this.color = color;
     }
        peg_ammount++;
        player_choice.push(number);
        let pegs = new Peg (number,color)
        log_array.push(pegs)
        console.log(player_choice)
        appendChoice()
    }
    
}

function appendChoice () {
    
    let currentdiv = document.getElementById(round);
    const newpeg = document.createElement("div")
    newpeg.id = (log_array[peg_ammount-1].color)
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
}

function endRound () {
   
    let round_choice = []

    if (player_choice.length === secret.length) {
        log_array = [];
        peg_ammount = 0;
        round_choice = player_choice.splice(0)
        console.log(round_choice)
        console.log(secret)
        currentRound();
        resolveRound(round_choice,secret);
    }
    else {
        alert(" you need to have 4 pegs selected before submiting your response.")
    }
    
    function resolveRound(round_choice,secret) {
        
        
        if (round_choice == secret) {
            console.log("ccorect")
        }
    }
}