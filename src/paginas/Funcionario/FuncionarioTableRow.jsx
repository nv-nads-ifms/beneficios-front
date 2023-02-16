import React from 'react';
import Moment from 'moment';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';

export default function FuncionarioTableRow(props) {

    const { row, onViewRow, onEditRow, onDeleteRow } = props;

    const buttons = [
        { label: 'Ver', type: ButtonType.VIEW, action: () => onViewRow(row) },
        { label: 'Alterar', type: ButtonType.EDIT, action: () => onEditRow(row) },
        { label: 'Excluir', type: ButtonType.DELETE, action: () => onDeleteRow(row) },
    ];

    return (
        <StyledTableRow hover tabIndex={-1}>
            <StyledTableCell>
                {row.nome}
            </StyledTableCell>
            <StyledTableCell>
                {Moment(row.nascimento).format('DD/MM/Y')}
            </StyledTableCell>
            <StyledTableCell>
                {row.funcao.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.unidadeAtendimento.numeroDaUnidade}
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}