import React from 'react';
import ListButton, { ButtonType } from '../../components/CustomButtons/ListButtons';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";

export default function UnidadeAtendimentoTableRow(props) {

    const { row, onView, onEdit, onRemove } = props;
    const buttons = [
        { label: 'Ver', type: ButtonType.VIEW, action: () => onView(row) },
        { label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) },
        { label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) },
    ];

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                {row.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.numeroDaUnidade}
            </StyledTableCell>
            <StyledTableCell>
                {row.tipoUnidadeAtendimento.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.endereco.logradouroNome + ", " +
                    row.endereco.numero + ", " +
                    row.endereco.bairroNome}
            </StyledTableCell>
            <StyledTableCell>
                {row.endereco.cidadeNome + " - " +
                    row.endereco.ufSigla}
            </StyledTableCell>
            <StyledTableCell>
                {row.matriz ? "Matriz" : "Filial"}
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}