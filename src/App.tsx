import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import JoinForm from './JoinForm';
import NextPromptForm from './NextPromptForm';
import { Button, LinearProgress } from '@mui/material';
import PlayersListDisplay from './PlayersListDisplay';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const url = 'http://localhost:8000';
function App() {
  const [gameStatus, setGameStatus] = useState('PENDING');
  const [playerName, setPlayerName] = useState('');
  const [playerInGame, setPlayerInGame] = useState(false);
  const [awaitingJoin, setAwaitingJoin] = useState(false);
  const [gamePlayers, setGamePlayers] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  // infoPollTimer should be running only before the start of the game
  let infoPollTimer: NodeJS.Timer | null = null;
  // fetch data from server
  useEffect(() => {
    // updateInfo();
    if (infoPollTimer === null) {
        infoPollTimer = setInterval(()=> updateInfo(), 500);
    }
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

  // polling for image updates
  const getNextImage = () => {
    fetch(`${url}/image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({player: playerName})
      })
      .then((response) => response.json())
      .then((data) => {
        if( data.success && data.url ) {
            setImageUrl(data.url);
        }
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
    <ThemeProvider theme={darkTheme}>
        <h1> Genestrations </h1>
        <div className="sections">
        <div className="section-container">
            <p> Game is {gameStatus} </p>
            {playerInGame && gameStatus === 'PENDING' &&
                <Button onClick={startGame}>Start</Button>
            }
        </div>
        <div className="section-container">
            <PlayersListDisplay players={gamePlayers} />
        </div>
        <div className="section-container">
        {playerName === '' && !awaitingJoin && gameStatus === 'PENDING' && 
                <JoinForm join={join} />
        }
        {playerName === '' && !awaitingJoin && gameStatus !== 'PENDING' && 
                <p>You can't join a running game.</p>
        }
        {awaitingJoin &&
            <LinearProgress />
        }
        {playerInGame && gameStatus === 'RUNNING' &&
            <NextPromptForm submit={submit} imageUrl={imageUrl}/>
        }
        </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
