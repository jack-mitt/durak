import firebase from 'firebase/app'
import 'firebase/firestore'

import firebaseconfig from '../firebaseconfig'
import { create } from 'lodash'
import { createDeck } from '../api'

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
        
        let firstPlayerIndex = Math.floor(Math.random() * auxPlayers.length)
        let firstPlayer = auxPlayers[firstPlayerIndex]
        
        console.log(auxPlayers)
        console.log(firstPlayerIndex)

        //gameState:
        // 0 - Waiting to Start
        // 1 - In Progress
        // 2 - Finished
        let game = {
            //trump: drawTrumpCard(),
            title: `${host.username}'s game`,
            gameState: 0,
            invitedPlayers,
            hostId: host.id,
            players: auxPlayers,
            id: deckId,
            currentPlayer: firstPlayer.id
        }

        db.collection('games').doc(deckId).set(game).then(() => {
            callback({ game })
        }).catch(err => {
            console.log(err)
            callback({ error: 'Error creating game in database' })
        })
    })

}

export { fetchGameInvites, createGame, getUserData }
export default { fetchGameInvites, createGame, getUserData }