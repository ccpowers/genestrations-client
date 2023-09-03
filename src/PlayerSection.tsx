import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import JoinForm from './JoinForm';
import PendingPlayerSection from './PendingPlayerSection';
import RunningPlayerSection from './RunningPlayerSection';

interface PlayerSectionProps  {
    gameStatus: 'RUNNING' | 'PENDING',
    join: (player: string, prompt: string) => void,
    submit: (player: string, prompt: string) => void,
    connect: (player: string) => void,
    name: string
};

const PlayerSection: React.FC<PlayerSectionProps> = ({gameStatus, join, submit, connect, name}) => {

    return (
        <div>
            {gameStatus === 'PENDING' &&
                <PendingPlayerSection join={join} name={name}/>
            }

            {gameStatus === 'RUNNING' && 
                <RunningPlayerSection name={name} submit={submit} connect={connect}/>
            }
            
        </div>
    );
};

export default PlayerSection;