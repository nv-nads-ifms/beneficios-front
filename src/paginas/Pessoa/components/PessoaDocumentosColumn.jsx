import React from 'react';
import { List, ListItemText, Typography } from '@mui/material';
import { extractCapitalizeLetters } from '../../../api/utils/stringUtils';

function PessoaDocumentosColumn(params) {
    const { row } = params;

    return (
        <List dense={true}>
            {row.documentos.map(obj => (
                <React.Fragment>
                    <ListItemText
                        key={obj.numero}
                        primary={
                            <Typography variant="body2">
                                {obj.numero}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="caption" color="textSecondary">
                                Número do {extractCapitalizeLetters(obj.tipoDocumento.nome)}
                            </Typography>
                        }
                    />
                </React.Fragment>
            ))}
        </List>
    );
}

export default PessoaDocumentosColumn;