import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DNADeleteIconButton(props) {
    const { onDelete, callback } = props;

    const handleDelete = () => {
        onDelete(props.row);
        callback();
    };

    return (
        <Tooltip title="Excluir os dados deste registro">
            <IconButton aria-label="excluir" onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    );
}