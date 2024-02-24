import { EditOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { orange } from '@mui/material/colors';
import React from 'react';

export default function EditIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Alterar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <EditOutlined style={{ color: orange[700] }} />
            </IconButton>
        </Tooltip>
    );
}