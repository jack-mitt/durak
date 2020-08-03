import React, { useEffect } from 'react';
import CenteredContainer from "../containers/CenteredContainer";

function AttackingCard({card, height, defendingCard}){
    //should glow green or red when defending player hovers over with a defending card
    const aspectRatio = 0.7;

    return (
        <CenteredContainer
            style={{
                height,
                width: height * aspectRatio,
                padding: height * aspectRatio * 0.4,
            }}
        >
            <img draggable={false} src={card.image} alt={card.code} width="100%" height="100%"/>
            {/* might need attention*/}
            <img 
                style={{
                    opacity: defendingCard ? 1 : 0,
                    position: "absolute",
                    marginTop: height * 0.1,

                }}
                draggable={false} 
                src={defendingCard ? defendingCard.image : null} 
                alt={defendingCard ? defendingCard.code: null}
                width="100%"
                height="100%"
            />
        </CenteredContainer>

    )
}

export default AttackingCard;