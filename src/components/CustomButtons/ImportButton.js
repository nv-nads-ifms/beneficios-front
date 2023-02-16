import React from 'react'; 
import { Button, Tooltip } from "@material-ui/core";
import ImportExportIcon from '@material-ui/icons/ImportExport';

export default function ImportButton(props) {
    const { label, tooltip, ...others } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Importar"}>
            <Button
                variant="contained"
                startIcon={<ImportExportIcon />}
                color="primary"
                {...others}
            >
                {label != null ? label : "Importar"}
            </Button>
        </Tooltip>
    );
}