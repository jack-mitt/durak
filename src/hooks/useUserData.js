import { useState, useEffect, useCallback } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import firebaseconfig from '../firebaseconfig'
import dbUtils from '../db/dbUtils'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseconfig)
}

const auth = firebase.auth()
const db = firebase.firestore()


export default () => {

    const [user, setUser] = useState(null)

    //check if user is already signed in
    useEffect(() => {
        auth.onAuthStateChanged(currentUser => {
            if (currentUser) {
                let id = currentUser.uid
                db.collection('users').doc(id).get().then(res => {
                    setUser({ ...res.data(), id })
                }).catch(err => {
                    console.log(err)
                })
            }
            else{
                setUser(null)
            }
        })
  
    }, [])

    const createUser = (email, username, password, confirmPassword, callback) => {
        if (email) {
            if (username) {
                db.collection('publicUserData').where('username', '==', username).get().then(res => {
                    if (res.docs.length) {
                        callback({ error: 'Username already exists.' })
                    }
                    else {
                        if (password) {
                            if (password === confirmPassword) {
                                auth.createUserWithEmailAndPassword(email, password).then(res => {
                                    let id = res.user.uid
                                    let userRef = db.collection('users').doc(id)
                                    userRef.set({ email, username, id }).then(() => {
                                        let publicUserRef = db.collection('publicUserData').doc(id)
                                        publicUserRef.set({ username, id }).then(() => {
                                            setTimeout(() => setUser({ email, username, id }), 1000)
                                            callback({ success: true })
                                        }).catch(err => {
                                            console.log(err)
                                            callback({ error: 'Public Database Error' })
                                        })
                                    }).catch(err => {
                                        console.log(err)
                                        callback({ error: 'Database Error' })
                                    })
                                }).catch(err => {
                                    callback({ error: err.message })
                                })
                            }
                            else {
                                callback({ error: 'Passwords must match' })
                            }
                        }
                        else {
                            callback({ error: 'A valid password is required' })
                        }
                    }

                })
            }
            else {
                callback({ error: 'A valid username is required' })
            }
        }
        else {
            callback({ error: 'A valid email address is required' })
        }
    }

    const signIn = (email, password, callback) => {
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            auth.signInWithEmailAndPassword(email, password).then(res => {
                let id = res.user.uid
                db.collection('users').doc(id).get().then(res => {
                    console.log(res.data())
                    setTimeout(() => setUser({ ...res.data(), id }), 1000)
                    callback({ success: true })
                }).catch(err => {
                    console.log(err)
                    callback({ error: 'Database Error' })
                })
            }).catch(err => {
                callback({ error: err.message })
            })
        }).catch(err => {
            console.log(err)
            callback({ error: 'Internal Error' })
        })

    }

    const logOut = () => {
        auth.signOut()
    }

    const createGame = useCallback((players, callback) => {
        console.log("in create game")
        dbUtils.createGame(user, players, ({ game, error }) => {
            if (error) {
                callback({error})
            }

            
            else{
                if(game){
                    db.collection('users').doc(user.id).update({
                        currentGame: game.id, activeGames: firebase.firestore.FieldValue.arrayUnion(game.id)
                    }).then(() => {
                        let auxUser = {...user}
                        auxUser.currentGame = game.id
                        setUser(auxUser)
                        callback({success : true})
                    }).catch(err => {
                        console.log(err)
                        callback({error: 'Internal Error'})
                    })
                }
                else{
                    callback({error: 'Internal Error'})
                }
            }
        })
    }, [user])


    return { createUser, signIn, logOut, user, createGame }
}