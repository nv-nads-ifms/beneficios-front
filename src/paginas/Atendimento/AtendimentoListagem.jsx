import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, Collapse, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import CustomTable from '../../components/CustomTable/CustomTable';
import AtendimentoService from '../../services/AtendimentoService';
import AtendimentoTableRow from './AtendimentoTableRow';
import BaseForm from '../../components/CustomForms/BaseForm';
import NewButton from '../../components/CustomButtons/NewButton';
import AtendimentoCadastro from './AtendimentoCadastro';
import FieldPessoaComponent from '../Pessoa/FieldPessoaComponent';
import { emptyPessoa } from '../../models/Pessoa';
import { emptyData, Message, Status } from '../../api/utils/constants';
import MessageDialogForm, { emptyMessage } from '../../components/CustomForms/MessageDialogForm';
import AtendimentoContagem from './AtendimentoContagem';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIconButton from '../../components/CustomIconButtons/ExpandMoreIconButton';
import ComboUnidadeAtendimento from '../UnidadeAtendimento/ComboUnidadeAtendimento';
import { userContext } from '../../hooks/userContext';

const columnsNames = [
    { id: 'id', label: 'ID' },
    { id: 'status', label: 'Status' },
    { id: 'unidade', label: 'Unidade Atend.' },
    { id: 'prontuario', label: 'Prontuario' },
    { id: 'funcionario', label: 'Atendente' },
    { id: 'pessoa', label: 'Assistido' },
    { id: 'emissao', label: 'Emissão' },
];

const getRequestParams = (pessoa, uaid, status, page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }
    if (pageSize) {
        params["size"] = pageSize;
    }
    if (pessoa != null && !!pessoa.id) {
        params["pessoaId"] = pessoa.id;
    }
    
    if (uaid != null) {
        params["unidadeAtendimentoId"] = uaid;
    }
    if (status !== Status.TODOS) {
        params["status"] = status;
    }

    return params;
}

export default function AtendimentoListagem() {

    const [expanded, setExpanded] = React.useState(false);

    const usuario = useContext(userContext);

    const [pessoa, setPessoa] = React.useState(emptyPessoa);
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(usuario.funcionario.unidadeAtendimento);
    const [uaid, setUaid] = React.useState(usuario.funcionario.unidadeAtendimento.id);
    const [status, setStatus] = React.useState(Status.TODOS);

    const [openModal, setOpenModal] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowCount, setRowCount] = React.useState(0);
    const [dataFetched, setDataFetched] = React.useState(false);

    const [message, setMessage] = React.useState(emptyMessage);

    const [data, setData] = React.useState(emptyData);

    const showMensagem = (type, text, callback) => {
        setMessage({
            ...message,
            type: type,
            open: true,
            text: text,
            callback: callback,
        });
    }

    React.useEffect(() => {
        setUaid(0);
        if (unidadeAtendimento != null) {
            setUaid(unidadeAtendimento.id);
        }
    }, [unidadeAtendimento]);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(pessoa, uaid, status, page, rowsPerPage);
        AtendimentoService.getAtendimentos(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [rowCount, pessoa, uaid, status, setRowsPerPage, setPage, page, rowsPerPage]);

    const atualizaLista = (r) => {
        setRowCount(rowCount + 1);
    }

    const handleEdit = (idValue) => {
        setOpenModal(true);
    }

    const handleRemove = (idValue) => {
        showMensagem(Message.QUESTION, "Confirma a exclusão deste atendimento?",
            () => {
                AtendimentoService.deleteAtendimento(idValue)
                    .then((r) => {
                        atualizaLista(r);
                    })
                    showMensagem(Message.ERROR, "Não é possível excluir este ATENDIMENTO do sistema"
                            + " porque já existem registros vinculados a ele.");
            }
        );
    }

    const handleOnClose = () => {
        setOpenModal(false);
    }

    return (
        <BaseForm title="Atendimentos">
            <AtendimentoContagem 
                rowCount={rowCount} 
                unidadeAtendimentoId={uaid} />
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
                            <NewButton
                                label="Criar Atendimento"
                                onClick={() => handleEdit(0)} />
                        </React.Fragment>

                    }
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item sm={12} md={6}>
                                <FieldPessoaComponent
                                    id="pessoa"
                                    name="pessoa"
                                    pessoa={pessoa}
                                    callback={setPessoa}
                                    onlySearch />
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Status do Atendimento</FormLabel>
                                    <RadioGroup
                                        row
                                        defaultValue={Status.TODOS}
                                        aria-label="status"
                                        name="status"
                                        value={status}
                                        onChange={(event) => setStatus(event.target.value)}>
                                        <FormControlLabel value={Status.TODOS} control={<Radio color="primary" />} label="Todos" />
                                        <FormControlLabel value={Status.ABERTO} control={<Radio color="primary" />} label="Aberto" />
                                        <FormControlLabel value={Status.INICIADO} control={<Radio color="primary" />} label="Iniciado" />
                                        <FormControlLabel value={Status.AUTORIZADO} control={<Radio color="primary" />} label="Autorizado" />
                                        <FormControlLabel value={Status.NEGADO} control={<Radio color="primary" />} label="Negado" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item sm={12} md={12}>
                                <ComboUnidadeAtendimento
                                    id="unidadeAtendimento"
                                    label="Unidade de Atendimento"
                                    value={unidadeAtendimento}
                                    callback={(value) => setUnidadeAtendimento(value)}
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
                        <AtendimentoTableRow
                            key={"row-" + key}
                            row={row}
                            onDeleteRow={handleRemove} />
                    );
                })}
            </CustomTable>

            <MessageDialogForm
                value={message}
                callback={setMessage} />

            <AtendimentoCadastro
                openModal={openModal}
                onClose={handleOnClose}
                callback={atualizaLista}
            />
        </BaseForm>

    );
}