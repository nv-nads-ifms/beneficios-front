import React from 'react'; 
import { Button, Tooltip } from "@mui/material";
import { Add } from '@mui/icons-material';

export default function AddButton(props) {
    const { tooltip, label, ...others } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Adicionar registro"}>
            <Button
                variant="contained"
                color="primary"
                name="btAdicionar"
                startIcon={<Add />}
                {...others} >
                {label != null ? label : "Adicionar"}
            </Button>
        </Tooltip>
    );
}