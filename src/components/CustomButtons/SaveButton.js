import React from 'react';
import { Save } from '@mui/icons-material';
import { Button } from '@mui/material';

export default function SaveButton(props) {
    const { label, ...others } = props;
    return (
        <Button
            variant="contained"
            color="primary"
            name="btSalvar"
            startIcon={<Save />}
            {...others}
        >
            {label != null ? label : "Salvar"}
        </Button>
    );
}