import React from 'react';
import Moment from 'moment';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import ChipStatus from "../../components/CustomButtons/ChipStatus";
import { Status } from '../../api/utils/constants';
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';

export default function RetiradaBeneficioTableRow(props) {
    const { row, onView, onEdit } = props;
    const buttons = [
        { label: 'Ver', type: ButtonType.VIEW, action: () => onView(row) },
    ];

    if (onEdit != null && row.status === Status.PENDENTE) {
        buttons.push({ label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) });
    }

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell>
                {row.unidadeAtendimento.numeroDaUnidade}
            </StyledTableCell>
            <StyledTableCell>
                {row.pessoa.nome}
            </StyledTableCell>
            <StyledTableCell>
                {Moment(row.emissao).format('DD/MM/Y hh:mm:ss a')}
            </StyledTableCell>
            <StyledTableCell>
                {row.beneficioEventual.descricao}
            </StyledTableCell>
            <StyledTableCell>
                {row.quantidade}
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}