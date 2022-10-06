//dom manipulation for tags and classes in the html file
//catch the tags and classes in file then change the properties and attributes
//of them 
const btn1 = document.querySelector(".btn1");// get roll button
const btn2 = document.querySelector(".btn2");//get restart button
const dice = document.querySelectorAll(".die");
const player1 = document.querySelector('.player-1'); 
const player2 = document.querySelector('.player-2');
const player1Marks = document.querySelector('.player-1 p'); 
const player2Marks = document.querySelector('.player-2 p');
const winMsg1 = document.querySelector('.win-msg-1')
const winMsg2 = document.querySelector('.win-msg-2')

//create player objects for each player
const game = {
  player1: {
    turn: false,
    score: 0
  },
  player2: {
    turn: false,
    score: 0,
  },
};

//produce a random number between 1 and 6
function getRandomDieValue() {
  return Math.floor(Math.random() * 6) + 1;
}

//this gives 3 digit number with respective score
function getNumber(num) {
    if(num < 10) {
        return `00${num}`;//7 //007
    } else if (num < 100) {
        return `0${num}`;//52 //052
    } else {
        return `${num}`//102 
    }
}

//when the roll button clicks, these stuff will be happened with respective player
btn1.addEventListener("click", () => {
  const dieVal1 = getRandomDieValue();
  const dieVal2 = getRandomDieValue();

  const player = game.player1.turn ? "player1" : "player2";
  console.log(player);

  // set random die images
    dice.forEach((die, index) => {
    if (index === 0) {
      const src = `./img/dice_${dieVal1}.png`;
      die.src = src;
    } 
    else {
      const src = `./img/dice_${dieVal2}.png`;
      die.src = src;
    }
  });

  //check the conditions whether dice values equal to 1 and both are same
  if (dieVal1 === dieVal2 && dieVal1 === 1) {
    game[player].score = 0;
  }
  else {
    game[player].score = game[player].score + dieVal1 + dieVal2;
  }


  if(player === 'player1') {
    player1Marks.innerText = getNumber(game.player1.score)
    player1.style.border = "5px solid transparent ";

  } 
  else {
    player2Marks.innerText = getNumber(game.player2.score)
    player2.style.border = "2px solid transparent";
  }



  console.log(
    `Player 1 score = ${game.player1.score}, Player 2 score = ${game.player2.score}`
  );

  if(game[player].score >= 100) {
    //console.log(`${player} won the game with ${game[player].score} score.`)
    btn1.disabled = true
    btn2.disabled = false
    //set opacity to 1 and display message about respective winning player
    if(player === 'player1') {
        winMsg1.style.opacity =  "1";
        //alert(player+" is the winner")
    } 
    else {
        winMsg2.style.opacity =  "1";
        //alert(player+" is the winner")
    }
    
  }

  //dice handed to the other player 
  if (dieVal1 === dieVal2 && dieVal1 !== 1) {
    game[player].turn = true;
    game[player === "player1" ? "player2" : "player1"].turn = false;
  } 
  else {
    game[player].turn = false;
    game[player === "player1" ? "player2" : "player1"].turn = true;
  }

  if(game.player1.turn) {
    player1.style.border = "5px solid red";
  } 
  else {
    player2.style.border = "5px solid red"
  }


});


btn2.addEventListener('click', () => {
    player1Marks.innerText = "000"
    player2Marks.innerText = "000"
    game.player1.score = 0
    game.player1.turn = true
    game.player2.score = 0
    game.player2.turn = false
    btn1.disabled = false
    btn2.disabled = true
    winMsg1.style.opacity =  "0";
    winMsg2.style.opacity =  "0";


    dice.forEach((die, index) => {
        if (index === 0) {
          const src = `./img/dice_${getRandomDieValue()}.png`;
          die.src = src;
        } 
        else {
          const src = `./img/dice_${getRandomDieValue()}.png`;
          die.src = src;
        }
      });
})

game.player1.turn = true;
