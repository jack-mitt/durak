export const isLetter = (str) => {
    return str.length === 1 && str.match(/[A-Z]/i);
}

export const checkLowest = (players, trumpCard) => {
    // console.log(players);
    console.log(trumpCard);
    let minTrump = null;
    let minPlayerIndex = null;
    let auxNum = null
    for (let i = 0; i < players.length; i++){
      for(let j = 0; j < 6; j++){
        //console.log(players[i].hand[j]);
        if(players[i].hand[j].code[1] === trumpCard.code[1]){
          if(isLetter(players[i].hand[j].code[0])){
            auxNum = players[i].hand[j].code[0].charCodeAt(0) - 97;
            auxNum = Math.abs(auxNum);
            //console.log(auxNum);
          } else if(players[i].hand[j].code[0] === 0) {
            auxNum = 10;
          } else {
            auxNum = players[i].hand[j].code[0];
          }
          if(auxNum < minTrump){
            minTrump = auxNum;
            if(minPlayerIndex && minPlayerIndex !== i){
              minPlayerIndex = i;
            } else {
              minPlayerIndex = i;
            }
          } else {
            minTrump = auxNum;
          }
          if(!minPlayerIndex){
            minPlayerIndex = i;
          }
        }
      }
    }
    console.log(minTrump);
    console.log(minPlayerIndex);
    if(minPlayerIndex === null){
      return 0;
    } else {
      return minPlayerIndex;
    }
}

