import React from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

export default function ImageIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Visualizar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <AddPhotoAlternateIcon />
            </IconButton>
        </Tooltip>
    );
}