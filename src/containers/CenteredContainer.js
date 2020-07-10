import React from 'react'

export default ({style, children, ...props}) => 
<div
    style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
    }}
    {...props}
>
    {children}
</div>
