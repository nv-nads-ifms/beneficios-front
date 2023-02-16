import React from 'react';
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";
import { ccyFormat } from "../../../api/format";
import ChipStatus from "../../../components/CustomButtons/ChipStatus";

export default function ProntuarioAuxilioTableRowComponent(props) {
    const { row } = props;

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell>
                {row.parentesco}
            </StyledTableCell>
            <StyledTableCell>
                {row.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.programaGoverno}
            </StyledTableCell>
            <StyledTableCell align="right">
                {ccyFormat(row.valor)}
            </StyledTableCell>
        </StyledTableRow>
    );

}