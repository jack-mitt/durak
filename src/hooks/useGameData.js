import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import firebaseconfig from "../firebaseconfig";
import dbUtils from "../db/dbUtils";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseconfig);
}

const db = firebase.firestore();

export default ({ user }) => {
  let [game, setGame] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if(user && user.currentGame){
        let gameId = user.currentGame
        if (gameId) {
            unsubscribe = db
              .collection("games")
              .doc(gameId)
              .onSnapshot((res) => {
                setGame(res.data())
              });
          }
    }
    else{
        setGame(null)
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return {game}
};
