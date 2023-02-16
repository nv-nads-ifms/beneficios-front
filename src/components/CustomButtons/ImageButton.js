import React from 'react';
import { Button } from "@material-ui/core";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';


export default function ImageButton(props) {
    const { caption } = props;

    return (
        <Button
            color="primary"
            startIcon={<AddPhotoAlternateIcon />}
            {...props}
        >
            {caption}
        </Button>
    );
}