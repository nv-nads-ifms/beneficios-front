import React from 'react';
import Moment from 'moment';
import { StyledTableCell, StyledTableRow } from '../../components/CustomTable/AutoLoadTable';
import SimpleTable from '../../components/CustomTable/SimpleTable';
import DocumentoSaidaService from '../../services/DocumentoSaidaService';

const columnsNames = [
    { id: 'numero', label: 'Número' },
    { id: 'unidadeAtendimento', label: 'Unidade de Atendimento' },
    { id: 'funcionario', label: 'Responsável' },
    { id: 'quantidade', label: 'Qtd. Movimentada' },
    { id: 'emissao', label: 'Data da Movimentação' },
];

export default function MovimentacaoSaidaListagem(props) {
    const { documentoSaidaId, numero } = props;
    const [itens, setItens] = React.useState([]);

    React.useEffect(() => {
        if (documentoSaidaId != null && documentoSaidaId !== '' &&
            numero != null && numero !== '') {
            DocumentoSaidaService.getListaMovimentosDeSaida(documentoSaidaId, numero)
                .then(r => r.data)
                .then(data => setItens(data));
        } else {
            setItens([]);
        }
    }, [documentoSaidaId, numero]);

    return (
        <SimpleTable
            emptyRows={itens.length === 0}
            columns={columnsNames}
            notShowActions
        >
            {itens.map((row, key) =>
            (
                <StyledTableRow hover tabIndex={-1} key={key}>
                    <StyledTableCell>
                        {row.numero}
                    </StyledTableCell>
                    <StyledTableCell>
                        {row.unidadeAtendimento.nome}
                    </StyledTableCell>
                    <StyledTableCell>
                        {row.funcionario.nome}
                    </StyledTableCell>
                    <StyledTableCell>
                        {row.quantidade}
                    </StyledTableCell>
                    <StyledTableCell>
                        {Moment(row.emissao).format('DD/MM/Y H:mm:ss')}
                    </StyledTableCell>
                </StyledTableRow>
            )
            )}
        </SimpleTable>
    );
}