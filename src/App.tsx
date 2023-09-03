import React, { useEffect, useState } from 'react';
import './App.css';
import JoinForm from './JoinForm';
import NextPromptForm from './NextPromptForm';
import { Button, LinearProgress } from '@mui/material';
import PlayersListDisplay from './PlayersListDisplay';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PlayerSection from './PlayerSection';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const url = 'http://localhost:8000';
function App() {
  const [gameStatus, setGameStatus] = useState<'PENDING' | 'RUNNING'>('PENDING');
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

  // fake "connection" to server by just setting user name to whatever is input.
  // if user wants to cheat, go for it
  // TODO verify name is valid player
  const connect = (name: string) => {
    setPlayerName(name);
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
  const getNextImage = (playerName: string) => {
    console.log(`Getting next image for player ${playerName}`);
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
        } else {
          console.log(`Got image response ${JSON.stringify(data)}`);
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

       // stop polling when game is runnning
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
            <PlayerSection gameStatus={gameStatus} name={playerName} join={join} submit={submit} connect={connect}/>
        </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
