import React from 'react'
import TextInput from './TextInput'

export default ({ hide, ...props }) => {

    return (
        <TextInput
            style={{ height: hide ? 0 : 50, width: '95%', transition: 'height 500ms' }}
            inputStyle={{ color: '#fefefe', borderBottom: 'none' }}
            {...props}
        />
    )

}      