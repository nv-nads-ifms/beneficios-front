import React from 'react';
import { Button } from "@material-ui/core";

export default function YesNoButton(props) {
    const { label } = props;
    return (
        <Button
            variant="contained"
            color="primary"
            type="button"
            {...props}
        >
            {label}
        </Button>
    );
}