import Moment from 'moment';
import { Grid, Typography } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";
import { ccyFormat } from '../../../api/format';
import ChipStatus from '../../../components/CustomButtons/ChipStatus';
import React from 'react';
import { Status } from '../../../api/utils/constants';
import HouseIcon from '@material-ui/icons/House';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { fichaStyles } from '../../../components/UI/GlobalStyle';
import ListButton, { ButtonType } from '../../../components/CustomButtons/ListButtons';

export default function MoradiasTableRowComponent(props) {
    const { row, onEdit, onRemove, notShowAction } = props;

    const classes = fichaStyles();
    const [status, setStatus] = React.useState('');
    const [label, setLabel] = React.useState('');

    React.useEffect(() => {
        if (row.dataSaida == null || row.dataSaida === '') {
            setStatus(Status.ATIVO);
            setLabel("Ocupado");
        } else {
            setStatus(Status.INATIVO);
            setLabel("Desocupado");
        }
    }, [row.dataSaida]);

    const buttons = [];
    buttons.push({ label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) });
    if (status === Status.ATIVO) {
        buttons.push({ label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) });
    }


    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus label={label} status={status} />
            </StyledTableCell>
            <StyledTableCell>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <HouseIcon className={classes.icon} />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="textPrimary">
                            {row.tipoMoradiaDto.descricao}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Ocupada em: {Moment(row.dataOcupacao).format('D/MM/Y')}
                            {status === Status.INATIVO && (
                                <Typography variant="body2" color="textSecondary" component="span">
                                    &nbsp;e desocupada em: {Moment(row.dataSaida).format('D/MM/Y')}
                                </Typography>
                            )}.
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {row.condicaoMoradiaDto.descricao} no valor de R$ {ccyFormat(row.valor)}.
                        </Typography>
                    </Grid>
                </Grid>
            </StyledTableCell>
            <StyledTableCell>
                <Grid container spacing={1} alignItems="center">
                    <Grid item><LocationOnIcon className={classes.icon} /></Grid>
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            Endereço: {row.enderecoDto.logradouroNome}, {row.enderecoDto.numero}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {row.enderecoDto.bairroNome}, {row.enderecoDto.cidadeNome} - {row.enderecoDto.ufSigla}
                        </Typography>
                    </Grid>
                </Grid>
            </StyledTableCell>
            {(notShowAction == null || notShowAction === false) && (
                <StyledTableCell align="center" >
                    <ListButton buttons={buttons} />
                </StyledTableCell>
            )}
        </StyledTableRow>
    );

}