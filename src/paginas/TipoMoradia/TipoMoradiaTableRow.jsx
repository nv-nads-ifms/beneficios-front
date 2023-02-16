import React from 'react';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';

export default function TipoMoradiaTableRow(props) {
    const { row, onSelectRow, onView, onEdit, onRemove } = props;
    const buttons = [];
    if (onSelectRow != null) {
        buttons.push({ label: 'Selecionar', type: ButtonType.SELECT, action: () => onSelectRow(row) });
    } 
    
    if (onView != null)
        buttons.push({ label: 'Ver', type: ButtonType.VIEW, action: () => onView(row) });
    
    if (onEdit != null)
        buttons.push({ label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) });
    
    if (onRemove != null)
        buttons.push({ label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) });
    
    return (
        <StyledTableRow hover tabIndex={-1}>
            <StyledTableCell width={100}>
                {row.id}
            </StyledTableCell>
            <StyledTableCell>
                {row.descricao}
            </StyledTableCell>
            <StyledTableCell>
                {row.complementar === true ? "Exige complemento" : "Complemento opcional"}
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}