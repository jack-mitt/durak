import React, { useState, useEffect, useCallback } from "react";
import { createDeck, drawCardFromDeck, drawTrump } from "../api";
import Player from "../player/Player";
import AttackTable from "./AttackTable";
import { cloneDeep } from "lodash";
import ResizeObserver from "react-resize-observer";
import CenteredContainer from "../containers/CenteredContainer";
import ActiveAttacks from "./ActiveAttacks";
import Trump from "./Trump";
import {isLetter} from  "./../util/baseUtil";

//TODO: change this for multiplayer
const PLAYER_HEIGHT = 150;

//board state variable array of attack objects
//attac : {attackingCard : card, defendingCard: card / null}
export default ({ playerCount }) => {
  const [deckId, setDeckId] = useState(null);
  const [trumpCard, setTrumpCard] = useState(null);
  // 0: hasnt started, 1: started, 2: over
  const [boundingBox, setBoundingBox] = useState(null);
  const [boxHovered, setBoxHovered] = useState(false);
  const [gameState, setGameState] = useState(0);

  // 0: clockwise, 1: counter-clockwise
  const [direction, setDirection] = useState(0);

  const [players, setPlayers] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const [attacks, setAttacks] = useState([]);

  const [attackingPlayer, setAttacker] = useState(null); //player who begins the attack

  let deckGone = false; //if there are cards left in the deck or not

  const checkLowest = (players, trumpCard) => {
      // console.log(players);
      console.log(trumpCard);
      let minTrump = null;
      let minPlayer = null;
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
              if(minPlayer && minPlayer !== i){
                minPlayer = i;
              } else {
                minPlayer = i;
              }
            } else {
              minTrump = auxNum;
            }
            if(!minPlayer){
              minPlayer = i;
            }
          }
        }
      }
      console.log(minTrump);
      console.log(minPlayer);
      if(minPlayer === null){
        return 0;
      } else {
        return minPlayer;
      }
  }

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
  const attackIsLegal = useCallback(
    (card) => {
      if (attacks.length === 0) {
        return true;
      }
      for (let i = 0; i < attacks.length; ++i) {
        //TODO: Log errors if no attacking card
        if (attacks[i].attackingCard.code[0] === card.code[0]) {
          return true;
        }
        return false;
      }
    },
    [attacks]
  );

  const removeCardFromHand = useCallback(
    (card, playerId) => {
      let index = getPlayerIndexByKey(players, playerId);
      let player = players[index];
      let newHand = player.hand.filter((c) => c.code !== card.code);
      updatePlayer(playerId, "hand", newHand);
      //need some help here with how to update the player array
    },
    [players]
  );

  useEffect(() => {
    //create deck and give players their hands
    //this.makePlayerArray(this.props.playerCount);
    createDeck()
      .then((newDeckId) => {
        setDeckId(newDeckId);
        drawTrump(newDeckId).then((trump) => {
          //console.log(trump);
          setTrumpCard(trump);
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
            setAttacker(checkLowest(newPlayers, trump)); //decide who starts the game
          });
        }).catch((err) => {
          console.log(err);
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

  const handleBoardResize = (bbox) => {
    let y = (bbox.y || bbox.top) + PLAYER_HEIGHT;
    let height = bbox.height - PLAYER_HEIGHT * 2;
    setBoundingBox({ x: bbox.x || bbox.left, y, width: bbox.width, height });
  };

  const updatePlayer = useCallback(
    (id, field, value) => {
      const newPlayers = cloneDeep(players);
      let updatedPlayerIndex = getPlayerIndexByKey(newPlayers, id);
      if (updatedPlayerIndex) {
        newPlayers[updatedPlayerIndex][field] = value;
        setPlayers(newPlayers);
      }
    },
    [players]
  );

  const pointInBox = (point, box) => {
    let xMin = box.x;
    let xMax = box.x + box.width;
    if (point.x >= xMin && point.x <= xMax) {
      let yMin = box.y;
      let yMax = box.y + box.height;
      if (point.y >= yMin && point.y <= yMax) return true;
    }
    return false;
  };

  const attackInBox = useCallback(
    (center) => {
      return pointInBox(center, boundingBox);
    },
    [boundingBox]
  );

  //When a card is moved from the hand onto the game board

  const handleCardHover = useCallback(
    (card, playerId, center) => {
      if (attackInBox(center)) {
        setBoxHovered(true);
      } else {
        setBoxHovered(false);
      }
    },
    [attackInBox]
  );

  const placeCard = useCallback(
    (card, playerId, center) => {
      //TODO add a check if the player placing the card is attacking or defending
      setBoxHovered(false)
      if (attackInBox(center)) {
        if (attackIsLegal(card)) {
          let attackingCard = { ...card, center };
          let attack = { attackingCard, defendingCard: null };
          attacks.push(attack);
          let aux = cloneDeep(attacks);
          setAttacks(aux);
          removeCardFromHand(card, playerId);
          console.log(attacks);
        } else {
          //attack was not legal
          console.log("Attack not legal " + card.code);
        }
      } // console.log(attacks);
    },
    [attackInBox, attackIsLegal, attacks, removeCardFromHand]
  );
  // TODO how do we know which player is the 'main' one
  // assign each client a key and that corresponds to the key in the player element?

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        background: "#777",
        height: "100%",
        flexFlow: "column",
        justifyContent: "flex-start",
      }}
    >
      <ResizeObserver onResize={handleBoardResize} />

      <CenteredContainer
        style={{
          position: "absolute",
          transition: 'background 500ms',
          top: boundingBox ? boundingBox.y : 0,
          height: boundingBox ? boundingBox.height : 0,
          left: boundingBox ? boundingBox.x : 0,
          width: boundingBox ? boundingBox.width : 0,
          background: `rgba(255,255,255,${boxHovered ? 0.5 : 0})`,
        }}
      >
        <AttackTable attacks={attacks} />
        <ActiveAttacks attacks={attacks} height={PLAYER_HEIGHT}/>
        <Trump code={trumpCard ? trumpCard.code : null} height={PLAYER_HEIGHT} />
      </CenteredContainer>

      {players
        ? players.map(({ key, hand, pokerRuleCount }) => (
            <Player
              handleCardHover={handleCardHover}
              height={PLAYER_HEIGHT}
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
