import React from 'react';
import Moment from 'moment';
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";
import { ccyFormat } from '../../../api/format';
import ChipStatus from '../../../components/CustomButtons/ChipStatus';
import { Status } from '../../../api/utils/constants';
import ListButton, { ButtonType } from '../../../components/CustomButtons/ListButtons';

export default function AuxiliosTableRowComponent(props) {
    const { row, onEdit, onRemove } = props;

    const buttons = [];
    buttons.push({ label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) });
    if (row.status === Status.ATIVO) {
        buttons.push({ label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) });
    }

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell>
                {row.programaGoverno.descricao}
            </StyledTableCell>
            <StyledTableCell>
                {Moment(row.dataRegistro).format('DD/MM/Y')}
            </StyledTableCell>
            <StyledTableCell>
                {(row.dataFim === '' || row.dataFim == null) ? '--' : Moment(row.dataFim).format('DD/MM/Y')}
            </StyledTableCell>
            <StyledTableCell align="right">
                {ccyFormat(row.valor)}
            </StyledTableCell>
            <StyledTableCell align="center" >
                <ListButton buttons={buttons} />
            </StyledTableCell>
        </StyledTableRow>
    );

}