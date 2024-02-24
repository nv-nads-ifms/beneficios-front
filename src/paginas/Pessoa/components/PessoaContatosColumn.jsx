import React from 'react';
import { List, ListItemText, Typography } from '@mui/material';

function PessoaContatosColumn(params) {
    const { row } = params;

    return (
        <List dense={true}>
            {row.contatos.map(obj => (
                <React.Fragment>
                    <ListItemText
                        key={obj.id}
                        primary={
                            <Typography variant="body2">
                                {obj.descricao}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="caption" color="textSecondary">
                                {obj.tipoContato.nome}
                            </Typography>
                        }
                    />
                </React.Fragment>
            ))}
        </List>
    );
}

export default PessoaContatosColumn;