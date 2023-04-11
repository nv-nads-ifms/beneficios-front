import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardHeader, Collapse, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { emptyData } from '../../api/utils/constants';
import BaseForm from '../../components/CustomForms/BaseForm';
import FuncionarioService from '../../services/FuncionarioService';
import ExpandMoreIconButton from '../../components/CustomIconButtons/ExpandMoreIconButton';
import NewButton from '../../components/CustomButtons/NewButton';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import CustomTable from '../../components/CustomTable/CustomTable';
import CustomAutoComplete from '../../components/CustomFields/CustomAutoComplete';
import UnidadeAtendimentoService from '../../services/UnidadeAtendimentoService';
import { emptyUnidadeAtendimento } from '../../models/UnidadeAtendimento';
import { fichaStyles } from '../../components/UI/GlobalStyle';
import FuncionarioTableRow from './FuncionarioTableRow';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { deleteModalMessage } from '../../api/utils/modalMessages';

const columnsNames = [
    { id: 'nome', label: 'Nome' },
    { id: 'nascimento', label: 'Nascimento', align: 'center' },
    { id: 'funcao', label: 'Função', innerField: 'nome' },
    { id: 'unidadeAtendimento', label: 'Unidade de Atendimento', innerField: 'nome' }
];

const getRequestParams = (nome, unidadeAtendimento, page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }
    if (pageSize) {
        params["size"] = pageSize;
    }
    params["nome"] = nome;
    if (unidadeAtendimento != null && unidadeAtendimento.id != null) {
        params["unidadeAtendimentoId"] = unidadeAtendimento.id;
    }
    return params;
};

export default function FuncionarioListagem() {
    const classes = fichaStyles();
    let history = useHistory();
    const [expanded, setExpanded] = React.useState(false);
    const [dataFetched, setDataFetched] = React.useState(false);

    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/funcionarios');

    const [nome, setNome] = React.useState('');
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(emptyUnidadeAtendimento);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tamanho, setTamanho] = React.useState(0);

    const [data, setData] = React.useState(emptyData);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(nome, unidadeAtendimento, page, rowsPerPage);
        FuncionarioService.getFuncionarios(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [nome, unidadeAtendimento, tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleAction = (id, action) => {
        history.push(`/funcionario-ficha/${id}/${action}`);
    }

    const atualizaLista = () => {
        setTamanho(tamanho + 1);
    }

    const handleRemove = (row) => {
        const value = row.nome;

        deleteModalMessage(
            value,
            () => FuncionarioService.deleteFuncionario(row.id),
            () => atualizaLista()
        );
    }

    return (
        <BaseForm title="Listagem de Funcionários">
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
                                    label="Cadastrar Funcionario"
                                    onClick={() => handleAction(0, 'edit')}
                                    className={classes.button} />
                            )}
                        </React.Fragment>

                    }
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item md={6} xs={12}>
                                <CustomTextField
                                    id="nome"
                                    label="Nome da pessoa"
                                    placeholder={"Buscar por nome"}
                                    onChangeHandler={(event) => setNome(event.target.value)}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <CustomAutoComplete
                                    id="unidadeAtendimento"
                                    retrieveDataFunction={UnidadeAtendimentoService.getListaUnidadeAtendimentos}
                                    label="Unidade de Atendimento"
                                    placeholder="<< Selecione uma Unidade de Atendimento >>"
                                    onChangeHandler={(event, newValue) => setUnidadeAtendimento(newValue)}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.numeroDaUnidade + " - " + option.nome}
                                />
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
                        <FuncionarioTableRow
                            key={"row-" + key}
                            row={row}
                            onViewRow={perfil.ler ? (row) => handleAction(row.id, 'view') : null}
                            onEditRow={perfil.escrever ? (row) => handleAction(row.id, 'edit') : null}
                            onDeleteRow={perfil.remover ? handleRemove : null}  />
                    );
                })}
            </CustomTable>
        </BaseForm>
    );
}