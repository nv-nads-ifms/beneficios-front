import React from 'react';

import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';
import { Status } from '../../api/utils/constants';

export default function DocumentoSaidaTableRow(props) {
    const { row, onView, onEdit, onRemove } = props;
    const buttons = [
        { label: 'Ver', type: ButtonType.VIEW, action: () => onView(row) },
    ];
    const aNotStatus = [Status.PARCIAL, Status.FINALIZADO];

    if (aNotStatus.indexOf(row.status) < 0) {
        buttons.push({ label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) });
        buttons.push({ label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) });
    }
    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell>
                {row.unidadeAtendimento.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.observacao}
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}