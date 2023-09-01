import React from 'react';
import Chip from '@mui/material/Chip';

interface PlayersListProps {
  players: string[];
}

const PlayersListDisplay: React.FC<PlayersListProps> = ({ players }) => {
    const colors = ["red", "blue", "green", "yellow", "orange", "purple", "brown", "pink"];

    return (
        <div>
            {players.map((player, index) => (
                <Chip
                    key={index}
                    label={player}
                    style={{ backgroundColor: colors[index % colors.length], margin: '5px' }}
                />
            ))}
        </div>
    );
}

export default PlayersListDisplay;