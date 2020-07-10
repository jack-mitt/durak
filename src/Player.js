//be able to draw cards
//be able to poker rule
//be able to 
import React from "react";
import {drawCardFromDeck} from "./api";
class Player extends React.Component {
    state = {
        hand: [],
        myTurn: false,
        defending: false,
    }

    deckId = this.props.deckId;

    componentDidMount = async () => {
        //draw 6 cards and add them to the hand
        let test = await drawCardFromDeck(this.deckId, 6);
        //console.log(test);
    }

    render(){
        return (
            <div>
                I am a player.
            </div>
        );
    }
}

export default Player;