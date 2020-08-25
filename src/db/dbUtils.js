import firebase from 'firebase/app'
import 'firebase/firestore'

import firebaseconfig from '../firebaseconfig'
import { create } from 'lodash'
import { createDeck, drawTrump, recursiveDrawHands } from '../api'
import {checkLowest} from "../util/baseUtil";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseconfig)
}

const db = firebase.firestore()

const fetchGameInvites = (user, callback) => {
    db.collection('games').where('invitedPlayers', 'array-contains', user.id).get().then(res => {
        callback({gameInvites: res.docs.map(doc => doc.data())})
    }).catch(err => {
        console.log(err)
        callback({error: 'Internal Error'})
    })
}

const getUserData = (username, callback) => {
    console.log(username)
    db.collection('publicUserData').where('username', '==', username).get().then(res => {
        console.log(res.docs.length)
        if (res.docs.length) {
            callback({ user: res.docs[0].data() })
        }
        else {
            callback({ error: 'User does not exist' })
        }
    }).catch(err => {
        console.log(err)
        callback({ error: 'Internal Error' })
    })
}

const createGame = (host, players, callback) => {

    let auxPlayers = []
    let invitedPlayers = []

    console.log("in db create game");
    for (let i = 0; i < players.length; i++) {
        let player = {
            hand: [],
            key: i,
            pokerRuleCount: 2,
            ...players[i]
        }

        if(player.id === host.id){
            player.state = 'ready'
        }
        else {
            player.state = 'invited'
            invitedPlayers.push(player.id)
        }

        auxPlayers.push(player);
    }

    createDeck().then(deckId => {
        drawTrump(deckId).then(trumpCard => {
            console.log(auxPlayers);
            recursiveDrawHands(deckId, auxPlayers, [], (newPlayers) => {
                //console.log(newPlayers);
                let attackerIndex = checkLowest(newPlayers, trumpCard);
                //console.log(attackerIndex);
                let attackerId = newPlayers[attackerIndex].id;
                console.log(newPlayers)
                //gameState:
                // 0 - Waiting to Start
                // 1 - In Progress
                // 2 - Finished
                let game = {
                    //trump: drawTrumpCard(),
                    title: `${host.username}'s game`,
                    gameState: 0,
                    invitedPlayers,
                    attacks: [],
                    hostId: host.id,
                    players: newPlayers,
                    id: deckId,
                    currentPlayer: attackerId,
                    trump: trumpCard
                }

                db.collection('games').doc(deckId).set(game).then(() => {
                    callback({ game })
                }).catch(err => {
                    console.log(err)
                    callback({ error: 'Error creating game in database' })
                })
                //setAttacker(checkLowest(newPlayers, trump)); //decide who starts the game
              });

            
        })
        
    })

}

export { fetchGameInvites, createGame, getUserData }
export default { fetchGameInvites, createGame, getUserData }