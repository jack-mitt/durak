import React, {useState, useEffect, useMemo} from "react";
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
function AttackTable({game}){

    const attacks = useMemo(() => game ? game.attacks : null, [game])
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
                height: attacks ? attacks.length * cardHeight : 0,
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