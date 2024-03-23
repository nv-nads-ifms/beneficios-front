import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function DocumentoEntradaDocumentoColumn(params) {
    const { row } = params;

    return (
        row.doacao == null || row.doacao === false ? (
            <List>
                <ListItem>
                    <ListItemText
                        primary={<Typography variant="body1" >{row.processo}</Typography>}
                        secondary={<Typography variant="caption" color="textSecondary">Nº do Processo</Typography>}
                    />
                    <ListItemText
                        primary={<Typography variant="body1" >{row.ata}</Typography>}
                        secondary={<Typography variant="caption" color="textSecondary">Nº da Ata</Typography>}
                    />
                    <ListItemText
                        primary={<Typography variant="body1" >{row.pregao}</Typography>}
                        secondary={<Typography variant="caption" color="textSecondary">Nº do Pregão</Typography>}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={<Typography variant="body1" >{row.empenhoContabil}</Typography>}
                        secondary={<Typography variant="caption" color="textSecondary">Nº do Empenho Contábil</Typography>}
                    />
                    <ListItemText
                        primary={<Typography variant="body1" >{row.contrato}</Typography>}
                        secondary={<Typography variant="caption" color="textSecondary">Nº do Contrato</Typography>}
                    />
                    <ListItemText
                        primary={<Typography variant="body1" >{row.numeroNotaFiscal}</Typography>}
                        secondary={<Typography variant="caption" color="textSecondary">Nº da Nota Fiscal</Typography>}
                    />
                </ListItem>
            </List>
        ) : (
            <List>
                <ListItemText
                    primary={<Typography variant="body2" >Os itens foram Doados</Typography>}
                    secondary={<Typography variant="caption" color="textSecondary">Doação</Typography>}
                />
            </List>
        )
    );
}

export default DocumentoEntradaDocumentoColumn;