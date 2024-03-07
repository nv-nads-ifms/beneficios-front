import React from 'react'; 
import { ImportExport } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';

export default function ImportButton(props) {
    const { label, tooltip, ...others } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Importar"}>
            <Button
                variant="contained"
                startIcon={<ImportExport />}
                color="primary"
                {...others}
            >
                {label != null ? label : "Importar"}
            </Button>
        </Tooltip>
    );
}