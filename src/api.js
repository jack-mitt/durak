import axios from "axios";

const api = axios.create({
  baseURL: "https://deckofcardsapi.com/api/deck/",
});

export const createDeck = async () => {
  const { data } = await api.get("new/shuffle/", {
    params: {
      deck_count: 1,
    },
  });
  const { deck_id: deckId } = data;

  return deckId;
};

export const drawTrump = async (deckId) => {
  const { data } = await api.get(`${deckId}/draw`, {
    params : {
      count : 1,
    },
  });

  const trump = data.cards[0];

  return trump;
}

export const drawCardFromDeck = (deckId, drawCount, callback) => {
    api.get(`${deckId}/draw/`, {
        params: {
            count : drawCount,
        },
    }).then(res => {
        callback(res.data.cards)
    }).catch(err => {
        console.log(err)
    });

}

export const recursiveDrawHands = (deckId, oldPlayers, newPlayers, callback) => {
  if (oldPlayers.length === 0) {
    callback(newPlayers);
    console.log("here");
  } else {
    drawCardFromDeck(deckId, 6, (hand) => {
      console.log(hand);
      newPlayers.push({ ...oldPlayers[0], hand });
      oldPlayers.splice(0, 1);
      recursiveDrawHands(deckId, oldPlayers, newPlayers, callback);
    });
  }
};