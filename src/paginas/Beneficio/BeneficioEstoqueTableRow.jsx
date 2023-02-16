import React from 'react';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";

export default function BeneficioEstoqueTableRow(props) {
    const { row } = props;

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                {row.unidadeAtendimento.nome + " - " + row.unidadeAtendimento.numeroDaUnidade}
            </StyledTableCell>
            <StyledTableCell>
                {row.quantidade}
            </StyledTableCell>
        </StyledTableRow>
    );

}