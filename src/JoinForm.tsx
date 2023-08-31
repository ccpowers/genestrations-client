import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface JoinFormProps  {
    join: (player: string, prompt: string) => void,
};

const JoinForm: React.FC<JoinFormProps> = ({join}) => {
    const [prompt, setPrompt] = useState('');
    const [name, setName] = useState('');

    const onClick = (e: any) => {
        join(name, prompt);
    };

    const onPromptInput = (e: any) => {setPrompt(e.target.value)};
    const onNameInput = (e: any) => {setName(e.target.value)};

    return (
        <div>
            <TextField label='Name' 
                value={name}
                onInput={onNameInput}
            />
            <TextField label='Initial Prompt'
                value={prompt}
                onInput={onPromptInput}
            />
            <Button onClick={onClick}>Join</Button>
        </div>
    );
};

export default JoinForm;