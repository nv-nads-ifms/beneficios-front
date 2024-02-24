import React from 'react';
import { Search } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function SearchIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Inativar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <Search style={{ color: blue[600] }} />
            </IconButton>
        </Tooltip>
    );
}