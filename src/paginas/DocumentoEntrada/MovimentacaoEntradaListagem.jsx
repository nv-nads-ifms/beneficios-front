import React from 'react';
import Moment from 'moment';
import { StyledTableCell, StyledTableRow } from '../../components/CustomTable/AutoLoadTable';
import SimpleTable from '../../components/CustomTable/SimpleTable';
import DocumentoEntradaService from '../../services/DocumentoEntradaService';

const columnsNames = [
    { id: 'numero', label: 'Número' },
    { id: 'unidadeAtendimento', label: 'Unidade de Atendimento' },
    { id: 'funcionario', label: 'Responsável' },
    { id: 'quantidade', label: 'Qtd. Movimentada' },
    { id: 'emissao', label: 'Data da Movimentação' },
];

export default function MovimentacaoEntradaListagem(props) {
    const { documentoEntradaId, numero } = props;
    const [itens, setItens] = React.useState([]);

    React.useEffect(() => {
        if (documentoEntradaId != null && documentoEntradaId !== '' &&
            numero != null && numero !== '') {
            DocumentoEntradaService.getListaMovimentosDeEntrada(documentoEntradaId, numero)
                .then(r => r.data)
                .then(data => setItens(data));
        } else {
            setItens([]);
        }
    }, [documentoEntradaId, numero]);

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