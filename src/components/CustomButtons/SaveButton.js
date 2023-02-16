import React from 'react';
import { Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

export default function SaveButton(props) {
    const { label, ...others } = props;
    return (
        <Button
            variant="contained"
            color="primary"
            name="btSalvar"
            startIcon={<SaveIcon />}
            {...others}
        >
            {label != null ? label : "Salvar"}
        </Button>
    );
}