//be able to draw cards
//be able to poker rule
//be able to
import React, { useState, useMemo, useEffect } from "react";

import Card from "../card/Card";
import CenteredContainer from "../containers/CenteredContainer";

import { drawCardFromDeck } from "../api";

function Player({ deckId, hand, id, pokerRuleCount, updatePlayer, placeCard }) {
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const hoveredCard = useMemo(() => (hand ? hand[hoveredCardIndex] : null), [
    hand,
    hoveredCardIndex,
  ]);

  //EXECUTES ON MOUNT
  useEffect(() => {
    if (!hand && deckId) {
      drawCardFromDeck(deckId, 6, (hand) => {
        updatePlayer(id, 'hand', hand)
      });
    }
  }, [deckId, id, hand, updatePlayer]);

  //EXECUTES ON MOUNT AND WHEN hoveredCard CHANGES
  useEffect(() => {
    if (hoveredCard) {
      //console.log(hoveredCard.code)
    }
  }, [hoveredCard]);

  return (
    <CenteredContainer
      style={{
        background: "rgba(0,0,0,0.5)",
        height: "250px",
        width: "100%",
        position: "absolute",
        bottom: id === 1 ? "0" : "100",
      }}
    >
      {hand
        ? hand.map((card, index) => (
            <Card
              key={`player_${id}_card_${index}`}
              placeCard={placeCard}
              onHoverIn={() => setHoveredCardIndex(index)}
              onHoverOut={() => setHoveredCardIndex(null)}
              hovered={index === hoveredCardIndex}
              card={card}
            />
          ))
        : null}
    </CenteredContainer>
  );
}

export default Player;
