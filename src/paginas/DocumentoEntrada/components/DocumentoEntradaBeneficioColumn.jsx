import React from 'react';
import { ListItemText } from '@mui/material';

function DocumentoEntradaBeneficioColumn(params) {
    const { value, row } = params;
    return (
        <ListItemText
            primary={value.nome}
            secondary={`Solicitado: ${row.quantidade} / Conferido: ${row.quantidadeConferida}`}
         />
    );
}

export default DocumentoEntradaBeneficioColumn;