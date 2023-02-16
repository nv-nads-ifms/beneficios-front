import PerfilService from '../../services/PerfilService';
import { useHistory } from 'react-router-dom';
import CustomTable from '../../components/CustomTable/CustomTable';
import React from 'react';
import PerfilTableRow from './PerfilTableRow';
import BaseForm from '../../components/CustomForms/BaseForm';
import { Card, CardHeader } from '@material-ui/core';
import NewButton from '../../components/CustomButtons/NewButton';
import { emptyData } from '../../api/utils/constants';
import { ativacaoModalMessage, deleteModalMessage } from '../../api/utils/modalMessages';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';

const columns = [
    { id: 'nome', label: 'Nome' },
    { id: 'status', label: 'Status' }
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

export default function PerfilListagem() {
    let history = useHistory();

    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/perfis');

    const [tamanho, setTamanho] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState(emptyData);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(page, rowsPerPage);
        PerfilService.getPerfis(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data);
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleView = (idValue) => {
        history.push(`/perfis-ficha/${idValue}/view`);
    }

    const handleEdit = (idValue) => {
        history.push(`/perfis-ficha/${idValue}/edit`);
    }

    const atualizaLista = (data) => {
        setTamanho(tamanho + 1);
    }

    const handleRemove = (idValue) => {
        deleteModalMessage(
            "",
            () => PerfilService.deletePerfil(idValue),
            atualizaLista
        );
    }

    const changeStatusFunction = (event, rowId) => {
        let t = event.target;
        const value = t.checked ? "ATIVO" : "INATIVO";

        let perfil = data.content.find(p => p.id === rowId);
        perfil.status = value;

        ativacaoModalMessage(
            `Confirma a ${t.checked ? "ATIVAÇÃO" : "INATIVAÇÃO"} do perfil?`,
            '',
            () => PerfilService.savePerfil(rowId, perfil),
            atualizaLista
        );
    }

    return (
        <BaseForm title="Listagem de Perfis de Acesso">
            <Card>
                <CardHeader
                    action={
                        perfil.escrever && (
                            <React.Fragment>
                                <NewButton
                                    label="Criar Perfil de Acesso"
                                    onClick={() => handleEdit(0)} />
                            </React.Fragment>
                        )
                    }
                />
            </Card>
            <CustomTable
                data={data}
                columns={columns}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                dataFetched={dataFetched}
            >
                {data.content.map((row, key) => {
                    return (
                        <PerfilTableRow
                            key={"row-" + key}
                            row={row}
                            handleView={perfil.ler ? handleView : null}
                            handleEdit={perfil.escrever ? handleEdit : null}
                            handleRemove={perfil.remover ? handleRemove : null}
                            onChangeStatus={changeStatusFunction} />
                    );
                })}
            </CustomTable>
        </BaseForm>
    );
}