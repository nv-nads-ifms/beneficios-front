import React from 'react';
import BlockIcon from '@material-ui/icons/Block';
import { IconButton, Tooltip } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export default function BlockIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Inativar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <BlockIcon style={{ color: red[400] }} />
            </IconButton>
        </Tooltip>
    );
}