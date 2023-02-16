import React from 'react';
import { Button } from "@material-ui/core";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export default function CloseButton(props) {
    return (
        <Button
            variant="contained"
            color="primary"
            name="btEdit"
            type="button"
            startIcon={<MeetingRoomIcon />}
            {...props}
        >
            Fechar
        </Button>
    );
}