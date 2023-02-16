import React from 'react';
import { IconButton, Tooltip } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';

export default function DownloadIconButton(props) {
    const { tooltip } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Baixar registro"}>
            <IconButton
                {...props}
                aria-label="baixar">
                <GetAppIcon color="primary" />
            </IconButton>
        </Tooltip>
    );
}