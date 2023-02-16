import React from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { DeleteOutlined } from "@material-ui/icons";

export default function DeleteIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Excluir registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <DeleteOutlined style={{ color: red[400] }} />
            </IconButton>
        </Tooltip>
    );
}