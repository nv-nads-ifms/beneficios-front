import React from 'react';
import Moment from 'moment';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import ChipStatus from "../../components/CustomButtons/ChipStatus";
import StartIconButton from "../../components/CustomIconButtons/StartIconButton";
import ViewIconButton from '../../components/CustomIconButtons/ViewIconButton';
import { Status } from '../../api/utils/constants';
import { firstName } from '../../api/utils/stringUtils';

export default function AnaliseTableRow(props) {
    const { row, onInitRow, onViewRow } = props;
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
        <StyledTableRow hover tabIndex={-1} key={row.id}>
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
            <StyledTableCell>
                {row.analise != null && row.analise.encaminhamento === true ? "Sim" : "Não"}
            </StyledTableCell>
            <StyledTableCell align="center" >
                {onViewRow != null && row.status !== Status.ABERTO && (
                    <ViewIconButton
                        tooltip="Visualizar dados da análise"
                        onClick={() => onViewRow(row)} />
                )}
                {onInitRow != null && row.status === Status.ABERTO && (
                    <StartIconButton
                        tooltip="Iniciar análise da solicitação"
                        onClick={() => onInitRow(row)} />
                )}
            </StyledTableCell>
        </StyledTableRow>
    );

}