import React from 'react';
import { Button } from "@material-ui/core";
import ReplayIcon from '@material-ui/icons/Replay';


export default function ReloadButton(props) {
    const { caption } = props;

    return (
        <Button
            color="primary"
            startIcon={<ReplayIcon />}
            {...props}
        >
            {caption}
        </Button>
    );
}