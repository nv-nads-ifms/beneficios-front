import React from 'react';
import { Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

export default function EditButton(props) {
    const { caption } = props;

    return (
        <Button
            {...props}
            startIcon={<EditIcon />}
        >
            {caption}
        </Button>
    );
}