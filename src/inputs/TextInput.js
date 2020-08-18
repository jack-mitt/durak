import React from 'react'
import CenteredContainer from '../containers/CenteredContainer'

export default ({ value, password, onChange, style, inputStyle, placeholder }) => {

    return (
        <CenteredContainer
            style={{
                overflow: 'hidden',
                ...style
            }}
        >
            <input
                value={value}
                type={password ? 'password' : 'text'}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                style={{
                    fontFamily: 'Antic Slab',
                    fontSize: '20px',
                    padding: '0px 15px',
                    width: '100%',
                    height: '100%',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid #1b1b1b',
                    ...inputStyle
                }}
            />
        </CenteredContainer>

    )
}