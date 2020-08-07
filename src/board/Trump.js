import React from 'react';
import CenteredContainer from '../containers/CenteredContainer';

function Trump({code}){
    let imgPath = "./../../public/spade.png";
    let num = code[1];
    if(code[1] === "S"){
        imgPath = "./../../public/spade.png";
    }

    return (
        <CenteredContainer>
            {num}
            <img src={imgPath} alt={code} />
        </CenteredContainer>
    );
}

export default Trump;