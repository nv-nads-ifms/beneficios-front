import React, { useState } from 'react';

import { formContext } from '../../contexts/formContext';
import { DNAStatus, Status } from '../../api/utils/constants';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';

import { Grid, TextField } from '@mui/material';
import UsuarioForm from './UsuarioForm';
import AvatarComponent from '../../components/V1.0.0/DNAAvatarComponent';
import { Block, Check } from '@mui/icons-material';
import { ativacaoModalMessage } from '../../api/utils/modalMessages';
import DataService from '../../api/services/DataServices';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'funcionario',
        headerName: 'Nome do funcionario',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ value }) => value.nome
    },
    {
        field: 'nome',
        headerName: 'Nome de Usuario',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'email',
        headerName: 'E-mail',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => <AvatarComponent status={params.row.status} />
    },
    {
        field: 'enabled',
        label: 'Autorização',
        width: 150,
        renderCell: (params) => params ? "Usuario Ativo" : "Usuario Inativo"
    }
];

const path = "usuarios";
const dataService = new DataService(`/${path}`);

const emptyPerfil = {
    id: '',
    nome: '',
    status: Status.ATIVO
};

function UsuarioConsulta() {
    /* Atributos utilizados para realizar a filtragem da consulta */
    const [funcionario, setFuncionario] = useState(null);
    const [perfilSearch, setPerfilSearch] = React.useState(emptyPerfil);
    const [nome, setNome] = useState("");

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = useState(false);
    const [dataControl, setDataControl] = useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = useState(0);

    const handleClose = () => {
        setOpen(false);
        setFormId(-1);
    };

    const handleAtivar = React.useCallback(
        (row) => () => {
            ativacaoModalMessage("Confirma a ATIVAÇÃO deste Perfil?", '',
                () => dataService.save(['ativar', row.id]),
                () => setFormId(-3)
            );
        }, []);

    const handleBloquear = React.useCallback(
        (row) => () => {
            ativacaoModalMessage("Confirma a INATIVAÇÃO deste Usuario?", '',
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
                formtitle='Consultar Listagem de Usuários.'
                filterparams={{
                    funcionarioId: funcionario != null ? funcionario.id : "",
                    nome: nome,
                    perfilId: perfilSearch != null ? perfilSearch.id : '',
                }}
                columns={columns}
                moreActions={buttonMoreActions}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <DNAAutocomplete
                            id="funcionario"
                            fullWidth
                            path={`funcionarios`}
                            input_label={'Buscar por Nome de Funcionario'}

                            value={funcionario}
                            onChange={(event, value) => setFuncionario(value)}

                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.nome}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DNAAutocomplete
                            id="perfilSearch"
                            fullWidth
                            path={`perfis`}
                            input_label={'Buscar pelo Perfil de Acesso'}

                            value={perfilSearch}
                            onChange={(event, value) => setPerfilSearch(value)}

                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.nome}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='nome'
                            value={nome}
                            label={"Buscar por Nome de Usuario"}
                            variant='outlined'
                            fullWidth
                            onChange={(event) => setNome(event.target.value)} />
                    </Grid>
                </Grid>
            </DNADefaultDialogListForm>

            <UsuarioForm
                id_value={formId}
                datacontrol={dataControl}
                on_change_datacontrol={setDataControl}
                open={open}
                on_close_func={handleClose}
                data_source_url={path}
            />

        </formContext.Provider>
    )
}

export default UsuarioConsulta;