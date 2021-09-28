const frontCardsDiv = document.getElementById("frontCardsDiv");
const backCardsDiv = document.getElementById("backCardsDiv");
const drawBtn = document.getElementById("drawBtn");
const goals1 = document.getElementById("goals1");
const goals2 = document.getElementById("goals2");
const goals3 = document.getElementById("goals3");
let tecla = 49;

let deckGoals = [];

function createDeckGoals() {
    let range = 1;
    for (let i = 0; i < 3; i++) {
        let index = Math.floor((Math.random() * 5) + range);
        let front;
        let back;
            if (index < 10) {
                front = "assets/goals/goals_front_0" + index + ".png";
                back = "assets/goals/goals_back_0" + index + ".png";
            } else {
                front = "assets/goals/goals_front_" + index + ".png";
                back = "assets/goals/goals_back_" + index + ".png";
            }
            let card = new Card(i, front, back);
            deckGoals.push(card);
        range += 6;
    }
}

function displayGoals() {
    for (let i = 1; i < 4; i++) {
        document.getElementById("goals" + i).src = deckGoals[i - 1].front;
    }
}

goals1.addEventListener("click", function(e) {
    e.target.src = deckGoals[0].back;
});

goals2.addEventListener("click", function(e) {
    e.target.src = deckGoals[1].back;
});

goals3.addEventListener("click", function(e) {
    e.target.src = deckGoals[2].back;
});

let deckConstruction = [];
let discardedCards = [];
let constructionCardTypes = [
    {
        type: "bis",
        num: 9
    },
    {
        type: "fences",
        num: 18
    },
    {
        type: "landscaper",
        num: 18
    },
    {
        type: "pool",
        num: 9
    },
    {
        type: "real_estate",
        num: 18
    },
    {
        type: "temp_agency",
        num: 9
    }
];

function createDeck() {
    for (let i = 0; i < constructionCardTypes.length; i++) {
        let cardType = constructionCardTypes[i];
        for (let j = 1; j < cardType.num + 1; j++) {
            let front;
            if (j < 10) {
                front = "assets/construction_cards/" + cardType.type + "_0" + j + ".png";
            } else {
                front = "assets/construction_cards/" + cardType.type + "_" + j + ".png";
            }
            let back = "assets/construction_cards/" + cardType.type + "_back.png";
            let card = new Card(j, front, back);
            deckConstruction.push(card);
        }
    }
    deckConstruction = shuffleDeck(deckConstruction);
}

function Card(id, front, back) {
    this.id = id;
    this.front = front;
    this.back = back;
}

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleDeck(array) {
    let currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

function drawCards() {
    for (let i = 0; i < 3; i++) {
        discardedCards.push(deckConstruction[0]);
        deckConstruction.shift();
    }
    if (deckConstruction.length < 3) {
        console.log("coisei");
        let quantity = discardedCards.length - 3;
        for (let j = 0; j < quantity; j++) {
            deckConstruction[j] = discardedCards[j];
        }
        discardedCards.splice(0, quantity);
        deckConstruction = shuffleDeck(deckConstruction);
    }
}

function displayDeck() {
    for (let i = 1; i < 4; i++) {
        document.getElementById("front" + i + "Animation").classList.add("animation");
        setTimeout(function(){
          document.getElementById("front" + i).src = deckConstruction[i - 1].front;
          document.getElementById("front" + i + "Animation").classList.remove("animation"); }, 1000);
    }
}

function displayDiscard() {
    let l = discardedCards.length;
    for (let i = 1; i < 4; i++) {
        // document.getElementById("back" + i).src = discardedCards[l - i].back;
        document.getElementById("back" + i + "Animation").classList.add("animation");
        setTimeout(function(){
          document.getElementById("back" + i).src = discardedCards[l - i].back;
          document.getElementById("back" + i + "Animation").classList.remove("animation"); }, 1000);
    }
}

createDeck();
createDeckGoals();
drawCards();
displayDeck();
displayDiscard();
displayGoals();

// drawBtn.addEventListener("click", function() {
//     drawCards();
//     displayDeck();
//     displayDiscard();
// });

console.log(deckConstruction);

let readiedPlayers = 0;

function readyPlayer(e, numPlayers) {
  e.target.disabled = true;
  readiedPlayers++;
  if (readiedPlayers == numPlayers) {
    drawCards();
    displayDeck();
    displayDiscard();
    readiedPlayers = 0;

    let buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
    }
  }
}

function createPlayerButtons() {
  let numPlayers = prompt("How many players?", "5");
  numPlayers = parseInt(numPlayers);
  const playerButtons = document.getElementById("playerButtons");
  for (let i = 0; i < numPlayers; i++) {
    let button = document.createElement("button");
    button.id = "button id" + i;
    button.textContent = "READY!";
    button.addEventListener("click", function(e) {
    readyPlayer(e, numPlayers);
  });
  document.addEventListener("keydown", function(e) {
    event.preventDefault();
    if (event.keyCode === tecla + i || event.keyCode === 32) {
  document.getElementById("button id" + i).click();
}
  });
    playerButtons.appendChild(button);
  }
}

// document.addEventListener('keydown')
createPlayerButtons();
