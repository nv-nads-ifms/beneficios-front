import React from 'react';
import RestoreIcon from '@material-ui/icons/Restore';
import { IconButton, Tooltip } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export default function RestoreIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Restaurar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <RestoreIcon style={{ color: blue[700] }} />
            </IconButton>
        </Tooltip>
    );
}