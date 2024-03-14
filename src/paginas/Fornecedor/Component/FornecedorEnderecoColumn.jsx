import React from 'react';
import { List, ListItemText, Typography } from '@mui/material';

function FornecedorEnderecoColumn(params) {
    const { row } = params;

    return (
        <List dense={true}>
            <ListItemText
                primary={
                    <Typography variant="body2">
                        {row.endereco.logradouroNome + ", " +
                            row.endereco.numero + ", " +
                            row.endereco.bairroNome}
                    </Typography>
                }
                secondary={
                    <Typography variant="caption" color="textSecondary">
                        {row.endereco.cidadeNome + " - " +
                            row.endereco.ufSigla}
                    </Typography>
                }
            />
        </List>
    );
}

export default FornecedorEnderecoColumn;