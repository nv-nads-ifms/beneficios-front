import React from 'react';
import { Chip } from "@material-ui/core";
import { ChipIcon } from '../../../api/format';

export default function ChipContatoComponent(props) {
    const { contato, color, onEdit, onDelete, ...others } = props;

    return (
        <Chip
            {...others}
            icon={ChipIcon(contato.tipoContatoDto.descricao)}
            label={contato.descricao}
            onDelete={onDelete}
            onClick={onEdit}
            color={color != null ? color : "primary"}
        />
    );
}