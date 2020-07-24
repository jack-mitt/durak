import React, {useState, useEffect} from "react";
import Tile from "./Tile";
import { update } from "lodash";
/**
 * 
 * @param {Card} attackingCards cards that are attacking
 * @param {Player} defendingPlayer player that will have to beat each attacking card or choose
 * to take the attacking cards
 * @param {Array[Player]} attackingPlayers players who can add to the attack
 * @param {String} trump suit that can beat any other suit  
 */
function AttackTable({attacks, defendingPlayer, attackingPlayers, trump}){
    const cardHeight = 40;
    const [legalAttacks, setLegalAttacks] = useState(null);
    const [openAttacks, setOpenAttacks] = useState(null);
    const [beatAttacks, setBeatAttacks] = useState(null);
    const [defendingCards, setDefendingCards] = useState(null);
    
    //let defendingHandCount = defendingPlayer.hand;

    useEffect(() =>{
        console.log(attacks);
    }, [attacks]);

    return(
        <div
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                height: attacks.length * cardHeight,
                width: "150px",
                float: "right",
                justifyContent: "right"
            }}
        >
            Attack table
            {attacks ?
            attacks.map(({attackingCard}) =>
            <Tile 
                attackingCard={attackingCard}
                key={attackingCard.code}
                height={cardHeight}
            />
            ) : null}
        </div>
    );
}

export default AttackTable;