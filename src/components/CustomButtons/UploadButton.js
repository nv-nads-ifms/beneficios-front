import React from 'react';
import { Button } from "@mui/material";
import { Publish } from '@mui/icons-material';

export default function UploadButton(props) {
    const { caption } = props;

    return (
        <Button
            color="primary"
            startIcon={<Publish />}
            {...props}
        >
            {caption}
        </Button>
    );
}