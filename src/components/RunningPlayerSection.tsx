import React, { useState } from 'react';
import NextPromptForm from './NextPromptForm';
import ConnectForm from './ConnectForm';

interface RunningPlayerSectionProps  {
    connect: (player: string) => void,
    name: string
};

const RunningPlayerSection: React.FC<RunningPlayerSectionProps> = ({connect, name}) => {
    return (
        <div>
            {name === '' &&
                <ConnectForm connect={connect}/>
            }
            {name !== '' && 
                <NextPromptForm name={name}/>
            }
        </div>
    );
};

export default RunningPlayerSection;