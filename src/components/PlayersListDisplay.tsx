import React from 'react';
import Chip from '@mui/material/Chip';

interface PlayersListProps {
  players: string[];
}

const PlayersListDisplay: React.FC<PlayersListProps> = ({ players }) => {
    const colors = ["red", "blue", "green", "yellow", "orange", "purple", "brown", "pink"];

    return (
        <div>
            <h2>Players online</h2>
            {players.map((player, index) => (
                <p key={index} className="player-name">
                {/* <Chip
                    key={index}
                    label={player}
                    style={{ backgroundColor: colors[index % colors.length], margin: '5px' }}
                /> */}
                {player}
                </p>
            ))}
        </div>
    );
}

export default PlayersListDisplay;