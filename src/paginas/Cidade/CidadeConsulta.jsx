import React from 'react';
import { formContext } from '../../contexts/formContext';
import { Grid, TextField } from '@mui/material';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';
import CidadeForm from './CidadeForm';
import { DNAStatus } from '../../api/utils/constants';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'uf',
        headerName: 'Unidade Federativa',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ value }) => {
            return `(${value.sigla}) - ${value.nome}`;
        }
    },
    {
        field: 'pais',
        headerName: 'Pais',
        minWidth: 150,
        flex: 1,
        valueGetter: ({ row }) => {
            return row.uf.pais.nome;
        }
    },
];

function CidadeConsulta() {
    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "cidades";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [nome, setNome] = React.useState("");
    const [uf, setUf] = React.useState(null);

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
                formtitle='Consultar Cidades'
                filterparams={{
                    nome: nome,
                    ufId: uf != null ? uf.id : '',
                }}
                columns={columns}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            id="nome"
                            label="Nome"
                            value={nome}
                            placeholder="Nome da Cidade para buscar"
                            autoFocus={true}
                            onChange={(e) => setNome(e.target.value)}
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DNAAutocomplete
                            id="uf"
                            fullWidth
                            path={`ufs`}
                            input_label={'Unidade Federativa'}

                            value={uf}
                            onChange={(event, value) => setUf(value)}

                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.nome}
                        />
                    </Grid>
                </Grid>
            </DNADefaultDialogListForm>

            <CidadeForm
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

export default CidadeConsulta;