import React, { useState, useCallback, useMemo, useEffect } from 'react'
import CenteredContainer from '../containers/CenteredContainer'
import TextButton from '../inputs/TextButton'
import ToggleBox from '../inputs/ToggleBox'
import TextInput from '../inputs/TextInput'
import DarkTextInput from '../inputs/DarkTextInput'
import LoadingLogo from '../loading/LoadingLogo'
import { fetchGameInvites, createGame, getUserData } from '../db/dbUtils'

import waitingImg from './waiting.svg'
import readyImg from './checkmark.svg'


function PlayerInfo({ player }) {
    return (
        <CenteredContainer
            style={{
                height: 50,
                width: '90%',
                justifyContent: 'flex-start',
                fontSize: '20px',
                borderBottom: '1px solid #777',
                color: 'white'
            }}
        >
            {player.state ?
                <img src={player.state === 'ready' ? readyImg : waitingImg} style={{ height: 20, width: 20, marginRight: '5px' }} />
                :
                null
            }
            {player.username}
        </CenteredContainer>
    )
}

function ErrorMessage({ error, dismiss }) {

    return (
        <CenteredContainer
            onClick={dismiss}
            style={{
                opacity: error ? 1 : 0,
                pointerEvents: error ? 'auto' : 'none',
                position: 'absolute',
                fontSize: '20px',
                top: 0,
                left: 0,
                background: '#1b1b1b',
                transition: 'opacity 500ms',
                color: '#ef0000'
            }}
        >
            {error}
        </CenteredContainer>
    )
}

function ButtonTextInput({ buttonText, smallButtonText, placeholder, onSubmit }) {

    const [active, setActive] = useState(false)
    const [value, setValue] = useState('')

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (error) {
            setTimeout(() => setError(null), 2500)
        }
    }, [error])

    const handleSubmit = useCallback(() => {
        setLoading(true)
        onSubmit(value, ({ success, error }) => {
            if (error) {
                setTimeout(() => setLoading(false), 1000)
                setError(error)
            }
            else {
                setLoading(false)
                setActive(false)
                setValue('')
                setError(null)
            }
        })
    }, [onSubmit, value])

    return (
        <CenteredContainer
            style={{
                height: 80
            }}
        >
            <TextButton text={buttonText} onClick={() => setActive(true)} style={{ height: 15, width: 'auto' }} />
            <CenteredContainer
                style={{
                    position: 'absolute',
                    background: '#1b1b1b',
                    top: 0,
                    left: 0,
                    opacity: active ? 1 : 0,
                    pointerEvents: active ? 'auto' : 'none'
                }}
            >
                <DarkTextInput placeholder={placeholder} value={value} onChange={setValue} />
                <TextButton
                    text={smallButtonText}
                    onClick={handleSubmit}
                    style={{
                        position: 'absolute',
                        right: '5px',
                        height: '25px',
                        width: 60,
                        padding: '5px 10px',
                    }}
                />
            </CenteredContainer>
            <ErrorMessage dismiss={() => setError(null)} error={error} />
            <LoadingLogo style={{ width: '30%', width: null }} loading={loading} />
        </CenteredContainer>
    )
}

function AddPlayerButton({ addPlayer }) {

    const [active, setActive] = useState(false)
    const [playerUsername, setPlayerUsername] = useState('')

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (error) {
            setTimeout(() => setError(null), 2500)
        }
    }, [error])

    const handleAddPlayerClick = () => {
        setActive(true)
    }

    const handleAddPlayer = useCallback(() => {
        setLoading(true)
        addPlayer(playerUsername, ({ success, error }) => {
            if (error) {
                setTimeout(() => setLoading(false), 1000)
                setError(error)
            }
            else {
                setLoading(false)
                setActive(false)
                setPlayerUsername('')
                setError(null)
            }
        })
    }, [playerUsername])

    return (
        <CenteredContainer
            style={{
                height: 80
            }}
        >
            <TextButton text='+ ADD PLAYER' onClick={handleAddPlayerClick} style={{ height: 15, width: 'auto' }} />
            <CenteredContainer
                style={{
                    position: 'absolute',
                    background: '#1b1b1b',
                    top: 0,
                    left: 0,
                    opacity: active ? 1 : 0,
                    pointerEvents: active ? 'auto' : 'none'
                }}
            >
                <DarkTextInput placeholder='Username' value={playerUsername} onChange={setPlayerUsername} />
                <TextButton
                    text='+ ADD'
                    onClick={handleAddPlayer}
                    style={{
                        position: 'absolute',
                        right: '5px',
                        height: '25px',
                        width: 60,
                        padding: '5px 10px',
                    }}
                />
            </CenteredContainer>
            <ErrorMessage dismiss={() => setError(null)} error={error} />
            <LoadingLogo style={{ width: '30%', width: null }} loading={loading} />
        </CenteredContainer>
    )
}

