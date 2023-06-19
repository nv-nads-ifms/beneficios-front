import React from 'react';
import { IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import { Status } from '../../api/utils/constants';

export default function ItemDocumentoSaidaListagemTableRow(props) {
    const { row, onRemoveRow, disabled } = props;

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                {row.numero}
            </StyledTableCell>
            <StyledTableCell>
                {row.unidadeAtendimento.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.beneficioEventual.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.quantidade}
            </StyledTableCell>
            <StyledTableCell align="center" >
                {onRemoveRow != null && row.status === Status.PENDENTE &&
                    !disabled && (
                        <IconButton
                            onClick={() => onRemoveRow(row)}
                            aria-label="delete">
                            <DeleteOutlined />
                        </IconButton>
                    )}
            </StyledTableCell>
        </StyledTableRow>
    );

}