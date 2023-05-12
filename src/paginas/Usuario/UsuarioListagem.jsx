import React from 'react';
import { useHistory } from 'react-router-dom';
import UsuarioTableRow from './UsuarioTableRow';
import UsuarioService from '../../services/UsuarioService';
import CustomTable from '../../components/CustomTable/CustomTable';
import { Status, emptyData } from '../../api/utils/constants';
import BaseForm from '../../components/CustomForms/BaseForm';
import { Card, CardHeader, Collapse, CardContent } from '@material-ui/core';
import NewButton from '../../components/CustomButtons/NewButton';
import SearchIcon from '@material-ui/icons/Search';
import { fichaStyles } from '../../components/UI/GlobalStyle';
import ExpandMoreIconButton from '../../components/CustomIconButtons/ExpandMoreIconButton';
import ComboFuncionario from '../Funcionario/ComboFuncionario';
import { emptyFuncionario } from '../../models/Funcionario';

import { deleteModalMessage, saveModalMessage } from '../../api/utils/modalMessages';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { Grid } from '@mui/material';
import ComboPerfil from '../Perfil/ComboPerfil';

const emptyPerfil = {
    id: '',
    nome: '',
    status: Status.ATIVO
};

const columnsNames = [
    { id: 'id', label: 'ID' },
    { id: 'funcionario', label: 'Nome' },
    { id: 'nome', label: 'Nome de usuário' },
    { id: 'email', label: 'E-mail' },
    { id: 'status', label: 'Status' },
    { id: 'enabled', label: 'Autorização' },
];

const getRequestParams = (perfil, funcionario, page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }

    if (pageSize) {
        params["size"] = pageSize;
    }

    if (perfil != null && perfil.id !== '') {
        params["perfilId"] = perfil.id;
    }

    if (funcionario != null && funcionario.id !== '') {
        params["funcionarioId"] = funcionario.id;
    }

    return params;
};

function UsuarioListagem() {
    let history = useHistory();

    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/usuarios');

    const classes = fichaStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [funcionario, setFuncionario] = React.useState(emptyFuncionario);
    const [perfilSearch, setPerfilSearch] = React.useState(emptyPerfil);

    const [tamanho, setTamanho] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState(emptyData);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(perfilSearch, funcionario, page, rowsPerPage);
        UsuarioService.getUsuarios(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data);
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [perfilSearch, funcionario, setRowsPerPage, setPage, page, rowsPerPage, tamanho]);

    const handleAction = (id, action) => {
        history.push(`/usuarios-ficha/${id}/${action}`);
    }

    const atualizaLista = () => {
        setTamanho(tamanho + 1);
    }

    const handleRemove = (row) => {
        const value = row.nome;

        deleteModalMessage(
            value,
            () => UsuarioService.deleteUsuario(row.id),
            () => atualizaLista()
        );
    }

    function updateUsuarioField(event, rowId) {
        const t = event.target;
        const fieldname = t.name;

        let value = t.checked;

        if (fieldname === 'status') {
            value = value ? "ATIVO" : "INATIVO";
        }

        let usuario = data.content.find(p => p.id === rowId);
        usuario[fieldname] = value;

        saveModalMessage(
            () => UsuarioService.saveUsuario(rowId, usuario),
            atualizaLista
        );
    }

    const changeStatusFunction = (event, rowId) => {
        updateUsuarioField(event, rowId, 'status');
    }

    const changeBloqueioFunction = (event, rowId) => {
        updateUsuarioField(event, rowId, 'enabled');
    }

    return (
        <BaseForm title="Listagem de Usuários">
            <Card>
                <CardHeader
                    title="Filtro de pesquisa"
                    avatar={
                        <SearchIcon />
                    }
                    action={
                        <React.Fragment>
                            <ExpandMoreIconButton
                                tooltip="Clique aqui para expandir ou retrair a visualização dos filtros"
                                expanded={expanded}
                                callback={setExpanded}
                            />
                            {perfil.escrever && (
                                <NewButton
                                    label="Cadastrar Usuário"
                                    onClick={() => handleAction(0, 'edit')}
                                    className={classes.button} />
                            )}
                        </React.Fragment>

                    }
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <ComboFuncionario
                                    id="funcionario"
                                    value={funcionario}
                                    callback={(value) => setFuncionario(value)}
                                    label="Funcionário" />
                            </Grid>
                            <Grid item xs={12}>
                                <ComboPerfil
                                    id="perfilSearch"
                                    value={perfilSearch}
                                    callback={(value) => setPerfilSearch(value)}
                                    label="Perfil do Usuário" />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
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
                        <UsuarioTableRow
                            key={"row-" + key}
                            row={row}
                            handleView={perfil.ler ? (row) => handleAction(row.id, 'view') : null}
                            handleEdit={perfil.escrever ? (row) => handleAction(row.id, 'edit') : null}
                            handleRemove={perfil.remover ? handleRemove : null}
                            onChangeStatus={perfil.escrever ? changeStatusFunction : null}
                            onChangeBloqueio={perfil.escrever ? changeBloqueioFunction : null} />
                    );
                })}
            </CustomTable>
        </BaseForm>

    );
}

export default UsuarioListagem;