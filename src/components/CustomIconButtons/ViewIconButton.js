import React from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function ViewIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Visualizar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <VisibilityIcon />
            </IconButton>
        </Tooltip>
    );
}