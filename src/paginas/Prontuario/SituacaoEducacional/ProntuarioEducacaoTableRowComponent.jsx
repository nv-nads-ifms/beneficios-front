import React from 'react';
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";

export default function ProntuarioEducacaoTableRowComponent(props) {
    const { row } = props;

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                {row.parentesco}
            </StyledTableCell>
            <StyledTableCell>
                {row.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.escolaridade}
            </StyledTableCell>
        </StyledTableRow>
    );

}