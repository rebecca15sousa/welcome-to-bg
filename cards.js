const frontCardsDiv = document.getElementById("frontCardsDiv");
const backCardsDiv = document.getElementById("backCardsDiv");
const drawBtn = document.getElementById("drawBtn");

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
        document.getElementById("front" + i).src = deckConstruction[i - 1].front;
    }
}

function displayDiscard() {
    let l = discardedCards.length;
    for (let i = 1; i < 4; i++) {
        document.getElementById("back" + i).src = discardedCards[l - i].back;
    }
}

createDeck();

drawBtn.addEventListener("click", function() {
    drawCards();
    displayDeck();
    displayDiscard();
});

console.log(deckConstruction);