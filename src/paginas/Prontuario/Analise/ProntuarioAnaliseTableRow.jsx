import React from 'react';
import Moment from 'moment';
import { makeStyles } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";
import ChipStatus from '../../../components/CustomButtons/ChipStatus';
import CheckIconButton from '../../../components/CustomIconButtons/CheckIconButton';
import ViewIconButton from '../../../components/CustomIconButtons/ViewIconButton';
import BlockIconButton from '../../../components/CustomIconButtons/BlockIconButton';
import { Status } from '../../../api/utils/constants';
import RestoreIconButton from '../../../components/CustomIconButtons/RestoreIconButton';

const useStyles = makeStyles({
    status: {
        width: "2%",
        textAlign: "center",
    },
    acoes: {
        width: "20%",
        textAlign: "center",
    }
});

export default function ProntuarioAnaliseTableRow(props) {
    const { row, onViewRow, onAtivarRow, onDesativarRow, onRestoreRow } = props;
    const classes = useStyles();

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell className={classes.status}>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell className={classes.unidade}>
                {row.unidadeAtendimento.numeroDaUnidade}
            </StyledTableCell>
            <StyledTableCell className={classes.pessoa}>
                {row.titular.nome}
            </StyledTableCell>
            <StyledTableCell className={classes.emissao}>
                {Moment(row.emissao).format('DD/MM/Y hh:mm:ss a')}
            </StyledTableCell>
            <StyledTableCell className={classes.acompanhamento}>
                {row.acomanhamento ? "Sim" : "Não"}
            </StyledTableCell>
            <StyledTableCell className={classes.acoes} >
                {onViewRow != null && (
                    <ViewIconButton
                        onClick={() => onViewRow(row)} />
                )}
                {onAtivarRow != null && row.status === Status.PENDENTE && (
                    <CheckIconButton
                        onClick={() => onAtivarRow(row)} />
                )}
                {onDesativarRow != null && row.status !== Status.INATIVO && (
                    <BlockIconButton
                        onClick={() => onDesativarRow(row)} />
                )}
                {onRestoreRow != null && row.status === Status.INATIVO && (
                    <RestoreIconButton
                        onClick={() => onRestoreRow(row)} />
                )}

            </StyledTableCell>
        </StyledTableRow>
    );

}