import React from 'react';
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";
import ListButton, { ButtonType } from '../../../components/CustomButtons/ListButtons';

export default function BeneficioTableRow(props) {
    const { unidadeAtendimento, row, onSelectRow, onView, onEdit, onRemove } = props;

    const buttons = [];
    if (onSelectRow != null) {
        buttons.push({ label: 'Selecionar', type: ButtonType.SELECT, action: () => onSelectRow(row) });
    } else {
        buttons.push({ label: 'Ver', type: ButtonType.VIEW, action: () => onView(row) });
        buttons.push({ label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) });
        buttons.push({ label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) });
    }
    return (
        <StyledTableRow hover tabIndex={-1}>
            <StyledTableCell>
                {row.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.outraConcessao === true ? "Outra Concessão" : "Benefício Eventual"}
            </StyledTableCell>
            <StyledTableCell>
                {row.disponivel}
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}