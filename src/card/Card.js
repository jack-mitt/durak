import React, { useMemo } from 'react'
import CenteredContainer from '../containers/CenteredContainer'

export default ({ card, height = 200 }) => {

    const aspectRatio = 0.7 // TODO: Get aspect ratio of card images

    const cardColor = useMemo(() =>
        card.code ?
            (card.code[1] === 'C' || card.code[1] === 'S') ?
                'red' :
                'black' :
            'white'
    , [card])

    return (
        <CenteredContainer
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
            {card.code}
        </CenteredContainer>
    )
}