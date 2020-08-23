import { createDeck, drawCardFromDeck, drawTrump, recursiveDrawHands } from "../api";
import {players} from "./testGameData"
import { fetchGameInvites, createGame, getUserData } from '../db/dbUtils'
const suiteAscii = {
    "H" : "♥",
    "D" : "♦",
    "S" : "♠",
    "C" : "♣"
}

const suiteColor = {
    "H" : "red",
    "D" : "red",
    "S" : "black",
    "C" : "black"
}

const isLetter = (str) => {
    return str.length === 1 && str.match(/[A-Z]/i);
}

const checkLowest = (players, trumpCard) => {
    // console.log(players);
    console.log(trumpCard);
    let minTrump = null;
    let minPlayerIndex = null;
    let auxNum = null
    for (let i = 0; i < players.length; i++){
      for(let j = 0; j < 6; j++){
        //console.log(players[i].hand[j]);
        if(players[i].hand[j].code[1] === trumpCard.code[1]){
          if(isLetter(players[i].hand[j].code[0])){
            auxNum = players[i].hand[j].code[0].charCodeAt(0) - 97;
            auxNum = Math.abs(auxNum);
            //console.log(auxNum);
          } else if(players[i].hand[j].code[0] === 0) {
            auxNum = 10;
          } else {
            auxNum = players[i].hand[j].code[0];
          }
          if(auxNum < minTrump){
            minTrump = auxNum;
            if(minPlayerIndex && minPlayerIndex !== i){
              minPlayerIndex = i;
            } else {
              minPlayerIndex = i;
            }
          } else {
            minTrump = auxNum;
          }
          if(!minPlayerIndex){
            minPlayerIndex = i;
          }
        }
      }
    }
    console.log(minTrump);
    console.log(minPlayerIndex);
    if(minPlayerIndex === null){
      return 0;
    } else {
      return minPlayerIndex;
    }
}

const createTestGame = () => {
  let host = players[0];
  let auxPlayers = players;
  let invitedPlayers = []
  createDeck().then(deckId => {
    drawTrump(deckId).then(trumpCard => {
        recursiveDrawHands(deckId, auxPlayers, [], (newPlayers) => {
            console.log(newPlayers);
            let attackerIndex = checkLowest(newPlayers, trumpCard);
            console.log(attackerIndex);
            let attackerId = newPlayers[attackerIndex].id;
            
            //gameState:
            // 0 - Waiting to Start
            // 1 - In Progress
            // 2 - Finished
            let game = {
                //trump: drawTrumpCard(),
                title: `${host.username}'s game`,
                gameState: 0,
                invitedPlayers,
                attacks: [],
                hostId: host.id,
                players: newPlayers,
                id: deckId,
                currentPlayer: attackerId,
                trump: trumpCard
            }

            return game;
            //setAttacker(checkLowest(newPlayers, trump)); //decide who starts the game
          });
        })
      })
      
}

export {checkLowest, isLetter, suiteAscii, suiteColor, createTestGame};