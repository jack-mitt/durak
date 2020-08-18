import React from 'react'
import CenteredContainer from '../containers/CenteredContainer'
import background from '../background.jpg'

export default () => {

    return (
        <CenteredContainer
            style={{
                position: 'absolute',
                pointerEvents: 'none'
            }}
        >
            <img alt='background' src={background} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
        </CenteredContainer>
    )
}