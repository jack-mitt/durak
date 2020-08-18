import React from 'react'
import CenteredContainer from '../containers/CenteredContainer'

export default ({ first, second, value, set }) => {
    return (
        <CenteredContainer
            style={{
                height: 50,
                fontSize: '21px'
            }}
        >
            <CenteredContainer
                onClick={() => set(false)}
                style={{
                    cursor: 'pointer',
                    border: '2px solid #1b1b1b',
                    background: value ? 'white' : '#1b1b1b',
                    color: value ? 'black' : 'white',
                    width: 250
                }}
            >
                {first}
            </CenteredContainer>
            <CenteredContainer
                onClick={() => set(true)}
                style={{
                    cursor: 'pointer',
                    border: '2px solid #1b1b1b',
                    background: !value ? 'white' : '#1b1b1b',
                    color: !value ? 'black' : 'white',
                    //transition: 'background 500ms',
                    width: 250
                }}
            >
                {second}
            </CenteredContainer>
        </CenteredContainer>
    )
}