import React from 'react';
import { Button } from "@mui/material";
import { Navigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

export default function BackButton(props) {

    const handleClick = (event) => {
        <Navigate to={-1} />
    };

    return (
        <Button
            {...props}
            type="button"
            variant="contained"
            color="secondary"
            name="btVoltar"
            startIcon={<ArrowBack />}
            onClick={(event) => handleClick(event)}
        >
            Voltar
        </Button>
    );
}