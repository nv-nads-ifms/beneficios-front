import React from 'react';
import { IconButton } from "@material-ui/core";
import { CheckOutlined } from "@material-ui/icons";
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";

export default function CidadeTableRow(props) {

    const { row, onSelectRow } = props;

    return (
        <StyledTableRow hover tabIndex={-1}>
            <StyledTableCell>
                {row.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.uf.nome + (row.uf.sigla !== '' ? " ("+row.uf.sigla+")" : '')}
            </StyledTableCell>
            <StyledTableCell>
                {row.uf.pais.nome}
            </StyledTableCell>
            <StyledTableCell align="center" >
                {onSelectRow != null && (
                    <IconButton
                        onClick={() => onSelectRow(row)}
                        aria-label="selecionar">
                        <CheckOutlined />
                    </IconButton>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );

}