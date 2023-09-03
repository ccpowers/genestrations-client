import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import JoinForm from './JoinForm';

interface PendingPlayerSectionProps  {
    join: (player: string, prompt: string) => void,
    name: string
};

const PendingPlayerSection: React.FC<PendingPlayerSectionProps> = ({join, name}) => {
    return (
        <div>
            {name === '' &&
                <JoinForm join={join}/>
            }
            {name !== '' && 
                <div>You're all set. Wait for others to join or start the game.</div>
            }
        </div>
    );
};

export default PendingPlayerSection;