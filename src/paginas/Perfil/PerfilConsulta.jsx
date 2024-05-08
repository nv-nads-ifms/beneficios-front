import React from 'react';

import { formContext } from '../../contexts/formContext';
import { DNAStatus, StatusType } from '../../api/utils/constants';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { Avatar, Grid, TextField } from '@mui/material';

import DataService from '../../api/services/DataServices';
import PerfilForm from './PerfilForm';
import { ativacaoModalMessage } from '../../api/utils/modalMessages';

import { Block, Check, DoNotDisturbOn } from '@mui/icons-material';
import { green, pink, yellow } from '@mui/material/colors';

const AvatarComponent = (params) => {
    const { status } = params;
    var component = {};
    switch (status) {
        case StatusType.ATIVO:
            component = { color: green[500], icon: <Check /> };
            break;
        case StatusType.INATIVO:
            component = { color: pink[500], icon: <Block /> };
            break;
        default:
            component = { color: yellow[500], icon: <DoNotDisturbOn /> };
            break;
    }
    return (
        <Avatar sx={{ bgcolor: component.color }}>
            {component.icon}
        </Avatar>
    );
}

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        renderCell: (params) => (
            <AvatarComponent status={params.row.status} />
        )
    },
];

/* Classe de controle para acesso aos serviços do BACKEND */
const path = "perfis";
const dataService = new DataService(`/${path}`);

function PerfilConsulta() {
    /* Atributos utilizados para realizar a filtragem da consulta */
    const [nome, setNome] = React.useState("");

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState(0);

    const handleClose = () => {
        setOpen(false);
        setFormId(-1);
    };

    const handleAtivar = React.useCallback(
        (row) => () => {
            ativacaoModalMessage("Confirma a ATIVAÇÃO deste Perfil?", 'ATIVAR',
                () => dataService.save(['ativar', row.id]),
                () => setFormId(-2)
            );
        }, []);

    const handleBloquear = React.useCallback(
        (row) => () => {
            ativacaoModalMessage("Confirma a INATIVAÇÃO deste Perfil?", 'INATIVAR',
                () => dataService.save(['inativar', row.id]),
                () => setFormId(-2)
            );
        }, []);

    const buttonMoreActions = [
        { label: 'Ativar', icon: <Check />, handleClick: handleAtivar },
        { label: 'Inativar', icon: <Block />, handleClick: handleBloquear },
    ];

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle='Consultar Perfis'
                filterparams={{
                    nome: nome,
                }}
                columns={columns}
                moreActions={buttonMoreActions}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            id='nome'
                            value={nome}
                            label={"Buscar por nome"}
                            variant='outlined'
                            fullWidth
                            onChange={(event) => setNome(event.target.value)} />
                    </Grid>
                </Grid>
            </DNADefaultDialogListForm>


            <PerfilForm
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

export default PerfilConsulta;