import React, { useEffect, useMemo } from 'react';
import CenteredContainer from '../containers/CenteredContainer';
import {suiteAscii, suiteColor} from "./../util/baseUtil";

function Trump({game, height}){

    let trump = useMemo(() => game ? game.trump : null, [game])
    let code = useMemo(() => trump ? trump.code: null, [trump])
    
    const aspectRatio = 0.7;
    
    let cardString = useMemo(() => {
        if(code){
            let num = code[0]
            let suite = suiteAscii[code[1]]
            return `${num === "0" ? 10 : num} ${suite}`
        }
    }, [code])

    return (
        <CenteredContainer
            style={{
                color : code ? suiteColor[code[1]] : "white",
                height : height * 0.5,
                width: height * aspectRatio,
                position: 'absolute',
                top: '35%',
                right: '0px',
                opacity: code ? 1 : 0,
                marginRight: '1%',
            }}
        >
            <h1>{cardString}</h1>
            
        </CenteredContainer>
    );
}

export default Trump;