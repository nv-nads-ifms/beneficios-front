import React from 'react';
import { ListItemText } from '@material-ui/core';

function DocumentoEntradaBeneficioColumn(params) {
    const { row } = params;
    return (
        <ListItemText
            primary={row.beneficioEventual.nome}
            secondary={`Solicitado: ${row.quantidade} / Conferido: ${row.quantidadeConferida}`}
         />
    );
}

export default DocumentoEntradaBeneficioColumn;