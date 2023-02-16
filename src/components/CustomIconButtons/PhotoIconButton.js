import React from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

export default function PhotoIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Visualizar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <AddAPhotoIcon />
            </IconButton>
        </Tooltip>
    );
}