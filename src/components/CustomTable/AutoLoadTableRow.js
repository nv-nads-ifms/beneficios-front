import React from 'react';
import ListButton, { ButtonType } from '../CustomButtons/ListButtons';
import { StyledTableCell, StyledTableRow } from "./AutoLoadTable";

function AutoLoadTableRow(props) {
    const { columns, row, handleEdit, handleRemove, handleView } = props;
    const buttons = [
        {label: 'Ver', type: ButtonType.VIEW, action: () => handleView(row)},
        {label: 'Alterar', type: ButtonType.EDIT, action: () => handleEdit(row)},
        {label: 'Excluir', type: ButtonType.DELETE, action: () => handleRemove(row)},
    ];
    return (
        <StyledTableRow hover tabIndex={-1}>
            {columns.map((column) => {
                const testValue = row[column.id];
                const value = typeof testValue === "object" ?
                    testValue != null ? testValue[column.innerField] : null : testValue;
                return (
                    <StyledTableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                    </StyledTableCell>
                );
            })}
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}

export default AutoLoadTableRow;