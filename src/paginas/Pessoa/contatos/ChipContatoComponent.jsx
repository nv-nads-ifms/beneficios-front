import React from 'react';
import { Chip } from "@mui/material";
import { ChipIcon } from '../../../api/format';

export default function ChipContatoComponent(props) {
    const { contato, color, onEdit, onDelete, ...others } = props;

    return (
        <Chip
            {...others}
            icon={ChipIcon(contato.tipoContato.nome)}
            label={contato.descricao}
            onDelete={onDelete}
            onClick={onEdit}
            color={color != null ? color : "primary"}
        />
    );
}