import React from 'react'
import { emptyData } from '../../../api/utils/constants';
import CustomTable from '../../../components/CustomTable/CustomTable';
import AtendimentoService from '../../../services/AtendimentoService';
import AnaliseTableRow from '../AnaliseTableRow';

const columnsNames = [
    { id: 'status', label: 'Status' },
    { id: 'unidade', label: 'Unid. Atend.' },
    { id: 'prontuario', label: 'Prontuário' },
    { id: 'funcionario', label: 'Atendente' },
    { id: 'pessoa', label: 'Solicitante' },
    { id: 'emissao', label: 'Emissão' },
];

export default function AnaliseHistoricoSolicitacoesView(props) {
    const { atendimento } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState(emptyData);

    const getRequestParams = (atendimento, page, pageSize) => {
        let params = {};
        if (page) {
            params["page"] = page;
        }
        if (pageSize) {
            params["size"] = pageSize;
        }

        params["prontuarioId"] = atendimento.prontuario.id;
        params["unidadeAtendimentoId"] = atendimento.prontuario.unidadeAtendimento.id;
        params["emissao"] = atendimento.emissao;

        return params;
    };

    React.useEffect(() => {
        if (atendimento.prontuario != null && atendimento.prontuario.id != null) {
            const params = getRequestParams(atendimento, page, rowsPerPage);
            AtendimentoService.getHistoricoAtendimentos(params)
                .then((resp) => {
                    if (resp.status === 400) {
                        setData(emptyData);
                        setRowsPerPage(10);
                        setPage(0);
                    } else {
                        setData(resp.data)
                        setRowsPerPage(resp.data.pageable.pageSize);
                        setPage(resp.data.number);
                    }
                });
        } else {
            setData(emptyData);
            setRowsPerPage(10);
            setPage(0);
        }
    }, [atendimento, setRowsPerPage, setPage, page, rowsPerPage]);

    return (
        <CustomTable
            data={data}
            columns={columnsNames}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
        >
            {data.content.map((row, key) => {
                return (
                    <AnaliseTableRow
                        key={"row-" + key}
                        row={row} />
                );
            })}
        </CustomTable>
    );
}