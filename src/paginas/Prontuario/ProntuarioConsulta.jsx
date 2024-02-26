import React from 'react';
import Moment from 'moment';

import { formContext } from '../../contexts/formContext';
import { DNAStatus, Status } from '../../api/utils/constants';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';
import { Block, Check, Restore } from '@mui/icons-material';
import { ativacaoModalMessage, ativacaoModalMessageComInput } from '../../api/utils/modalMessages';
import DataService from '../../api/services/DataServices';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import ProntuarioContagem from './Components/ProntuarioContagem';
import ProntuarioForm from './ProntuarioForm';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        renderCell: (params) => {
            return (
                <ChipStatus status={params.row.status} />
            );
        }
    },
    {
        field: 'unidadeAtendimento',
        headerName: 'Unidade de Atendimento',
        width: 200,
        valueGetter: (params) => params.value.numeroDaUnidade
    },
    {
        field: 'titular',
        headerName: 'Titular',
        minWidth: 150,
        flex: 1,
        valueGetter: (params) => params.value.nome
    },
    {
        field: 'emissao',
        headerName: 'Emissão',
        width: 180,
        renderCell: (params) => {
            return (
                Moment(params.value).format('DD/MM/Y hh:mm:ss a')
            );
        }
    },
    {
        field: 'acompanhamento',
        headerName: 'Acompanhamento',
        width: 130,
        renderCell: (params) => {
            return (
                params.value ? "Sim" : "Não"
            );
        }
    },
];

/* Classe de controle para acesso aos serviços do BACKEND */
const path = "prontuarios";
const dataService = new DataService(`/${path}`);

function ProntuarioConsulta() {

    const usuario = React.useContext(userContext);

    /* Controle do perfil de acesso */
    const perfil = React.useMemo(() => {
        if (usuario != null && usuario.hasOwnProperty('perfis'))
            return getMenuPerfilByUrl(usuario.perfis, '/prontuarios');
        return [];
    }, [usuario]);

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [pessoa, setPessoa] = React.useState(null);
    const [status, setStatus] = React.useState(Status.TODOS);
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(null);

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState(0);

    React.useEffect(() => {
        if (usuario != null && usuario.hasOwnProperty('funcionario')) {
            setUnidadeAtendimento(usuario.funcionario.unidadeAtendimento);
        } else {
            setUnidadeAtendimento(null);
        }
    }, [usuario]);

    const decrement = React.useCallback(() => {
        if (formId >= 0) {
            setFormId(-1);
        } else {
            setFormId(formId - 1);
        }
    }, [formId]);

    const handleClose = () => {
        setOpen(false);
        decrement();
    };

    const handleAtivar = React.useCallback(
        (params) => () => {
            ativacaoModalMessage(
                "Confirma a ATIVAÇÃO do prontuário de " +
                params.row.titular.nome + "?", '',
                () => dataService.save(['ativar', params.row.id], { observacao: '' }),
                () => decrement()
            );
        }, [decrement]);

    const handleDesativar = React.useCallback(
        (params) => () => {
            ativacaoModalMessageComInput("Informe o motivo da INATIVAÇÃO do prontuário de " +
                params.row.titular.nome + "?", '',
                () => dataService.save(['desativar', params.row.id]),
                () => decrement()
            );
        }, [decrement]);

    const handleRestore = React.useCallback(
        (params) => () => {
            ativacaoModalMessageComInput("Informe o motivo da REATIVAÇÃO do prontuário de " +
            params.row.titular.nome + "?", '',
                () => dataService.save(['reativar', params.row.id]),
                () => decrement()
            );
        }, [decrement]);

    const buttonMoreActions = React.useMemo(() => {
        if (perfil.escrever) {
            return [
                { label: 'Ativar', icon: <Check />, handleClick: handleAtivar },
                { label: 'Desativar', icon: <Block />, handleClick: handleDesativar },
                { label: 'Restaurar', icon: <Restore />, handleClick: handleRestore },
            ];
        }
        return [];
    }, [perfil, handleAtivar, handleDesativar, handleRestore]);

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle='Consultar Prontuários'
                filterparams={{
                    pessoaId: pessoa != null ? pessoa.id : '',
                    unidadeAtendimentoId: unidadeAtendimento != null ? unidadeAtendimento.id : '',
                    status: status !== Status.TODOS ? status : '',
                }}
                columns={columns}
                moreActions={buttonMoreActions}
                gridHeigh={400}
            >
                <ProntuarioContagem
                    rowCount={formId}
                    unidadeAtendimentoId={unidadeAtendimento != null ? unidadeAtendimento.id : ''} />

                <Grid container spacing={1}>
                    <Grid item sm={12} lg={7}>
                        <DNAAutocomplete
                            id="pessoa"
                            path="pessoas"
                            input_label="<< Selecione uma Pessoa >>"
                            value={pessoa}
                            onChange={(e, newValue) => setPessoa(newValue)}
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            getOptionLabel={(option) => option.nome}
                        />
                    </Grid>
                    <Grid item sm={12} lg={5}>
                        <DNAAutocomplete
                            id="unidadeAtendimento"
                            path="unidades-de-atendimento"
                            input_label="<< Selecione uma Unidade de Atendimento >>"
                            value={unidadeAtendimento}
                            onChange={(e, newValue) => setUnidadeAtendimento(newValue)}
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }

                            getOptionLabel={(option) => option.numeroDaUnidade + " - " +
                                option.nome + (option.matriz ? " [Matriz]" : "")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Status do Prontuário</FormLabel>
                            <RadioGroup
                                row
                                defaultValue={Status.TODOS}
                                aria-label="status"
                                name="status"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}>
                                <FormControlLabel value={Status.TODOS} control={<Radio color="primary" />} label="Todos" />
                                <FormControlLabel value={Status.ATIVO} control={<Radio color="primary" />} label="Ativos" />
                                <FormControlLabel value={Status.PENDENTE} control={<Radio color="primary" />} label="Pendentes" />
                                <FormControlLabel value={Status.INATIVO} control={<Radio color="primary" />} label="Inativos" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </DNADefaultDialogListForm>

            <ProntuarioForm
                id_value={formId}
                datacontrol={dataControl}
                on_change_datacontrol={setDataControl}
                open={open}
                on_close_func={handleClose}
                data_source_url={path}
            />
        </formContext.Provider>
    );
}

export default ProntuarioConsulta;