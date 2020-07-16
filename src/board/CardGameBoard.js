import React, { useState, useEffect, useCallback } from "react";
import { createDeck, drawCardFromDeck } from "../api";
import Player from "../player/Player";

import { cloneDeep } from "lodash";

export default ({ playerCount }) => {
  const [deckId, setDeckId] = useState(null);
  // 0: hasnt started, 1: started, 2: over
  const [gameState, setGameState] = useState(0);

  // 0: clockwise, 1: counter-clockwise
  const [direction, setDirection] = useState(0);

  const [players, setPlayers] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

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
          console.log(newPlayers);
          setPlayers(newPlayers);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [playerCount]);

  const getPlayerIndexByKey = (players, key) => {
    for (let i in players) {
      console.log(players);
      if (players[i].key === key) return i;
    }
    return null;
  };

  const updatePlayer = useCallback(
    (id, field, value) => {
      const newPlayers = cloneDeep(players);
      let updatedPlayerIndex = getPlayerIndexByKey(newPlayers, id);
      console.log(updatedPlayerIndex);
      if (updatedPlayerIndex) {
        newPlayers[updatedPlayerIndex][field] = value;
        //setPlayers(newPlayers);
      }
    },
    [players]
  );

  const placeCard = (card) => {
    console.log(card);
  };
  // TODO how do we know which player is the 'main' one
  // assign each client a key and that corresponds to the key in the player element?

  console.log(players);

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
