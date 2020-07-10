//be able to draw cards
//be able to poker rule
//be able to 
import React, { useState, useMemo, useEffect } from "react";

import Card from '../card/Card'
import { drawCardFromDeck } from "../api";
import CenteredContainer from "../containers/CenteredContainer";

function Player({ deckId, hand, id, pokerRuleCount }) {

    const [hoveredCardIndex, setHoveredCardIndex] = useState(null)

    const hoveredCard = useMemo(() => hand ? hand[hoveredCardIndex] : null, [hand, hoveredCardIndex])

    //EXECUTES ON MOUNT
    useEffect(() => {
        console.log(`PLAYER ${id} MOUNTED`)

    }, [])

    //EXECUTES ON MOUNT AND WHEN hoveredCard CHANGES
    useEffect(() => {

        if (hoveredCard) {
            console.log(hoveredCard.code)
        }
    }, [hoveredCard])

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
                    <Card
                        key={`player_${id}_card_${index}`}
                        onHoverIn={() => setHoveredCardIndex(index)}
                        onHoverOut={() => setHoveredCardIndex(null)}
                        hovered={index === hoveredCardIndex}
                        card={card}
                    />
                )
                    :
                    null
            }
        </CenteredContainer>
    );

}

export default Player;