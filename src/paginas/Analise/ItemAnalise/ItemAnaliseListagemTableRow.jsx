import React from 'react';
import { IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";
import { Status } from '../../../api/utils/constants';

export default function ItemAnaliseListagemTableRow(props) {
    const { row, onRemoveRow, disabled } = props;

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                {row.beneficioEventual.descricao}
            </StyledTableCell>
            <StyledTableCell>
                {row.quantidade}
            </StyledTableCell>
            <StyledTableCell align="center" >
                {row.status === Status.PENDENTE && (
                    <IconButton
                        onClick={() => onRemoveRow(row)}
                        aria-label="delete"
                        disabled={disabled}>
                        <DeleteOutlined />
                    </IconButton>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );

}