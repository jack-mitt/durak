import React, {useState} from "react";
import Button from '@material-ui/core/Button';

function Tile({attackingCard, height}){


    const atkCode = attackingCard.code

    const [defCode, setDefCode] = useState(null);
    const [selected, setSelected] = useState(false);


    const showCard = () => {
        setSelected(selected ? false : true);
    }

    return (
        <div
            style={{
                color: "white",
                backgroundColor: atkCode[1] === "H" || atkCode[1] === "D" ? "red" : "black",
                width: "100%",
                height,
                border: "1px solid white" 
            }}
            selected={selected}
        >
            
            <Button
                style={{
                    backgroundColor: "white",
                    marginTop: '2px',
                    marginBottom: '2px',
                }}
                disabled={defCode}
                width="100%"
                onClick={showCard}
            >
                {atkCode}
            </Button>
            {/* <img 
                style={{
                    opacity: selected ? 1 : 0,
                    marginLeft: "100%",
                }}
                src={atkImage} 
                alt={atkCode} 
                id='atkTable.card.${atkCode}'
            /> */}
        </div>

    );
}

export default Tile;