import React, { useMemo, useState, useRef } from "react";
import CenteredContainer from "../containers/CenteredContainer";
import { useSpring, animated, interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";

export default ({ card, onHoverIn, onHoverOut, height = 200, placeCard }) => {
  const [active] = useState(false);

  const aspectRatio = 0.7; // TODO: Get aspect ratio of card images

  const containerRef = useRef()

  const [{ x, y, scale }, set] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    if(my < -80 && !down){
        placeCard(card, 1)
    }
    if(my > 80 && !down){
      placeCard(card, 0)
    }
    set({ x: down ? mx : 0, y: down ? my : 0, scale: down ? 1.1 : 1 });
  });

  return (
    <animated.div
        ref={containerRef}
      style={{
        cursor: 'pointer',
        height,
        transform: interpolate([x, y, scale], (x, y, s) => `translate3d(${x}px,${y}px,0) scale(${s})`),
        width: height * aspectRatio,
      }}
    >
      <img draggable={false} src={card.image} alt={card.code} width="100%" height="100%" />
      <CenteredContainer
        {...bind()}
        style={{ position: "absolute", left: 0, top: 0 }}
      />
    </animated.div>
  );
};
