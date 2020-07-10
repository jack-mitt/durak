//be able to draw cards
//be able to poker rule
//be able to 
import React from "react";
import { drawCardFromDeck } from "../api";
function Player({ deckId, hand, key, pokerRuleCount }) {


    // componentDidMount = async () => {
    //     //draw 6 cards and add them to the hand
    //     //console.log(test);
    // }
    
    return (
        <div
            style={{
                background: 'red',
                height: '300px',
                marginBottom: '20px',
                width: '100%'
            }}
        >
            {deckId}
        </div>
    );

}

export default Player;