import React from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

export default function CheckIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Aprovar"}>
            <IconButton
                {...props}
                aria-label="check">
                <DoneOutlineIcon style={{ color: green[500] }} />
            </IconButton>
        </Tooltip>
    );
}