import React, { useEffect, useState } from 'react';
import './App.css';
import JoinForm from './JoinForm';
import NextPromptForm from './NextPromptForm';
import { Button, LinearProgress } from '@mui/material';
import PlayersListDisplay from './PlayersListDisplay';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PlayerSection from './PlayerSection';
import GenestrationsHeaderSection from './GenestrationsHeaderSection';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const url = 'https://018b-72-80-40-33.ngrok-free.app';
function App() {
  const [gameStatus, setGameStatus] = useState<'PENDING' | 'RUNNING' | 'UNKNOWN'>('UNKNOWN');
  const [gamePlayers, setGamePlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');

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
        <GenestrationsHeaderSection gameStatus={gameStatus} start={startGame} reset={startGame} />
        <div className="sections">
        <div className="section-container">
            <PlayersListDisplay players={gamePlayers} />
        </div>
        <div className="section-container">
            {gameStatus === 'UNKNOWN' && 
              <div>Connecting to server...</div>
            }
            {gameStatus !== 'UNKNOWN' && 
              <PlayerSection gameStatus={gameStatus} name={playerName} join={join} connect={connect}/>
            }
        </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
