import { Button } from '@mui/material';
import React, { useState } from 'react';

interface GenestrationsHeaderSectionProps  {
    gameStatus: 'RUNNING' | 'PENDING' | 'UNKNOWN',
    start: () => void,
    reset: () => void
};

const GenestrationsHeaderSection: React.FC<GenestrationsHeaderSectionProps> = ({gameStatus, start, reset}) => {

    return (
        <div className="text-3xl font-bold underline flex row">
           <h1>Genestrations</h1>
           <button onClick={start} className="bg-violet-500 text-white active:bg-violet-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
            Start
            </button>
           <Button onClick={reset}>Reset</Button>
        </div>
    );
};

export default GenestrationsHeaderSection;