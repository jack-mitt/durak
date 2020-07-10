import React from 'react';
import './App.css';
import {Layout} from './Layout.components';
import Board from "./board/CardGameBoard";

function App() {
  const state = {
    playerCount: 2 //TODO
  };

  return (
    <div className="App">
      <Layout>
        <Board playerCount={state.playerCount}/>
      </Layout>
    </div>
  );
}

export default App;
