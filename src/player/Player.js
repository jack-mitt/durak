//be able to draw cards
//be able to poker rule
//be able to
import React, { useState, useMemo, useEffect } from "react";

import Card from "../card/Card";
import CenteredContainer from "../containers/CenteredContainer";

import { drawCardFromDeck } from "../api";

function Player({ game, playerData, user, handleCardHover, placeCard, height }) {

  const hand = useMemo(() => playerData ? playerData.hand : [], [playerData])
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const hoveredCard = useMemo(() => (hand ? hand[hoveredCardIndex] : null), [
    hand,
    hoveredCardIndex,
  ]);

  //EXECUTES ON MOUNT

  return (
    <CenteredContainer
      style={{
        background: "rgba(0,0,0,0.5)",
        height,
        width: "100%",
        position: "absolute",
        bottom:0,
      }}
    >
      {hand
        ? hand.map((card, index) => (
            <Card
              height={height*0.9}
              handleCardHover={handleCardHover}
              key={`player_${playerData.id}_card_${index}`}
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
