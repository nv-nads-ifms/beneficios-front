import React from 'react';
import { useHistory } from 'react-router-dom';
import TipoMoradiaService from '../../services/TipoMoradiaService';
import { userContext } from '../../hooks/userContext';
import { emptyData } from '../../api/utils/constants';
import { deleteModalMessage } from '../../api/utils/modalMessages';
import BaseForm from '../../components/CustomForms/BaseForm';
import { Card, CardHeader } from '@material-ui/core';
import NewButton from '../../components/CustomButtons/NewButton';
import CustomTable from '../../components/CustomTable/CustomTable';
import TipoMoradiaTableRow from './TipoMoradiaTableRow';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';

const columnsNames = [
    { id: 'id', label: 'Código' },
    { id: 'descricao', label: 'Descrição' },
    { id: 'complementar', label: 'Exige complemento?' }];

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

export default function TipoMoradiaListagem() {
    let history = useHistory();
    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/tipos-de-moradia');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState(emptyData);
    const [tamanho, setTamanho] = React.useState(0);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(page, rowsPerPage);
        TipoMoradiaService.getTipoMoradias(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleAction = (id, action) => {
        history.push(`/tipos-de-moradia-ficha/${id}/${action}`);
    }

    const atualizaLista = () => {
        setTamanho(tamanho + 1);
    }

    const handleDelete = (row) => {
        const value = row.descricao;

        deleteModalMessage(
            value,
            () => TipoMoradiaService.deleteTipoMoradia(row.id),
            () => atualizaLista()
        );
    }

    return (
        <BaseForm title="Listagem de Tipos de Moradia">
            <Card>
                <CardHeader
                    action={
                        perfil.escrever && (
                            <React.Fragment>
                                <NewButton
                                    label="Cadastrar Tipo de Moradia"
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
                    <TipoMoradiaTableRow
                        key={"row-" + key}
                        row={row}
                        onView={perfil.ler ? (row) => handleAction(row.id, 'view') : null}
                        onEdit={perfil.escrever ? (row) => handleAction(row.id, 'edit') : null}
                        onRemove={perfil.remover ? handleDelete : null} />
                ))}
            </CustomTable>
        </BaseForm>
    );
}