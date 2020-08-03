import React from 'react'
import CenteredContainer from '../containers/CenteredContainer'
import AttackingCard from '../card/AttackingCard'

export default ({attacks, height}) => {
    
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