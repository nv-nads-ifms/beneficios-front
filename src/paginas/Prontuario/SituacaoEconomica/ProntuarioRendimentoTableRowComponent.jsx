import React from 'react';
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";
import { ccyFormat } from "../../../api/format";
import ChipStatus from "../../../components/CustomButtons/ChipStatus";
import { Status } from '../../../api/utils/constants';

export default function ProntuarioRendimentoTableRowComponent(props) {
    const { row } = props;
    const [status, setStatus] = React.useState('');
    React.useEffect(() => {
        setStatus(row.demissao === "" || row.demissao == null ? Status.ATIVO : Status.INATIVO);
    }, [row.demissao]);

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus status={status} />
            </StyledTableCell>
            <StyledTableCell>
                {row.parentesco}
            </StyledTableCell>
            <StyledTableCell>
                {row.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.condicaoTrabalho}
            </StyledTableCell>
            <StyledTableCell align="right">
                {ccyFormat(row.valor)}
            </StyledTableCell>
        </StyledTableRow>
    );

}