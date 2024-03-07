import React from 'react';
import Moment from 'moment';

import { formContext } from '../../contexts/formContext';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { userContext } from '../../hooks/userContext';
import { DNAStatus, Status } from '../../api/utils/constants';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import { firstName } from '../../api/utils/stringUtils';
import FieldPessoaComponent from '../Pessoa/FieldPessoaComponent';
import ComboUnidadeAtendimento from '../UnidadeAtendimento/ComboUnidadeAtendimento';
import AtendimentoForm from './AtendimentoForm';
import AtendimentoContagem from './AtendimentoContagem';
import { emptyPerfilMenu, getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { PlayCircleOutline, Visibility } from '@mui/icons-material';
import { ativacaoModalMessage, swalWithBootstrapButtons } from '../../api/utils/modalMessages';
import DataService from '../../api/services/DataServices';
import AnaliseForm from '../Analise/AnaliseForm';

export const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        renderCell: (params) => {
            return (
                <ChipStatus status={params.value} />
            );
        }
    },
    {
        field: 'unidadeAtendimento',
        headerName: 'Unidade de Atendimento',
        width: 200,
        valueGetter: ({ row }) => row.atendente.unidadeAtendimento.numeroDaUnidade
    },
    {
        field: 'prontuario',
        headerName: 'Prontuário',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ value }) => {
            if (value != null) {
                return `${value.id}/${value.unidadeAtendimento.numeroDaUnidade}`;
            }
            return '<< Sem Prontuário >>';
        }
    },
    {
        field: 'atendente',
        headerName: 'Atendente',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ value }) => firstName(value.nome)
    },
    {
        field: 'pessoa',
        headerName: 'Assistido',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ value }) => value.nome
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
];

/* Classe de controle para acesso aos serviços do BACKEND */
const path = "atendimentos";
const pathAnalise = 'analises';
const dataService = new DataService(`/${path}`);

function AtendimentoConsulta() {
    const usuario = React.useContext(userContext);
    /* Perfil de analise dos atendimentos */
    const perfilAnalise = React.useMemo(() => {
        if (usuario != null && usuario.hasOwnProperty('perfis'))
            return getMenuPerfilByUrl(usuario.perfis, `/${pathAnalise}`);
        return emptyPerfilMenu;
    }, [usuario]);

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [pessoa, setPessoa] = React.useState(null);
    const [status, setStatus] = React.useState(Status.TODOS);
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(null);

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [openAnalise, setOpenAnalise] = React.useState(false);
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

    const uaid = React.useMemo(() => {
        return unidadeAtendimento != null ? unidadeAtendimento.id : 0;
    }, [unidadeAtendimento]);

    const decrement = React.useCallback(() => {
        if (formId >= 0) {
            setFormId(formId - 1);
        } else {
            setFormId(-1);
        }
    }, [formId]);

    const handleClose = (form) => {
        if (form == null) {
            setOpen(false);
        } else {
            setOpenAnalise(false);
        }
        decrement();
    };

    const handleStart = React.useCallback(
        (params) => () => {
            if (params.row.status === Status.INICIADO) {
                swalWithBootstrapButtons.fire(
                    'Ooops!',
                    `O ATENDIMENTO já foi iniciado.`,
                    'warning'
                );
            } else {
                ativacaoModalMessage(
                    'Iniciar atendimento?', 'Iniciar',
                    () => dataService.save(['iniciar', params.id]),
                    (value) => {
                        setFormId(value.id);
                        setOpenAnalise(true);
                    }
                );
            }
        }, []);

    const handleView = React.useCallback(
        (params) => () => {
            if (params.row.status === Status.ABERTO) {
                swalWithBootstrapButtons.fire(
                    'Ooops!',
                    `O ATENDIMENTO ainda não foi INICIADO.`,
                    'warning'
                );
            } else {
                setFormId(params.id);
                setOpenAnalise(true);
            }
        }, []);

    const buttonMoreActions = React.useMemo(() => {
        if (perfilAnalise !== undefined && perfilAnalise.escrever) {
            return [
                { label: 'Iniciar análise', icon: <PlayCircleOutline />, handleClick: handleStart },
                { label: 'Ver análise', icon: <Visibility />, handleClick: handleView },
            ];
        }
        return [];
    }, [perfilAnalise, handleStart, handleView]);

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle='Consultar Atendimentos'
                filterparams={{
                    pessoaId: pessoa != null ? pessoa.id : '',
                    unidadeAtendimentoId: uaid,
                    status: status !== Status.TODOS ? status : '',
                }}
                columns={columns}
                moreActions={buttonMoreActions}
                gridHeigh={350}
            >
                <AtendimentoContagem
                    rowCount={formId}
                    unidadeAtendimentoId={uaid} />

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
            </DNADefaultDialogListForm>

            <AtendimentoForm
                id_value={formId}
                datacontrol={dataControl}
                on_change_datacontrol={setDataControl}
                open={open}
                on_close_func={handleClose}
                data_source_url={path}
            />

            <AnaliseForm
                id_value={formId}
                datacontrol={dataControl}
                on_change_datacontrol={setDataControl}
                open={openAnalise}
                on_close_func={() => handleClose(1)}
                data_source_url={path}
            />
        </formContext.Provider>
    );
}

export default AtendimentoConsulta;