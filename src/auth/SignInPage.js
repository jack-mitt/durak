import React, { useState, useCallback, useEffect } from 'react'
import CenteredContainer from '../containers/CenteredContainer'

import TextButton from '../inputs/TextButton'
import ToggleBox from '../inputs/ToggleBox'
import DarkTextInput from '../inputs/DarkTextInput'
import LoadingLogo from '../loading/LoadingLogo'


function ErrorMessage({ error }) {

    return (
        <CenteredContainer
            style={{
                height: error ? 50 : 0,
                transition: 'height 500ms',
                overflow: 'hidden',
                color: '#ff0000'
            }}
        >
            {error}
        </CenteredContainer>
    )
}

function SignInBox({ user, signIn, createUser }) {

    let [createAccountToggle, setCreateAccountToggle] = useState(false)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (error) {
            setTimeout(() => setError(null), 3000)
        }
    }, [error])

    const handleSubmit = useCallback(() => {

        setLoading(true)
        if (createAccountToggle) {
            createUser(email, username, password, confirmPassword, ({ success, error }) => {
                if (error) {
                    setError(error)
                    setLoading(false)
                }
            })
        }
        else {
            signIn(email, password, ({ success, error }) => {
                if (error) {
                    setError(error)
                    setLoading(false)
                }
            })
        }

    }, [signIn, createUser, createAccountToggle, username, password, confirmPassword, email])

    return (
            <CenteredContainer
                style={{
                    maxWidth: 500,
                    background: '#1b1b1b',
                    height: 'auto',
                    justifyContent: 'flex-start',
                    flexFlow: 'column',
                    overflow: 'hidden',
                    fontFamily: 'Antic Slab',
                }}
            >
                <ToggleBox first='SIGN IN' second='CREATE ACCOUNT' value={createAccountToggle} set={setCreateAccountToggle} />
                <DarkTextInput placeholder='Email' value={email} onChange={value => setEmail(value)} />
                <DarkTextInput placeholder='Username' hide={!createAccountToggle} value={username} onChange={value => setUsername(value)} />
                <DarkTextInput password placeholder='Password' value={password} onChange={value => setPassword(value)} />
                <DarkTextInput password placeholder='Confirm Password' hide={!createAccountToggle} value={confirmPassword} onChange={value => setConfirmPassword(value)} />
                <ErrorMessage error={error} />
                <TextButton onClick={handleSubmit} text={createAccountToggle ? 'REGISTER' : 'SIGN IN'} />
                <LoadingLogo loading={loading} />
            </CenteredContainer>
    )
}

export default ({ user, signIn, createUser }) => {


    return (
        <CenteredContainer
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: user ? 0 : 1,
                pointerEvents: user ? 'none' : 'auto',
                transition: 'opacity 500ms'
            }}
        >
            <SignInBox user={user} signIn={signIn} createUser={createUser} />
        </CenteredContainer>
    )
}