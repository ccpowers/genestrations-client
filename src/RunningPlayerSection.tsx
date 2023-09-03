import React, { useState } from 'react';
import NextPromptForm from './NextPromptForm';
import ConnectForm from './ConnectForm';

interface RunningPlayerSectionProps  {
    submit: (player: string, prompt: string) => void,
    connect: (player: string) => void,
    name: string
};

const RunningPlayerSection: React.FC<RunningPlayerSectionProps> = ({submit, connect, name}) => {
    // combine player name and prompt guess in this component
    const submitPrompt = (prompt: string) => {
        submit(name, prompt);
    }

    return (
        <div>
            {name === '' &&
                <ConnectForm connect={connect}/>
            }
            {name !== '' && 
                <NextPromptForm submit={submitPrompt} imageUrl={''}/>
            }
        </div>
    );
};

export default RunningPlayerSection;