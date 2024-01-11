import React from 'react';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { DNAStatus } from '../../api/utils/constants';
import { Avatar, Grid, List, ListItemAvatar, TextField, Typography } from '@mui/material';

import { formContext } from '../../contexts/formContext';
import { ListItem, ListItemText } from '@material-ui/core';
import Moment from 'moment';
import { extractCapitalizeLetters } from '../../api/utils/stringUtils';
import PessoaForm from './PessoaForm';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return (
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <Avatar
                            aria-label="pessoa"
                            src={"data:image/png;base64," + params.row.foto} />
                    </ListItemAvatar>
                    <ListItemText primary={params.value} />
                </ListItem>
            );
        }
    },
    {
        field: 'nascimento',
        headerName: 'Nascimento',
        width: 150,
        renderCell: (params) => Moment(params.value).format('DD/MM/Y')
    },
    {
        field: 'documentos',
        headerName: 'Documentos',
        width: 200,
        renderCell: (params) => {
            return (
                <List dense={true}>
                    {params.row.documentos.map(obj => (
                        <React.Fragment>
                            <ListItemText
                                primary={
                                    <Typography variant="body2">
                                        {obj.numero}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" color="textSecondary">
                                        Número do {extractCapitalizeLetters(obj.documento.nome)}
                                    </Typography>
                                }
                            />
                        </React.Fragment>
                    ))}
                </List>
            );
        }
    },
    {
        field: 'contatos',
        headerName: 'Contatos',
        width: 200,
        renderCell: (params) => {
            return (
                <List dense={true}>
                    {params.row.contatos.map(obj => (
                        <React.Fragment>
                            <ListItemText
                                primary={
                                    <Typography variant="body2">
                                        {obj.descricao}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" color="textSecondary">
                                        {obj.tipoContato.nome}
                                    </Typography>
                                }
                            />
                        </React.Fragment>
                    ))}
                </List>
            );
        }
    },
    {
        field: 'escolaridade',
        headerName: 'Escolaridade',
        minWidth: 150,
        flex: 1,
        valueGetter: (params) => params.value.nome
    }
];

function PessoaConsulta() {
    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "pessoas";

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

    // const handleAtivar = React.useCallback(
    //     (row) => () => {
    //         ativacaoModalMessage("Confirma a ATIVAÇÃO deste Perfil?", '',
    //             () => dataService.save(['ativar', row.id]),
    //             () => setFormId(-3)
    //         );
    //     }, []);

    // const handleBloquear = React.useCallback(
    //     (row) => () => {
    //         ativacaoModalMessage("Confirma a INATIVAÇÃO deste Usuario?", '',
    //             () => dataService.save(['inativar', row.id]),
    //             () => setFormId(-2)
    //         );
    //     }, []);

    // const buttonMoreActions = [
    //     { label: 'Ativar', icon: <Check />, handleClick: handleAtivar },
    //     { label: 'Inativar', icon: <Block />, handleClick: handleBloquear },
    // ];

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle='Consultar Pessoas'
                filterparams={{
                    nome: nome,
                }}
                columns={columns}
                gridHeigh={500}
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

            <PessoaForm
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

export default PessoaConsulta;