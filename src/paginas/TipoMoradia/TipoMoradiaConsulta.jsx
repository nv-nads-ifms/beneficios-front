import React, { useState } from "react";

import { formContext } from '../../contexts/formContext';
import { DNAStatus } from '../../api/utils/constants';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import TipoMoradiaForm from './TipoMoradiaForm';

const columns = [
    { field: 'id', headerName: 'Código', width: 90 },
    {
        field: 'nome',
        headerName: 'Descrição',
        minWidth: 150,
        flex: 1
    },
    {
        field: 'complementar',
        headerName: 'Exige Complemento?',
        width: 180,
        renderCell: ({ value }) => value ? "Exige Complemento" : "Complemento Opcional.",
    }
];

function TipoMoradiaConsulta() {
    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "tipos-de-moradia";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [descricao, setDescricao] = useState("");
    const [complementar, setComplementar] = useState(false);

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
                    formtitle='Consultar Tipos de Moradia'
                    filterparams={{
                        nome: descricao,
                        complementar: complementar,
                    }}
                    columns={columns}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id='nome'
                                value={descricao}
                                label={"Buscar por Descrição"}
                                variant='outlined'
                                fullWidth
                                onChange={(event) => setDescricao(event.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                label={"Exige complemento?"}
                                control={
                                    <Switch
                                        checked={complementar}

                                        onChange={(e, value) => setComplementar(value)}

                                        name="complementar"
                                        color="primary"
                                        size="medium"

                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </DNADefaultDialogListForm>


                <TipoMoradiaForm
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

export default TipoMoradiaConsulta;