import React from 'react';
import Moment from 'moment';
import {
    Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText,
    makeStyles, Tooltip, Typography
} from '@material-ui/core';
import { extractCapitalizeLetters } from '../../../api/utils/stringUtils';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '72ch',
        minWidth: '42ch',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ddd'
    },
    inline: {
        display: 'inline',
    },
}));

export default function ListDocumentoView(props) {
    const { documentoPessoa } = props;
    const classes = useStyles();
    const documento = documentoPessoa.documentoDto;
    const orgao = documentoPessoa.orgaoExpedidorDto;

    return (
        <List className={classes.root} dense={true}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Tooltip title={documento.descricao}>
                        <Avatar>
                            {extractCapitalizeLetters(documento.descricao)}
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
                                {orgao.descricao}
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