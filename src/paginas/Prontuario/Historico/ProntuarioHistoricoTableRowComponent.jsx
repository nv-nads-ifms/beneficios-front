import React from 'react';
import Moment from 'moment';
import ChipStatus from '../../../components/CustomButtons/ChipStatus';
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";

export default function ProntuarioHistoricoTableRowComponent(props) {
    const { row } = props;

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell>
                {row.funcionario.nome}
            </StyledTableCell>
            <StyledTableCell>
                {Moment(row.emissao).format('DD/MM/Y hh:mm:ss a')}
            </StyledTableCell>
            <StyledTableCell>
                {row.observacao}
            </StyledTableCell>
        </StyledTableRow>
    );

}