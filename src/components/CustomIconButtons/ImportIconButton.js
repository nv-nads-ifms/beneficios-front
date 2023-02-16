import React from 'react';

import { IconButton, Tooltip } from "@material-ui/core";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { blue } from "@material-ui/core/colors";

export default function ImportIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Importar registro"}>
            <IconButton
                {...props}
                aria-label="check">
                <ImportExportIcon style={{ color: blue[600] }} />
            </IconButton>
        </Tooltip>
    );
}