import { Clear } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';

export default function ClearIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Inativar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <Clear style={{ color: red[300] }} />
            </IconButton>
        </Tooltip>
    );
}