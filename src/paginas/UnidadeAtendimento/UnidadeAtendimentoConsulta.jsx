import React from 'react';

import { formContext } from '../../contexts/formContext';
import { DNAStatus } from '../../api/utils/constants';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { Grid, TextField } from '@mui/material';
import UnidadeAtendimentoForm from './UnidadeAtendimentoForm';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'numeroDaUnidade',
        headerName: 'Número da Unidade',
        width: 150,
    },
    {
        field: 'endereco',
        headerName: 'Endereço',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ value }) => {
            return `${value.logradouroNome}, ${value.numero}, ${value.bairroNome}`;
        }
    },
    {
        field: 'cidade',
        headerName: 'Cidade',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ row }) => {
            return `${row.endereco.cidadeNome} - ${row.endereco.ufSigla}`;
        }
    },
    {
        field: 'matriz',
        headerName: 'Matriz?',
        width: 70,
        valueGetter: ({ value }) => {
            return value ? "Matriz" : "Filial";
        }
    },
];

function UnidadeAtendimentoConsulta() {
    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "unidades-de-atendimento";

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

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle='Consultar Unidades de Atendimento'
                filterparams={{
                    nome: nome,
                }}
                columns={columns}
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


            <UnidadeAtendimentoForm
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

export default UnidadeAtendimentoConsulta;