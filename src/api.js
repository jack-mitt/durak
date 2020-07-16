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