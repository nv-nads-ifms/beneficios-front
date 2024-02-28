import React from 'react';
import { CleaningServices } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { grey } from '@material-ui/core/colors';

export default function ClearIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Inativar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <CleaningServices style={{ color: grey[500] }} />
            </IconButton>
        </Tooltip>
    );
}