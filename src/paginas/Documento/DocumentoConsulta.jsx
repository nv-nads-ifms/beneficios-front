import React, { useState } from "react";

// Mui Imports
import { Grid, TextField } from '@mui/material';

// Form Imports
import { formContext } from '../../contexts/formContext';
import { DNAStatus } from '../../api/utils/constants';

import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';

import DocumentoForm from "./DocumentoForm";

const columns = [
    {
        field: 'id',
        headerName: 'Código',
        width: 90,
    },
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1
    },
];

function DocumentoConsulta() {
    const path = "documentos";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState(null);

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = useState(false);
    const [dataControl, setDataControl] = useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = useState(0);

    const handleClose = () => {
        setOpen(false);
        setFormId(-1);
    };

    return (
        <>
            <formContext.Provider value={{
                setFormId: setFormId,
                setDataControl: setDataControl,
                setOpen: setOpen
            }}>
                <DNADefaultDialogListForm
                    datasourceUrl={path}
                    formtitle='Consultar Documentos'
                    filterparams={{
                        codigo: codigo,
                        nomeId: nome != null ? nome.id : '',
                    }}
                    columns={columns}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id='id'
                                value={codigo}
                                label={"Buscar por codigo"}
                                variant='outlined'
                                fullWidth
                                onChange={(event) => setCodigo(event.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <DNAAutocomplete
                                id="nome"
                                fullWidth
                                path={`documentos`}
                                input_label={'Nome'}

                                value={nome}
                                onChange={(event, value) => setNome(value)}

                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.nome}
                            />
                        </Grid>
                    </Grid>
                </DNADefaultDialogListForm>

                <DocumentoForm
                    id_value={formId}
                    datacontrol={dataControl}
                    on_change_datacontrol={setDataControl}
                    open={open}
                    on_close_func={handleClose}
                    data_source_url={path}
                /> 




            </formContext.Provider>

        </>
    )
}


export default DocumentoConsulta;