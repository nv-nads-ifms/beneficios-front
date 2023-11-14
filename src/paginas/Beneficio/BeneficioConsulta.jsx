import React, { useState } from "react";

// Mui Imports
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
// Form Imports
import { formContext } from '../../contexts/formContext';
import { DNAStatus } from '../../api/utils/constants';

import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';

import BeneficioForm from "./BeneficioForm";

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
        field: 'tipoConcessao',
        headerName: 'Tipo de Concessão',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'disponivel',
        headerName: 'Disponivel',
        minWidth: 150,
        flex: 1,
    },
];


export default function BeneficioConsulta() {
    const path = "beneficios-eventuais";

    const [nome, setNome] = useState('');
    const [tipoConcessao, setTipoConcessao] = useState('');
    const [disponivel, setDisponivel] = useState(false);

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
                    formtitle='Consultar Beneficios'
                    filterparams={{
                        nome: nome,
                        tipoConcessao: tipoConcessao

                    }}
                    columns={columns}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                name="nome"
                                fullWidth
                                label="Buscar por Nome"
                                path={`beneficios-eventuais`}
                                input_label={'Nome'}
                                value={nome}
                                onChange={(event, value) => setNome(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                label={"Exige complemento?"}
                                control={
                                    <Switch
                                        checked={disponivel}

                                        onChange={(e, value) => setDisponivel(value)}

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

                <BeneficioForm
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