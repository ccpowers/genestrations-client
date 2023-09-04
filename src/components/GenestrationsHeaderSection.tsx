import { Button } from '@mui/material';
import React, { useState } from 'react';

interface GenestrationsHeaderSectionProps  {
    gameStatus: 'RUNNING' | 'PENDING' | 'UNKNOWN',
    start: () => void,
    reset: () => void
};

const GenestrationsHeaderSection: React.FC<GenestrationsHeaderSectionProps> = ({gameStatus, start, reset}) => {

    return (
        <div className="text-3xl text-white font-bold underline flex row">
           <h1>Genestrations</h1>
           <button onClick={start} disabled={gameStatus !== 'PENDING'} className="bg-violet-500 shawdow-md text-white active:bg-violet-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
            Start
            </button>
            <button onClick={reset} className="bg-violet-500 text-white active:bg-violet-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
            Reset
            </button>
        </div>
    );
};

export default GenestrationsHeaderSection;