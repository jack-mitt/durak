//be able to draw cards
//be able to poker rule
//be able to 
import React from "react";
import {drawCardFromDeck} from "./api";
class Player extends React.Component {

    deckId = this.props.deckId;

    componentDidMount = async () => {
        //draw 6 cards and add them to the hand
        //console.log(test);
    }

    render(){
        return (
            <div>
                
            </div>
        );
    }
}

export default Player;