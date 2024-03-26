import React from 'react';
import { ListItemText } from '@material-ui/core';

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