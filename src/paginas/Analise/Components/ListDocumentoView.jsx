import React from 'react';
import Moment from 'moment';
import {
    Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText,
    Tooltip, Typography
} from '@mui/material';
import { extractCapitalizeLetters } from '../../../api/utils/stringUtils';
import { emptyBaseObject } from '../../../api/utils/constants';

export default function ListDocumentoView(props) {
    const { documentoPessoa } = props;
    
    const [documento, setDocumento] = React.useState(emptyBaseObject);
    const [orgao, setOrgao] = React.useState(null);

    React.useEffect(() => {
        if (documentoPessoa != null) {
            setDocumento(documentoPessoa.tipoDocumento);
            setOrgao(documentoPessoa.orgaoExpedidor);
        }
    }, [documentoPessoa]);

    return (
        <List dense={true}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Tooltip title={documento.nome}>
                        <Avatar>
                            {extractCapitalizeLetters(documento.nome)}
                        </Avatar>
                    </Tooltip>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant="subtitle2">
                            {documentoPessoa.numero}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="caption" color="textSecondary">
                            Número do documento
                        </Typography>
                    }
                />
            </ListItem>
            <ListItem>
                <Grid container spacing={2}>
                    {orgao != null && (
                        <Grid item>
                            <Typography variant="body2">
                                {orgao.nome}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Órgão Expedidor
                            </Typography>
                        </Grid>
                    )}
                    <Grid item>
                        <Typography variant="body2">
                            {Moment(documentoPessoa.emissao).format('DD/MM/Y')}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Data de emissão
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
        </List >
    );
}