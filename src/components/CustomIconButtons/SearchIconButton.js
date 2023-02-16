import React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Tooltip } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export default function SearchIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Inativar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <SearchIcon style={{ color: blue[600] }} />
            </IconButton>
        </Tooltip>
    );
}