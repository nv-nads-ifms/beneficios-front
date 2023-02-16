import React from 'react';
import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export default function SendButton(props) {
    const { type, onClickHandler } = props;
    return (
        <Button
            {...props}
            type={type != null ? type : "submit"}
            variant="contained"
            color="primary"
            name="btEnviar"
            onClick={onClickHandler}
            startIcon={<SendIcon />}
        >
            Enviar
        </Button>
    );
}