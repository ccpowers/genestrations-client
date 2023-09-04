import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface ConnectFormProps  {
    connect: (player: string) => void,
};

const ConnectForm: React.FC<ConnectFormProps> = ({connect}) => {
    const [name, setName] = useState('');

    const onClick = (e: any) => {
        connect(name);
    };

    const onNameInput = (e: any) => {setName(e.target.value)};

    return (
        <div>
            <TextField label='Name' 
                value={name}
                onInput={onNameInput}
                sx={{
                    width: 300,
                    color: 'white',
                  }}
            />
            <Button onClick={onClick}>Connect</Button>
        </div>
    );
};

export default ConnectForm;