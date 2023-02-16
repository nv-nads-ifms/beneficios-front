import React from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { IconButton, Tooltip } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export default function StartIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Iniciar atendimento"}>
            <IconButton
                {...props}
                aria-label="check">
                <PlayCircleOutlineIcon style={{ color: blue[700] }} />
            </IconButton>
        </Tooltip>
    );
}