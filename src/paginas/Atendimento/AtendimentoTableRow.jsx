import React from 'react';
import { IconButton } from "@material-ui/core";
import Moment from 'moment';
import { CheckOutlined } from "@material-ui/icons";
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import EditIconButton from "../../components/CustomIconButtons/EditIconButton";
import DeleteIconButton from "../../components/CustomIconButtons/DeleteIconButton";
import ChipStatus from "../../components/CustomButtons/ChipStatus";
import { Status } from '../../api/utils/constants';
import { firstName } from '../../api/utils/stringUtils';

export default function AtendimentoTableRow(props) {
    const { row, onEditRow, onDeleteRow, onSelectRow } = props;
    const [unidade, setUnidade] = React.useState("");

    React.useEffect(() => {
        setUnidade("--SEM PRONTUARIO--");
        if (row.prontuario != null) {
            setUnidade(
                row.prontuario.id + "/" +
                row.prontuario.unidadeAtendimento.numeroDaUnidade
            );
        }
    }, [row.prontuario]);

    return (
        <StyledTableRow hover tabIndex={-1}>
            <StyledTableCell>
                {row.id}
            </StyledTableCell>
            <StyledTableCell>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell>
                {row.atendente.unidadeAtendimento.numeroDaUnidade}
            </StyledTableCell>
            <StyledTableCell>
                {unidade}
            </StyledTableCell>
            <StyledTableCell>
                {firstName(row.atendente.nome)}
            </StyledTableCell>
            <StyledTableCell>
                {row.pessoa.nome}
            </StyledTableCell>
            <StyledTableCell>
                {Moment(row.emissao).format('DD/MM/Y hh:mm:ss a')}
            </StyledTableCell>
            <StyledTableCell align="center" >
                {onSelectRow != null && (
                    <IconButton
                        onClick={() => onSelectRow(row)}
                        aria-label="selecionar">
                        <CheckOutlined />
                    </IconButton>
                )}
                {onEditRow != null && (
                    <EditIconButton
                        onClick={() => onEditRow(row.id)} />
                )}
                {onDeleteRow != null && row.status === Status.ABERTO && (
                    <DeleteIconButton
                        onClick={() => onDeleteRow(row.id)} />
                )}
            </StyledTableCell>
        </StyledTableRow>
    );

}