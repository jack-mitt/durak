import React, { useState } from 'react';
import './App.css';
import { Layout } from './Layout.components';
import Board from "./board/CardGameBoard";
import useUserData from './hooks/useUserData';
import SignInPage from './auth/SignInPage';
import Background from './board/Background';
import GameMenu from './menus/GameMenu';
import CenteredContainer from './containers/CenteredContainer';

function LogOutButton({logOut, user}) {

  const [hovered, setHovered] = useState(false)

  return (
    <CenteredContainer
      onClick={logOut}
      style={{
        cursor: 'pointer',
        position: 'absolute',
        pointerEvents: user ? 'auto' : 'none',
        opacity: user ? (hovered ? 1 : 0.6) : 0,
        left: '10px',
        width: 'auto',
        height: 'auto',
        top: '10px',
        fontFamily: 'Antic Slab',
        color: 'white'
      }}
    >
      Log Out
    </CenteredContainer>
  )
}

function App() {
  const state = {
    playerCount: 2 //TODO
  };

  const { user, createGame, signIn, logOut, createUser } = useUserData()

  //TEMP FOR DEVELOPMENT
  //const user = {username: 'Tofeezy', gameInvites: ['testid']}

  return (
    <div className="App">
      <Layout>
        <Background />
        <SignInPage user={user} signIn={signIn} createUser={createUser} />
        <GameMenu createGame={createGame} user={user} />
        <LogOutButton user={user} logOut={logOut}/>
        <Board playerCount={state.playerCount} /> 
      </Layout>
    </div>
  );
}

export default App;
