import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton, Tooltip } from "@material-ui/core";
import { red } from '@material-ui/core/colors';

export default function ClearIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Inativar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <ClearIcon style={{ color: red[300] }} />
            </IconButton>
        </Tooltip>
    );
}