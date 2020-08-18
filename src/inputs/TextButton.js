import React, {useState} from 'react'
import CenteredContainer from '../containers/CenteredContainer'

export default ({ text, onClick, style }) => {

    const [hovered, setHovered] = useState(false)

    return (
        <CenteredContainer
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                cursor: 'pointer',
                opacity: hovered ? 1 : 0.5,
                border: '1px solid #efefef',
                fontFamily: 'Antic Slab',
                color: '#efefef',
                padding: '10px 20px',
                margin: '10px 15px', 
                width: 100,
                ...style
            }}
        >
            {text}
        </CenteredContainer>
    )
}