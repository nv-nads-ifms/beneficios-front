import { Add } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';


export default function AddIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Adicionar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <Add style={{ color: blue[600] }} />
            </IconButton>
        </Tooltip>
    );
}