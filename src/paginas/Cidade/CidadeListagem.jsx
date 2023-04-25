import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CidadeService from '../../services/CidadeService';
import { emptyData } from '../../api/utils/constants';
import { userContext } from '../../hooks/userContext';
import BaseForm from '../../components/CustomForms/BaseForm';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import NewButton from '../../components/CustomButtons/NewButton';
import CustomTable from '../../components/CustomTable/CustomTable';
import CidadeTableRow from './CidadeTableRow';
import { deleteModalMessage } from '../../api/utils/modalMessages';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import CustomAutoComplete from '../../components/CustomFields/CustomAutoComplete';
import UfService from '../../services/UfService';

const columnsNames = [
    { id: 'nome', label: 'Nome' },
    { id: 'uf', label: 'Unidade Federativa' },
    { id: 'pais', label: 'Unidade Federativa' }];

const getRequestParams = (nome, uf, page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }
    if (pageSize) {
        params["size"] = pageSize;
    }

    if (nome != null && nome !== '') {
        params["nome"] = nome;
    }

    if (uf != null && uf.id !== '') {
        params["ufId"] = uf.id;
    }

    return params;
};

export default function CidadeListagem() {
    let history = useHistory();
    const usuario = useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/beneficios-eventuais');

    const [nome, setNome] = React.useState("");
    const [uf, setUf] = React.useState({ id: 0, nome: '' });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState(emptyData);
    const [tamanho, setTamanho] = React.useState(0);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(nome, uf, page, rowsPerPage);
        CidadeService.getCidades(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [nome, uf, tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleAction = (id, action) => {
        history.push(`/cidades-ficha/${id}/${action}`);
    }

    const atualizaLista = () => {
        setTamanho(tamanho + 1);
    }

    const handleDelete = (row) => {
        const value = row.descricao;

        deleteModalMessage(
            value,
            () => CidadeService.deleteCidade(row.id),
            () => atualizaLista()
        );
    }

    return (
        <BaseForm title="Listagem de Cidades">
            <Card>
                <CardHeader
                    action={
                        perfil.escrever && (
                            <React.Fragment>
                                <NewButton
                                    label="Cadastrar Nova Cidade"
                                    onClick={() => handleAction(0, 'edit')} />
                            </React.Fragment>
                        )
                    }
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <CustomTextField
                                id="nome"
                                label="Nome"
                                value={nome}
                                placeholder="Digite o nome da Cidade para buscar"
                                autoFocus={true}
                                onChangeHandler={(e) => setNome(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomAutoComplete
                                id='uf'
                                value={uf}
                                retrieveDataFunction={UfService.getListaUfs}
                                label="Unidade Federativa"
                                placeholder="<< Selecione uma U.F. >>"
                                onChangeHandler={(event, newValue) => setUf(newValue)}
                                getOptionSelected={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.nome}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
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
                    <CidadeTableRow
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