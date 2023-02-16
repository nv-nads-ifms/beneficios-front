import React from 'react';
import { Button } from "@material-ui/core";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';


export default function PhotoButton(props) {
    const { caption } = props;

    return (
        <Button
            color="primary"
            startIcon={<PhotoCameraIcon />}
            {...props}
        >
            {caption}
        </Button>
    );
}