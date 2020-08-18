import React, { useEffect } from 'react';
import CenteredContainer from '../containers/CenteredContainer';

function Trump({code, height}){
    const aspectRatio = 0.7;
    let imgPath, num = null;
    if(code !== null){
        imgPath = "./../../spade.png";
        num = code[0];
    }

    return (
        <CenteredContainer
            style={{
                color : "white",
                height : height * 0.5,
                width: height * aspectRatio,
                position: 'absolute',
                top: '35%',
                right: '0px',
                opacity: code ? 1 : 0,
                marginRight: '1%',
            }}
        >
            <h1>{num === "0" ? 10 : num}</h1>
            <img 
                src={imgPath} 
                alt={code}
                height={height * 0.9}
             />
        </CenteredContainer>
    );
}

export default Trump;