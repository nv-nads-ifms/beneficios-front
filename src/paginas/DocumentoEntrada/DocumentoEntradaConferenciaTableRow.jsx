import React from 'react';
import { StyledTableCell, StyledTableRow } from "../../components/CustomTable/AutoLoadTable";
import { Status } from '../../api/utils/constants';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import UploadButton from '../../components/CustomButtons/UploadButton';
import ViewIconButton from '../../components/CustomIconButtons/ViewIconButton';

export default function DocumentoEntradaConferenciaTableRow(props) {
    const { row, onConferenciaRow, disabled, onViewRow } = props;
    const documentoEntrada = row.documentoEntrada;

    return (
        <StyledTableRow hover tabIndex={-1} key={row.id}>
            <StyledTableCell>
                <ChipStatus status={row.status} />
            </StyledTableCell>
            <StyledTableCell>
                {documentoEntrada.unidadeAtendimento.numeroDaUnidade}
            </StyledTableCell>
            <StyledTableCell>
                {documentoEntrada.fornecedor.nome}
            </StyledTableCell>
            <StyledTableCell>
                {documentoEntrada.doacao === true ? "Doação" : (
                    documentoEntrada.processo +"  / "+ documentoEntrada.ata +"  / "+
                    documentoEntrada.pregao +"  / "+ documentoEntrada.empenhoContabil +"  / "+
                    documentoEntrada.contrato +"  / "+ documentoEntrada.numeroNotaFiscal +"  / "
                )}
            </StyledTableCell>
            <StyledTableCell>
                {row.numero}
            </StyledTableCell>
            <StyledTableCell>
                {row.beneficioEventual.descricao}
            </StyledTableCell>
            <StyledTableCell>
                {row.quantidade}
            </StyledTableCell>
            <StyledTableCell>
                {row.quantidadeConferida}
            </StyledTableCell>
            <StyledTableCell align="center" >
                {onConferenciaRow != null && row.status !== Status.RECEBIDO && (
                    <UploadButton
                        caption="Conferir"
                        onClick={() => onConferenciaRow(row)}
                        disabled={disabled}
                    />
                )}
                {onViewRow != null && row.status === Status.RECEBIDO && (
                    <ViewIconButton
                        tooltip="Visualizar movimentação do benefício eventual"
                        onClick={() => onViewRow(row)} />
                )}
            </StyledTableCell>
        </StyledTableRow>
    );

}