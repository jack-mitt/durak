import React, { useState, useEffect, useCallback } from "react";
import { createDeck, drawCardFromDeck } from "../api";
import Player from "../player/Player";
import AttackTable from "./AttackTable";
import { cloneDeep} from "lodash";

export default ({ playerCount }) => {
  const [deckId, setDeckId] = useState(null);
  // 0: hasnt started, 1: started, 2: over
  const [gameState, setGameState] = useState(0);

  // 0: clockwise, 1: counter-clockwise
  const [direction, setDirection] = useState(0);

  const [players, setPlayers] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const [attackingCards, setAttackingCards] = useState([]);

    const recursiveDrawHands = (deckId, oldPlayers, newPlayers, callback) => {
    if (oldPlayers.length === 0) {
      callback(newPlayers);
    } else {
      drawCardFromDeck(deckId, 6, (hand) => {
        newPlayers.push({ ...oldPlayers[0], hand });
        oldPlayers.splice(0, 1);
        recursiveDrawHands(deckId, oldPlayers, newPlayers, callback);
      });
    }
  };

  //determine if a card placed on the board is a legal attack
  const attackIsLegal = (card) => {
    if(attackingCards.length === 0){
      return true;
    }
    for(let i = 0; i < attackingCards.length; ++i){
      if(attackingCards[i].code[0] === card.code[0]){
        return true;
      }
      return false;
    }
  }

  const removeCardFromHand = useCallback((card, playerId) => {
    let index = getPlayerIndexByKey(players, playerId)
    let player = players[index];
    let newHand = player.hand.filter(c => c.code !== card.code);
    updatePlayer(playerId, "hand", newHand);
    //need some help here with how to update the player array
  }, [players])

  useEffect(() => {
    //create deck and give players their hands
    //this.makePlayerArray(this.props.playerCount);
    createDeck()
      .then((newDeckId) => {
        setDeckId(newDeckId);

        let auxPlayers = [];
        for (let i = 0; i < playerCount; i++) {
          auxPlayers.push({
            hand: null,
            key: i,
            pokerRuleCount: 2,
          });
        }
        recursiveDrawHands(newDeckId, auxPlayers, [], (newPlayers) => {
          //console.log(newPlayers);
          setPlayers(newPlayers);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [playerCount]);

  const getPlayerIndexByKey = (players, key) => {
    for (let i in players) {
      //console.log(players);
      if (players[i].key === key) return i;
    }
    return null;
  };

  const updatePlayer = useCallback(
    (id, field, value) => {
      const newPlayers = cloneDeep(players);
      let updatedPlayerIndex = getPlayerIndexByKey(newPlayers, id);
      if (updatedPlayerIndex) {
        newPlayers[updatedPlayerIndex][field] = value;
        setPlayers(newPlayers)
      }

    },
    [players]
  );

  console.log(players)

  //When a card is moved from the hand onto the game board
  const placeCard = (card, playerId) => {
    //TODO add a check if the player placing the card is attacking or defending
    if(attackIsLegal(card)){
      attackingCards.push(card);
      let aux = cloneDeep(attackingCards)
      setAttackingCards(aux);
      removeCardFromHand(card, playerId);
    } else { //attack was not legal
      console.log("Attack not legal " + card.code);
    }
    
   // console.log(attackingCards);

  };
  // TODO how do we know which player is the 'main' one
  // assign each client a key and that corresponds to the key in the player element?

  //console.log(players);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexFlow: "column",
        justifyContent: "flex-start",
      }}
    >
    <AttackTable 
        attackingCards={attackingCards}
    />
      {players
        ? players.map(({ key, hand, pokerRuleCount }) => (
            <Player
              placeCard={placeCard}
              deckId={deckId}
              updatePlayer={updatePlayer}
              hand={hand}
              id={key}
              key={key}
              pokerRuleCount={pokerRuleCount}
            />
          ))
        : null}
    </div>
  );
};
