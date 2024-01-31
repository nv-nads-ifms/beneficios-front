import React from 'react';
import Moment from 'moment';
import { StyledTableCell, StyledTableRow } from "../../../components/CustomTable/AutoLoadTable";
import { ccyFormat } from '../../../api/format';
import ChipStatus from '../../../components/CustomButtons/ChipStatus';
import { Status } from '../../../api/utils/constants';
import ListButton, { ButtonType } from '../../../components/CustomButtons/ListButtons';

export default function RendimentosTableRowComponent(props) {
    const { row, onEdit, onRemove } = props;
    const [status, setStatus] = React.useState('');
    const [label, setLabel] = React.useState('');

    React.useEffect(() => {
        if (row.demissao === '' || row.demissao == null) {
            setStatus(Status.ATIVO);
            setLabel("Vigente");
        } else {
            setStatus(Status.INATIVO); 
            setLabel("Encerrado");
        }
    }, [row.demissao]);

    const buttons = [];
    buttons.push({ label: 'Excluir', type: ButtonType.DELETE, action: () => onRemove(row) });
    if (row.demissao === '' || row.demissao == null) {
        buttons.push({ label: 'Alterar', type: ButtonType.EDIT, action: () => onEdit(row) });
    }

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus label={label} status={status} />
            </StyledTableCell>
            <StyledTableCell>
                {row.condicaoTrabalhoDto.descricao}
            </StyledTableCell>
            <StyledTableCell>
                {Moment(row.admissao).format('DD/MM/Y')}
            </StyledTableCell>
            <StyledTableCell>
                {(row.demissao === '' || row.demissao == null) ? '--' : Moment(row.dataFim).format('DD/MM/Y')}
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