import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import JoinForm from './JoinForm';
import NextPromptForm from './NextPromptForm';
import { Button, LinearProgress } from '@mui/material';
import PlayersListDisplay from './PlayersListDisplay';

const url = 'http://localhost:8000';
function App() {
  const [gameStatus, setGameStatus] = useState('PENDING');
  const [playerName, setPlayerName] = useState('');
  const [playerInGame, setPlayerInGame] = useState(false);
  const [awaitingJoin, setAwaitingJoin] = useState(false);
  const [gamePlayers, setGamePlayers] = useState([]);

  let infoPollTimer: NodeJS.Timer | null = null;
  // fetch data from server
  useEffect(() => {
    updateInfo();
    infoPollTimer = setInterval(()=> updateInfo(), 10000);
  }, []);

  // functions to pass in to other forms
  const join = (name: string, prompt: string) => {
    setAwaitingJoin(true);
    console.log(`Player ${name} joined with initial prompt ${prompt}`);
  fetch(`${url}/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({player: name, prompt: prompt})
  })
    .then((response) => response.json())
    .then((data) => {
       console.log(data); // how to get json data from this??
       // TODO validate type of data
       if (data.success === true) {
        setPlayerName(name);
        setPlayerInGame(true);
        setAwaitingJoin(false);
       } else {
        console.log(`Failed to register player: ${data.msg}`)
       }
    })
    .catch((err) => {
       console.log(err.message);
    });
  }

  const submit = (prompt: string) => {
    console.log(`Player ${playerName} submitted ${prompt}`)
  }

  const startGame = () => {
    fetch(`${url}/start`).then((resp) => {
        setGameStatus('RUNNING');
    }).catch((e) => {
        console.log(`Error starting game: ${JSON.stringify(e)}`)
    })
  }

  // polling for game updates
  const updateInfo = () => {
    fetch(`${url}/info`).then((response) => response.json())
    .then((data) => {
       //console.log(data);
       setGameStatus(data.status);
       setGamePlayers(data.players);

       if (data.status === 'RUNNING' && infoPollTimer != null) {
        clearInterval(infoPollTimer);
        infoPollTimer = null;
       }
    })
    .catch((err) => {
       console.log(err.message);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> Genestrations </h1>
        <h2> Game is {gameStatus} </h2>
        <PlayersListDisplay players={gamePlayers} />
        {playerName === '' && !awaitingJoin &&
            <JoinForm join={join} />
        }
        {awaitingJoin &&
            <LinearProgress />
        }
        {playerInGame && gameStatus === 'PENDING' &&
            <Button onClick={startGame}>Start</Button>
        }
        {playerInGame && gameStatus === 'RUNNING' &&
            <NextPromptForm submit={submit} imageUrl={'http://localhost:8000/image3.jpeg'}/>
        }
        {playerInGame && gameStatus === 'FINISHED' &&
            <h3>Game over</h3>
        }
      </header>
    </div>
  );
}

export default App;
