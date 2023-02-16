import React from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';

export default function UploadIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Upload de arquivo"}>
            <IconButton
                {...props}
                aria-label="check">
                <PublishIcon />
            </IconButton>
        </Tooltip>
    );
}