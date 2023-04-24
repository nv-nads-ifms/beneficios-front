import { Card, CardHeader } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { emptyData } from '../../api/utils/constants';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { deleteModalMessage } from '../../api/utils/modalMessages';
import NewButton from '../../components/CustomButtons/NewButton';
import BaseForm from '../../components/CustomForms/BaseForm';
import CustomTable from '../../components/CustomTable/CustomTable';
import { userContext } from '../../hooks/userContext';
import { emptyUnidadeAtendimento } from '../../models/UnidadeAtendimento';
import BeneficioService from '../../services/BeneficioService';
import BeneficioTableRow from './Components/BeneficioTableRow';

const columnsNames = [
    { id: 'nome', label: 'Nome' },
    { id: 'tipoConcessao', label: 'Tipo de Concessão' },
    { id: 'disponivel', label: 'Disponível' }];

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

export default function BeneficioListagem() {
    let history = useHistory();
    const usuario = useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/beneficios-eventuais');

    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(emptyUnidadeAtendimento);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState(emptyData);
    const [tamanho, setTamanho] = React.useState(0);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        if (usuario != null) {
            setUnidadeAtendimento(usuario.funcionario.unidadeAtendimento);
        } else {
            setUnidadeAtendimento(emptyUnidadeAtendimento);
        }
    }, [usuario]);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(page, rowsPerPage);
        BeneficioService.getBeneficios(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleAction = (id, action) => {
        history.push(`/beneficios-eventuais-ficha/${id}/${action}`);
    }

    const atualizaLista = () => {
        setTamanho(tamanho + 1);
    }

    const handleDelete = (row) => {
        const value = row.descricao;

        deleteModalMessage(
            value,
            () => BeneficioService.deleteBeneficio(row.id),
            () => atualizaLista()
        );
    }

    return (
        <BaseForm title="Listagem de Benefícios Eventuais">
            <Card>
                <CardHeader
                    action={
                        perfil.escrever && (
                            <React.Fragment>
                                <NewButton
                                    label="Cadastrar Novo Benefício Eventual"
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
                {data.content.map((row, key) => (
                    <BeneficioTableRow
                        key={"row-" + key}
                        row={row}
                        unidadeAtendimento={unidadeAtendimento}
                        onView={perfil.ler ? (row) => handleAction(row.id, 'view') : null}
                        onEdit={perfil.escrever ? (row) => handleAction(row.id, 'edit') : null}
                        onRemove={perfil.remover ? handleDelete : null} />
                ))}
            </CustomTable>
        </BaseForm>
    );
}