import React from 'react'; 
import { Button, Tooltip } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

export default function AddButton(props) {
    const { tooltip, label, ...others } = props;
    return (
        <Tooltip title={tooltip != null ? tooltip : "Adicionar registro"}>
            <Button
                variant="contained"
                color="primary"
                name="btAdicionar"
                startIcon={<AddIcon />}
                {...others} >
                {label != null ? label : "Adicionar"}
            </Button>
        </Tooltip>
    );
}