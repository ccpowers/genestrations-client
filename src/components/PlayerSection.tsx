import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import JoinForm from './JoinForm';
import PendingPlayerSection from './PendingPlayerSection';
import RunningPlayerSection from './RunningPlayerSection';

interface PlayerSectionProps  {
    gameStatus: 'RUNNING' | 'PENDING' | 'UNKNOWN',
    join: (player: string, prompt: string) => void,
    connect: (player: string) => void,
    name: string
};

const PlayerSection: React.FC<PlayerSectionProps> = ({gameStatus, join,  connect, name}) => {

    return (
        <div>
            {gameStatus === 'PENDING' &&
                <PendingPlayerSection join={join} name={name}/>
            }

            {gameStatus === 'RUNNING' && 
                <RunningPlayerSection name={name} connect={connect}/>
            }
            
        </div>
    );
};

export default PlayerSection;