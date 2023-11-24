import React from 'react';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import { Status } from '../../api/utils/constants';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import UploadButton from '../../components/CustomButtons/UploadButton';
import ViewIconButton from '../../components/CustomIconButtons/ViewIconButton';

export default function DocumentoSaidaConferenciaTableRow(props) {
    const { row, onConferenciaRow, disabled, onViewRow } = props;
    const documentoSaida = row.documentoSaida;
    
    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell>
                {documentoSaida.unidadeAtendimento.numeroDaUnidade}
            </StyledTableCell>
            <StyledTableCell>
                {row.unidadeAtendimento.numeroDaUnidade}
            </StyledTableCell>
            <StyledTableCell>
                {row.numero}
            </StyledTableCell>
            <StyledTableCell>
                {row.beneficioEventual.nome}
            </StyledTableCell>
            <StyledTableCell>
                {row.quantidade}
            </StyledTableCell>
            <StyledTableCell>
                {row.quantidadeConferida}
            </StyledTableCell>
            <StyledTableCell align="center" >
                {onConferenciaRow != null && row.status !== Status.ENVIADO && (
                    <UploadButton
                        caption="Conferir"
                        onClick={() => onConferenciaRow(row)}
                        disabled={disabled}
                     />
                )}
                {onViewRow != null && row.status === Status.ENVIADO && (
                    <ViewIconButton
                        tooltip="Visualizar movimentação do benefício eventual"
                        onClick={() => onViewRow(row)} />
                )}
            </StyledTableCell>
        </StyledTableRow>
    );

}