import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import JoinForm from './JoinForm';
import NextPromptForm from './NextPromptForm';
import { Button } from '@mui/material';

function App() {
  const [gameStatus, setGameStatus] = useState('PENDING');
  const [playerName, setPlayerName] = useState('');
  const [playerInGame, setPlayerInGame] = useState(false);

  const join = (name: string, prompt: string) => {
    console.log(`Player ${name} joined with initial prompt ${prompt}`);
    setPlayerName(name);
    setPlayerInGame(true);
  }

  const submit = (prompt: string) => {
    console.log(`Player ${playerName} submitted ${prompt}`)
  }

  const startGame = () => {
    setGameStatus('RUNNING');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> Genestrations </h1>
        <h2> Game is {gameStatus} </h2>
        {playerName === '' && 
            <JoinForm join={join} />
        }
        {playerInGame && gameStatus === 'PENDING' &&
            <Button onClick={startGame}>Start</Button>
        }
        {playerInGame && gameStatus === 'RUNNING' &&
            <NextPromptForm submit={submit} imageUrl={'localhost:8000/image3.jpeg'}/>
        }
        {playerInGame && gameStatus === 'FINISHED' &&
            <h3>Game over</h3>
        }
      </header>
    </div>
  );
}

export default App;
