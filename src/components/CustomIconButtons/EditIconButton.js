import React from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { EditOutlined } from "@material-ui/icons";

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