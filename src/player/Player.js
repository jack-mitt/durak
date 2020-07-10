//be able to draw cards
//be able to poker rule
//be able to 
import React, { useState, useMemo } from "react";

import Card from '../card/Card'
import { drawCardFromDeck } from "../api";
import CenteredContainer from "../containers/CenteredContainer";

function Player({ deckId, hand, key, pokerRuleCount }) {

    const [hoveredCardIndex, setHoveredCardIndex] = useState(null)

    const hoveredCard = useMemo(() => hand ? hand[hoveredCardIndex] : null, [hand])
    // componentDidMount = async () => {
    //     //draw 6 cards and add them to the hand
    //     //console.log(test);
    // }

    return (
        <CenteredContainer
            style={{
                background: 'rgba(0,0,0,0.5)',
                height: '300px',
                marginBottom: '20px',
                width: '100%'
            }}
        >
            {
                hand ? hand.map((card, index) => 
                    <Card hovered={index === hoveredCardIndex} card={card}/>    
                )
                :
                null
            }
        </CenteredContainer>
    );

}

export default Player;