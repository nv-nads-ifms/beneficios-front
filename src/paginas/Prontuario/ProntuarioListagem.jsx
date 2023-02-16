import ProntuarioService from '../../services/ProntuarioService';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import CustomTable from '../../components/CustomTable/CustomTable';
import React, { useContext } from 'react';
import ProntuarioTableRow from './ProntuarioTableRow';
import { userContext } from '../../hooks/userContext';
import {
    Card, CardContent, CardHeader, Collapse,
    FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup
} from '@material-ui/core';
import { emptyData, Status } from '../../api/utils/constants';
import BaseForm from '../../components/CustomForms/BaseForm';
import NewButton from '../../components/CustomButtons/NewButton';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIconButton from '../../components/CustomIconButtons/ExpandMoreIconButton';
import ProntuarioContagem from './Components/ProntuarioContagem';
import FieldPessoaComponent from '../Pessoa/FieldPessoaComponent';
import ComboUnidadeAtendimento from '../UnidadeAtendimento/ComboUnidadeAtendimento';
import { emptyPessoa } from '../../models/Pessoa';
import { ativacaoModalMessage, deleteModalMessage, swalWithBootstrapButtons } from '../../api/utils/modalMessages';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';

const columns = [
    { id: 'id', label: 'Número' },
    { id: 'status', label: 'Status' },
    { id: 'unidadeAtendimento', label: 'Unidade de Atendimento' },
    { id: 'titular', label: 'Titular' },
    { id: 'emissao', label: 'Emissão' },
    { id: 'acompanhamento', label: 'Acompanhamento' },
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

export default function ProntuarioListagem() {
    let history = useHistory();
    const usuario = useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/prontuarios');

    const [pessoa, setPessoa] = React.useState(emptyPessoa);
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(usuario.funcionario.unidadeAtendimento);
    const [uaid, setUaid] = React.useState(usuario.funcionario.unidadeAtendimento.id);

    const [expanded, setExpanded] = React.useState(false);

    const [tamanho, setTamanho] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState(emptyData);
    const [value, setValue] = React.useState('');
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setUaid(0);
        if (unidadeAtendimento != null) {
            setUaid(unidadeAtendimento.id);
        }
    }, [unidadeAtendimento]);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(pessoa, uaid, value, page, rowsPerPage);
        ProntuarioService.getProntuarios(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data);
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [value, pessoa, uaid, tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleAction = (id, action) => {
        history.push(`/prontuarios-ficha/${id}/${action}`);
    }

    const atualizaLista = () => {
        setTamanho(tamanho + 1);
    }

    const handleDelete = (row) => {
        deleteModalMessage(
            `Prontuário ${row.id}`,
            () => ProntuarioService.deleteProntuario(row.id),
            atualizaLista
        );
    }

    const ativacaoModalMessageComInput = (mensagem, id, status) => {
        Swal.fire({
            title: mensagem,
            text: "Você não poderá reverter essa operação!",
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: `Confirmar`,
            cancelButtonText: `Cancelar`,
            showLoaderOnConfirm: true,
            preConfirm: (observacao) => {
                return observacao;
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                ProntuarioService.ativarProntuario(id, result.value, status)
                    .then(() => {
                        swalWithBootstrapButtons.fire(
                            'Alterado!',
                            `O status ${status} foi modificado.`,
                            'success'
                        );
                        atualizaLista();
                    })
                    .catch((error) => {
                        swalWithBootstrapButtons.fire(
                            'Ooops!',
                            `Não foi possível ${status}.`,
                            'error'
                        );
                    });

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    `A operação foi cancelada e o Status foi mantido. ;)`,
                    'error'
                )
            }
        });
    }

    const handleDesativar = (value) => {
        ativacaoModalMessageComInput(
            "Informe o motivo da INATIVAÇÃO do prontuário de " +
            value.titular.nome + "?", value.id, 'desativar'
        );
    }

    const handleRestore = (value) => {
        ativacaoModalMessageComInput(
            "Informe o motivo da REATIVAÇÃO do prontuário de " +
            value.titular.nome + "?", value.id, 'reativar'
        );
    }

    const handleAtivar = (value) => {
        const status = "ativar";
        ativacaoModalMessage(
            "Confirma a ATIVAÇÃO do prontuário de " +
            value.titular.nome + "?",
            status,
            () => ProntuarioService.ativarProntuario(value.id, "", status),
            atualizaLista
        );
    }

    return (
        <BaseForm title="Listagem de Prontuarios" >
            <ProntuarioContagem
                rowCount={tamanho}
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
                            {perfil.escrever && (
                                <NewButton
                                    label="Criar Prontuário"
                                    onClick={() => handleAction(0, 'edit')} />
                            )}
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
                                    <FormLabel component="legend">Status do Prontuário</FormLabel>
                                    <RadioGroup
                                        row
                                        defaultValue={Status.TODOS}
                                        aria-label="status"
                                        name="status"
                                        value={value}
                                        onChange={(event) => setValue(event.target.value)}>
                                        <FormControlLabel value={Status.TODOS} control={<Radio color="primary" />} label="Todos" />
                                        <FormControlLabel value={Status.ATIVO} control={<Radio color="primary" />} label="Ativos" />
                                        <FormControlLabel value={Status.PENDENTE} control={<Radio color="primary" />} label="Pendentes" />
                                        <FormControlLabel value={Status.INATIVO} control={<Radio color="primary" />} label="Inativos" />
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
                columns={columns}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                dataFetched={dataFetched}
            >
                {data.content.map((row, key) => {
                    return (
                        <ProntuarioTableRow
                            key={"row-" + key}
                            row={row}
                            onView={perfil.ler ? (row) => handleAction(row.id, 'view') : null}
                            onEdit={perfil.escrever ? (row) => handleAction(row.id, 'edit') : null}
                            onRemove={perfil.remover ? handleDelete : null}
                            onAtivar={perfil.escrever ? handleAtivar : null}
                            onDesativar={perfil.escrever ? handleDesativar : null}
                            onRestore={perfil.escrever ? handleRestore : null} />
                    );
                })}
            </CustomTable>
        </BaseForm>
    );
}