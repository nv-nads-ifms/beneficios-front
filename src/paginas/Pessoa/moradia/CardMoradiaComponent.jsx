import React from 'react';
import Moment from 'moment';
import { Grid, IconButton, makeStyles, Typography, Divider } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HouseIcon from '@material-ui/icons/House';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ccyFormat } from '../../../api/format';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

export default function CardMoradiaComponent(props) {
    const { moradia, onEdit, onDelete } = props;
    const classes = useStyles();

    return (
        <Grid container alignItems="center">
            <Grid item xs={9}>
                <Grid container alignItems="center">
                    <Grid item>
                        <HouseIcon className={classes.icon} />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="textPrimary">
                            {moradia.tipoMoradiaDto.descricao}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Ocupada em: {Moment(moradia.dataOcupacao).format('D/MM/Y')}.
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {moradia.condicaoMoradiaDto.descricao} no valor de R$ {ccyFormat(moradia.valor)}.
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container alignItems="center">
                    <Grid item><LocationOnIcon className={classes.icon} /></Grid>
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            Endereço: {moradia.endereco.logradouroNome}, {moradia.endereco.numero}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {moradia.endereco.bairroNome}, {moradia.endereco.cidadeNome} - {moradia.endereco.ufSigla}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            {onEdit != null && (
                <Grid item >
                    <IconButton
                        aria-label="Alterar Moradia"
                        onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                </Grid>
            )}
            {onDelete != null && (
                <Grid item >
                    <IconButton
                        aria-label="Remover Moradia"
                        onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            )}
        </Grid>
    );
}