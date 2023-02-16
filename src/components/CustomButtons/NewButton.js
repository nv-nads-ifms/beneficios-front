import React from 'react';
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

export default function NewButton(props) {
    const { label } = props
    return (
        <Button
            variant="contained"
            color="primary"
            type="button"
            name="btAdicionar"
            startIcon={<AddIcon />}
            {...props}
        >
            {label}
        </Button>
    );
}