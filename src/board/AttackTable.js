import React, {useState, useEffect} from "react";
import Tile from './Tile';
import { update } from "lodash";
/**
 * 
 * @param {Card} attackingCards cards that are attacking
 * @param {Player} defendingPlayer player that will have to beat each attacking card or choose
 * to take the attacking cards
 * @param {Array[Player]} attackingPlayers players who can add to the attack
 * @param {String} trump suit that can beat any other suit  
 */
function AttackTable({attackingCards, defendingPlayer, attackingPlayers, trump}){
    const [legalAttacks, setLegalAttacks] = useState(null);
    const [openAttacks, setOpenAttacks] = useState(null);
    const [beatAttacks, setBeatAttacks] = useState(null);
    const [defendingCards, setDefendingCards] = useState(null);
    
    //let defendingHandCount = defendingPlayer.hand;

    useEffect(() =>{
        console.log("here");
        
    }, [attackingCards]);

    return(
        <div>Attack table</div>
    );
}

export default AttackTable;