import React from 'react';
import { ListItemText } from '@material-ui/core';

function DocumentoEntradaNumeroColumn(params) {
    const { value, row } = params;

    return (
        <ListItemText
            primary={`${row.documentoEntrada.id}/${value}`}
            secondary={'Nº Doc. Entrada/Nº Item'}
        />
    );
}

export default DocumentoEntradaNumeroColumn;