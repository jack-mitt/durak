import React, { useMemo } from "react";
import CenteredContainer from "../containers/CenteredContainer";
import clamp from "lodash-es/clamp";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-with-gesture";

export default ({ card, onHoverIn, onHoverOut, height = 200 }) => {
  const aspectRatio = 0.7; // TODO: Get aspect ratio of card images

  //dont think we need this  9 : 15
  const cardColor = useMemo(
    () =>
      card.code
        ? card.code[1] === "C" || card.code[1] === "S"
          ? "black"
          : "red"
        : "white",
    [card]
  );

  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useGesture(({ down, delta, velocity }) => {
    velocity = clamp(velocity, 1, 8);
    set({
      xy: down ? delta : [0, 0],
      config: { mass: velocity, tension: 500 * velocity, friction: 50 },
    });
  });
  return (
    <animated.div {...bind()} style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }} >
        <CenteredContainer
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
        style={{
            height: height,
            margin: "0px 5px",
            width: height * aspectRatio,
            background: "white",
            borderRadius: "4px",
            overflow: "hidden",
            fontSize: "28px",
            color: cardColor,
            cursor: "-webkit-grab",
        }}
        >
        <img src={card.image} alt={card.code} width="100%" height="100%" />
        </CenteredContainer>
    </animated.div>
  );
};
