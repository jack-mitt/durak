import React from 'react'
import CenteredContainer from '../containers/CenteredContainer'
import loadingLogo from './loading.svg'

export default ({ loading, style }) => {

    return (
        <CenteredContainer
            style={{
                opacity: loading ? 1 : 0,
                pointerEvents: loading ? 'auto' : 'none',
                background: '#1b1b1b',
                position: 'absolute',
                transition: 'opacity 500ms',
            }}
        >
            {
                loading ? 
                <img alt='loading' src={loadingLogo} style={{ width: '60%', objectFit: 'contain', ...style }} />
                :
                null
            }

        </CenteredContainer>
    )
}