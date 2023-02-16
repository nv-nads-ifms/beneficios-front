import React from 'react';
import { Card, CardContent, CardHeader, Collapse, Grid } from '@material-ui/core';
import CustomTable from '../../components/CustomTable/CustomTable';
import PessoaService from '../../services/PessoaService';
import PessoaTableRow from './PessoaTableRow';
import BaseForm from '../../components/CustomForms/BaseForm';
import SearchIcon from '@material-ui/icons/Search';
import NewButton from '../../components/CustomButtons/NewButton';
import PessoaCadastroModal from './PessoaCadastroModal';
import { emptyData } from '../../api/utils/constants';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import ExpandMoreIconButton from '../../components/CustomIconButtons/ExpandMoreIconButton';
import AtendimentoCadastro from '../Atendimento/AtendimentoCadastro';
import { deleteModalMessage } from '../../api/utils/modalMessages';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';

const columnsNames = [
    { id: 'id', label: 'Id.' },
    { id: 'nome', label: 'Nome' },
    { id: 'nascimento', label: 'Nascimento' },
    { id: 'documento', label: 'Documentos' },
    { id: 'contato', label: 'Contatos' },
    { id: 'escolaridade', label: 'Escolaridade' },
];

const getRequestParams = (nome, documento, page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }
    if (pageSize) {
        params["size"] = pageSize;
    }
    if (nome) {
        params["nome"] = nome;
    }
    if (documento) {
        params["documento"] = documento;
    }
    return params;
};

export default function PessoaListagem() {
    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/pessoas');

    const [expanded, setExpanded] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [openAtendimento, setOpenAtendimento] = React.useState(false);
    const [selectedPessoa, setSelectedPessoa] = React.useState(null);

    const [id, setId] = React.useState(0);
    const [nome, setNome] = React.useState('');
    const [documento, setDocumento] = React.useState('');
    const [status, setStatus] = React.useState('view');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tamanho, setTamanho] = React.useState(0);

    const [data, setData] = React.useState(emptyData);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(nome, documento, page, rowsPerPage);
        PessoaService.getPessoas(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data);
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [nome, documento, tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const atualizaLista = () => {
        setTamanho(tamanho + 1);
    }
    
    const handleAction = (id, action) => {
        setId(id);
        setOpenModal(true);
        setStatus(action);
    }

    const handleDelete = (row) => {
        const value = row.nome;

        deleteModalMessage(
            value,
            () => PessoaService.deletePessoa(row.id),
            () => atualizaLista()
        );
    }

    const handleOnClose = () => {
        setId(0);
        setOpenModal(false);
    }

    const handleNomeChange = (event) => {
        if (documento !== '') {
            setDocumento('');
        }
        setNome(event.target.value);
    }

    const handleDocumentoChange = (event) => {
        if (documento !== '') {
            setNome('');
        }
        setDocumento(event.target.value);
    }

    const handleAtendimento = (row) => {
        setSelectedPessoa(row);
        setOpenAtendimento(true);
    }

    const handlCloseAtendimento = () => {
        setOpenAtendimento(false);
        setSelectedPessoa(null);
    }

    return (
        <BaseForm title="Listagem de Pessoas">
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
                                    label="Criar Pessoa"
                                    onClick={() => handleAction(0, 'edit')} />
                            )}
                        </React.Fragment>

                    }
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={8}>
                                <CustomTextField
                                    id="nome"
                                    label="Nome da pessoa"
                                    placeholder={"Buscar por nome"}
                                    onChangeHandler={handleNomeChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <CustomTextField
                                    id="documento"
                                    label="Número do documento"
                                    placeholder={"Buscar por documento"}
                                    onChangeHandler={handleDocumentoChange}
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
                        <PessoaTableRow
                            key={"row-" + key}
                            row={row}
                            onGerarAtendimento={handleAtendimento}
                            onView={perfil.ler ? (row) => handleAction(row.id, 'view') : null}
                            onEdit={perfil.escrever ? (row) => handleAction(row.id, 'edit') : null}
                            onRemove={perfil.remover ? (row) => handleDelete(row) : null} />
                    );
                })}
            </CustomTable>

            <PessoaCadastroModal
                pessoaId={id}
                openModal={openModal}
                onClose={handleOnClose}
                callback={atualizaLista}
                status={status}
            />

            <AtendimentoCadastro
                openModal={openAtendimento}
                onClose={handlCloseAtendimento}
                callback={atualizaLista}
                pessoa={selectedPessoa}
            />
        </BaseForm>

    );
}