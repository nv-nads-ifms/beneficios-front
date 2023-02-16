import React from 'react';
import Moment from 'moment';
import { makeStyles } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import { Status } from '../../api/utils/constants';
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';

const useStyles = makeStyles({
    cell: {
        width: "1%",
        textAlign: "center",
    },
    status: {
        width: "2%",
        textAlign: "center",
    },
    acoes: {
        width: "20%",
        textAlign: "center",
    }
});

function ProntuarioTableRow(props) {

    const { row, onView, onEdit, onRemove,
        onAtivar, onDesativar, onRestore } = props;
    const classes = useStyles();
    const buttons = [
        { label: 'Ver', type: ButtonType.VIEW, action: () => onView(row) },
    ];

    if ([Status.PENDENTE, Status.ATIVO].includes(row.status)) {
        buttons.push({ label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) });

    }

    if (onAtivar != null && row.status === Status.PENDENTE) {
        buttons.push({ label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) });
        buttons.push({ label: 'Ativar', type: ButtonType.ACTIVATE, action: () => onAtivar(row) });
    }

    if (row.status === Status.INATIVO) {
        buttons.push({ label: 'Restaurar', type: ButtonType.RESTORE, action: () => onRestore(row) });
    }

    if (row.status === Status.ATIVO) {
        buttons.push({ label: 'Desativar', type: ButtonType.DEACTIVATE, action: () => onDesativar(row) });
    }

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell className={classes.cell}>
                {row.id}
            </StyledTableCell>
            <StyledTableCell className={classes.status}>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell>
                {row.unidadeAtendimento.numeroDaUnidade}
            </StyledTableCell>
            <StyledTableCell>
                {row.titular.nome}
            </StyledTableCell>
            <StyledTableCell>
                {Moment(row.emissao).format('DD/MM/Y hh:mm:ss a')}
            </StyledTableCell>
            <StyledTableCell className={classes.cell}>
                {row.acomanhamento ? "Sim" : "Não"}
            </StyledTableCell>
            <StyledTableCell align="center" className={classes.acoes} >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}

export default ProntuarioTableRow;