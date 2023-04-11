import { Card, CardHeader } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { emptyData } from '../../api/utils/constants';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { deleteModalMessage } from '../../api/utils/modalMessages';
import NewButton from '../../components/CustomButtons/NewButton';
import BaseForm from '../../components/CustomForms/BaseForm';
import CustomTable from '../../components/CustomTable/CustomTable';
import { userContext } from '../../hooks/userContext';
import UnidadeAtendimentoService from '../../services/UnidadeAtendimentoService';
import UnidadeAtendimentoTableRow from './UnidadeAtendimentoTableRow';

const columnsNames = [
    { id: 'nome', label: 'Nome da Unidade' },
    { id: 'numeroDaUnidade', label: 'Número da Unidade' },
    { id: 'tipoUnidadeAtendimento', label: 'Tipo de Unidade' },
    { id: 'endereco', label: 'Endereço' },
    { id: 'cidade', label: 'Cidade/UF' },
    { id: 'matriz', label: 'Matriz' },
];

const getRequestParams = (page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }
    if (pageSize) {
        params["size"] = pageSize;
    }
    return params;
};

export default function UnidadeAtendimentoListagem() {
    let history = useHistory();
    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/unidades-de-atendimento');

    const [tamanho, setTamanho] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState(emptyData);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(page, rowsPerPage);
        UnidadeAtendimentoService.getUnidadeAtendimento(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data);
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleAction = (id, action) => {
        history.push(`/unidade-de-atendimento-ficha/${id}/${action}`);
    }

    const atualizaLista = () => {
        setTamanho(tamanho + 1);
    }

    const handleDelete = (row) => {
        const value = row.descricao;

        deleteModalMessage(
            value,
            () => UnidadeAtendimentoService.deleteUnidadeAtendimento(row.id),
            () => atualizaLista()
        );
    }

    return (
        <BaseForm title="Listagem de Unidades de Atendimento">
            <Card>
                <CardHeader
                    action={
                        perfil.escrever && (
                            <React.Fragment>
                                <NewButton
                                    label="Cadastrar unidade de atendimento"
                                    onClick={() => handleAction(0, 'edit')} />
                            </React.Fragment>
                        )
                    }
                />
            </Card>
            <CustomTable
                data={data}
                columns={columnsNames}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                dataFetched={dataFetched}
            >
                {data.content.map((row, key) => {
                    return (
                        <UnidadeAtendimentoTableRow
                            key={"row-" + key}
                            row={row}
                            onView={perfil.ler ? (row) => handleAction(row.id, 'view') : null}
                            onEdit={perfil.escrever ? (row) => handleAction(row.id, 'edit') : null}
                            onRemove={perfil.remover ? handleDelete : null} />
                    );
                })}
            </CustomTable>
        </BaseForm>
    );
}