import { MeetingRoom } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';


export default function CloseButton(props) {
    return (
        <Button
            variant="contained"
            color="primary"
            name="btEdit"
            type="button"
            startIcon={<MeetingRoom />}
            {...props}
        >
            Fechar
        </Button>
    );
}