function CreateGameButton({ players, createGame }) {

    const active = useMemo(() => players.length > 1, [players])

    const [hovered, setHovered] = useState(false)

    return (
        <CenteredContainer
            onClick={createGame}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                cursor: 'pointer',
                borderTop: `${active ? '1px' : '0px'} solid #777`,
                height: active ? 50 : 0,
                transition: 'height 500ms',
                fontSize: '20px',
                overflow: 'hidden',
                color: hovered ? 'white' : '#777',
                background: '#1b1b1b'
            }}
        >
            START GAME
        </CenteredContainer>
    )
}

function GameTitle({ title }) {
    return (
        <CenteredContainer
            style={{
                height: '50px',
                width: '90%',
                fontSize: '20px',
                borderBottom: '1px solid #777',
                color: 'white'
            }}
        >
            {title}
        </CenteredContainer>
    )

}

function CreateGameDialog({ user, hide, createGame, setLoading }) {

    const [players, setPlayers] = useState([user])

    const handleCreateGame = useCallback((players) => {
        if (players.length > 1) {
            setLoading(true)
            createGame(players, ({ error }) => {
                console.log(error)
                setLoading(false)
                setPlayers([user])
            })
        }
    }, [user])


    const height = useMemo(() => hide ? 0 : players.length * 50 + 50 + 80 + (players.length > 1 ? 50 : 0), [hide, players])

    const handleAddPlayer = useCallback((username, callback) => {

        getUserData(username, ({ user, error }) => {
            if (error) {
                callback({ error })
            }
            else {
                let newPlayers = [...players]
                newPlayers.push(user)
                setPlayers(newPlayers)
                callback({ success: true })
            }
        })

    }, [players])

    return (
        <CenteredContainer
            style={{
                opacity: hide ? 0 : 1,
                height,
                overflow: 'hidden',
                pointerEvents: hide ? 'none' : 'auto',
                transition: 'all 500ms',
                flexFlow: 'column',
            }}
        >
            <GameTitle title={`${user.username}'s game`} />
            {
                players.map((player, index) =>
                    <PlayerInfo player={player} key={index} />
                )
            }
            <ButtonTextInput
                onSubmit={handleAddPlayer}
                placeholder='Username'
                buttonText=' + Add Player'
                smallButtonText='+ Add'
            />
            <CreateGameButton players={players} createGame={() => handleCreateGame(players)} />

        </CenteredContainer>
    )
}

function GameInvite({ game }) {

    return (
        <CenteredContainer
            style={{
                height: 'auto',
                flexFlow: 'column'
            }}
        >
            <GameTitle title={game.title} />
            {game.players.map(player =>
                <PlayerInfo player={player} />
            )}
        </CenteredContainer>
    )
}

function JoinGameDialog({ user, hide, setLoading}) {

    const [gameInvites, setGameInvites] = useState(null)

    useEffect(() => {
        if (user) {
            fetchGameInvites(user, ({ error, gameInvites }) => {
                if (error) {

                }
                else {
                    setGameInvites(gameInvites)
                }

            })
        }
        else {
            setGameInvites([])
        }
    }, [user])

    const handleJoinGameById = useCallback((value, callback) => {
        setTimeout(() => callback({ success: true }), 3000)

    })

    return (
        <CenteredContainer
            style={{
                opacity: hide ? 0 : 1,
                pointerEvents: hide ? 'none' : 'auto',
                flexFlow: 'column',
                height: hide ? 0 : 'auto'
            }}
        >
            {
                gameInvites ? gameInvites.map(game =>
                    <GameInvite game={game} />
                )
                    :
                    null
            }
            <ButtonTextInput
                onSubmit={handleJoinGameById}
                buttonText='Join Game by ID'
                smallButtonText='Join'
                placeholder='Game ID'
            />
        </CenteredContainer>
    )
}

export default ({ user, createGame }) => {

    const [optionToggle, setOptionToggle] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <CenteredContainer
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                overflowY: 'auto',
                fontFamily: 'Antic Slab',
                alignItems: 'flex-start',
                opacity: user && !user.currentGame ? 1 : 0,
                pointerEvents: user && !user.currentGame ? 'auto' : 'none',
                transition: 'opacity 500ms'
            }}
        >
            {
                user ?
                    <CenteredContainer
                        style={{
                            maxWidth: 500,
                            margin: '30px 0px',
                            flexFlow: 'column',
                            background: '#1b1b1b',
                            height: 'auto'
                        }}
                    >
                        <ToggleBox second='Create Game' first='Join Game' value={optionToggle} set={setOptionToggle} />
                        <CreateGameDialog setLoading={setLoading} createGame={createGame} user={user} hide={!optionToggle} />
                        <JoinGameDialog user={user} hide={optionToggle} />
                        <LoadingLogo loading={loading} />
                    </CenteredContainer>
                    : null
            }
        </CenteredContainer>
    )
}