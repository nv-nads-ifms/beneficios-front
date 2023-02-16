import React from 'react';
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function BackButton(props) {
    const { className } = props;
    let history = useHistory();
    const handleClick = (event) => {
        history.go(-1);
    };

    return (
        <Button
            {...props}
            type="button"
            variant="contained"
            color="secondary"
            name="btVoltar"
            className={className}
            startIcon={<ArrowBackIcon />}
            onClick={(event) => handleClick(event)}
        >
            Voltar
        </Button>
    );
}