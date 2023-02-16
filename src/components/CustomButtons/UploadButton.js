import React from 'react';
import { Button } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';


export default function UploadButton(props) {
    const { caption } = props;

    return (
        <Button
            color="primary"
            startIcon={<PublishIcon />}
            {...props}
        >
            {caption}
        </Button>
    );
}