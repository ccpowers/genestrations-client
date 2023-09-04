import { Button } from '@mui/material';
import React, { useState } from 'react';

interface GenestrationsHeaderSectionProps  {
    gameStatus: 'RUNNING' | 'PENDING' | 'UNKNOWN',
    start: () => void,
    reset: () => void
};

const GenestrationsHeaderSection: React.FC<GenestrationsHeaderSectionProps> = ({gameStatus, start, reset}) => {

    return (
        <div className="header-section">
           <h1>Genestrations</h1>
           <Button onClick={start}>Start</Button>
           <Button onClick={reset}>Reset</Button>
        </div>
    );
};

export default GenestrationsHeaderSection;