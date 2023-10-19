import { Typography } from '@mui/material';
import React from 'react';

export default function DNALabel(props) {
    const { children } = props;

    return (
        <Typography 
            {...props}
            >
            {children}
        </Typography>
    );
}