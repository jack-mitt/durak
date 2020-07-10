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

export const drawCardFromDeck = async (deckId, drawCount) => {
    const {data} = await api.get(`${deckId}/draw/`, {
        params: {
            count : drawCount,
        },
    });
    console.log(data);
    const { cards } = data;
    return cards;
}