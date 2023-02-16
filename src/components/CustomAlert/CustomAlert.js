import React from 'react';
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomAlert(props) {
    const { requestMessage, messageType, open, setOpen } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={messageType}>
                {requestMessage}
            </Alert>
        </Snackbar>
    );
}