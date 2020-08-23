import React, { useMemo } from 'react'
import CenteredContainer from '../containers/CenteredContainer'
import AttackingCard from '../card/AttackingCard'

export default ({game, height}) => {

    const attacks = useMemo(() => game ? game.attacks : null, [game])
    
    return(
        <CenteredContainer>
            {attacks ? 
            attacks.map(({attackingCard, defendingCard}, index) => (
                <AttackingCard
                    card={attackingCard}
                    key={index}
                    height={height * 0.9}
                    defendingCard={defendingCard}
                /> 
            ))
            : null
        }
        </CenteredContainer>
    )
}