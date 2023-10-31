import React, { useState } from "react";

// Mui Imports
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// Form Imports
import { formContext } from '../../contexts/formContext';
import { DNAStatus } from '../../api/utils/constants';

import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';



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
    {
        field: 'exigeOrgaoExpedidor',
        headerName: 'Exige Orgão Expedidor?',
        minWidth: 150,
        flex: 1,
        renderCell: ({ value }) => value ? "Exige Orgão Expedidor" : "Não Exige Orgão Expedidor",
    },
];

function DocumentoConsulta() {
    const path = "documentos";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [nome, setNome] = useState('');
    const [orgaoExpedidor, setOrgaoExpedidor] = useState('');

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
                        nome: nome,
                        exigeOrgaoExpedidor: orgaoExpedidor,

                    }}
                    columns={columns}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id="nome"
                                fullWidth
                                label="Buscar por Nome"
                                path={`documentos`}
                                input_label={'Nome'}
                                value={nome}
                                onChange={(event, value) => setNome(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel>Exige Orgão Expedidor?</FormLabel>
                                <RadioGroup row 
                                    name="row-radio-buttons-group"
                                    value={orgaoExpedidor}
                                    onChange={(e) => setOrgaoExpedidor(e.target.value)}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Exige" />
                                    <FormControlLabel value={false} control={<Radio />} label="Não Exige" />
                                    <FormControlLabel value={''} control={<Radio />} label="Não Definido" />
                                </RadioGroup>
                            </FormControl>
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