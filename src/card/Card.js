import React, { useMemo } from 'react'
import CenteredContainer from '../containers/CenteredContainer'

export default ({ card, onHoverIn, onHoverOut, height = 200 }) => {

    const aspectRatio = 0.7 // TODO: Get aspect ratio of card images

    //dont think we need this  9 : 15
    const cardColor = useMemo(() =>
        card.code ?
            (card.code[1] === 'C' || card.code[1] === 'S') ?
                'black' :
                'red' :
            'white'
    , [card])

    console.log(card);
    return (
        <CenteredContainer
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
            style={{
                height: height,
                margin: '0px 5px',
                width: height * aspectRatio,
                background: 'white',
                borderRadius: '4px',
                overflow: 'hidden',
                fontSize: '28px',
                color: cardColor
            }}
        >
            <img src={card.image} alt={card.code} width="100%" height="100%"/>
        </CenteredContainer>
    )
}