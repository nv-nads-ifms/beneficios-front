import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import { IconButton, Tooltip } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export default function AddIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Adicionar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <AddIcon style={{ color: blue[600] }} />
            </IconButton>
        </Tooltip>
    );
}