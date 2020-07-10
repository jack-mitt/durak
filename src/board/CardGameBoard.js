import React from "react";
import { createDeck, drawCardFromDeck } from "../api";
import Player from "../player/Player";


class CardGameBoard extends React.Component {
    state = {
        gameOver: false, //if the game is over or not 
        user: null, //users whos hand we should display
        direction: null, //direction that the game is going in
        players: [] //array of players that are currently in the game
    };

    playerCount = this.props.playerCount;
    deckId = null; //deck for the current game
    componentDidMount = async () => {
        //create deck and give players their hands
        //this.makePlayerArray(this.props.playerCount);
        this.deckId = await createDeck();
        console.log(this.deckId);
        let auxPlayers = [];
        for(let i = 0; i < this.playerCount; i++){
            auxPlayers.push(
                {
                    hand: [],
                    key: i,
                    pokerRuleCount: 2   
                }
            );
            auxPlayers[i].hand = await drawCardFromDeck(this.deckId, 6);
        }
        this.setState({players: auxPlayers});

    }

    makePlayerArray  = () => {
        //create array with player objects with length determined by the user
        
    }
    // TODO how do we know which player is the 'main' one
    // assign each client a key and that corresponds to the key in the player element?
    render(){
        return (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    flexFlow: 'column',
                    justifyContent: 'flex-start'
                }}
            >
                This is the game board
                {this.state.players.map(({key, hand, pokerRuleCount}) => 
                    <Player hand={hand} key={key} pokerRuleCount={pokerRuleCount} />    
                )}
            </div>
        );
    }
}

export default CardGameBoard;