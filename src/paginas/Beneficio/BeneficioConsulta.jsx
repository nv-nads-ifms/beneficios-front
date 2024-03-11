import React, { useState } from "react";

// Mui Imports
import { Grid, InputAdornment, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
// Form Imports
import { formContext } from '../../contexts/formContext';
import { DNAStatus } from '../../api/utils/constants';

import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';

import BeneficioForm from "./BeneficioForm";
import { Search } from "@material-ui/icons";

const columns = [
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1
    },
    {
        field: 'outraConcessao',
        headerName: 'Tipo de Concessão',
        minWidth: 150,
        flex: 1,
        renderCell: ({value}) => {
            return value !== undefined && value ? "Outra Concessão" : "Benefício Eventual";
        } ,
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
    const [outraConcessao, setOutraConcessao] = useState(null);

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
                        outraConcessao: outraConcessao != null ? outraConcessao : '',
                    }}
                    columns={columns}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id="nome"
                                label="Nome do Benefício Eventual"
                                placeholder="Buscar pelo nome do benefício eventual"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}

                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ToggleButtonGroup
                                id="outraConcessao"
                                name="outraConcessao"
                                value={outraConcessao}
                                exclusive
                                size="large"
                                onChange={(e, value) => setOutraConcessao(value)}
                                aria-label="Tipo de concessão"
                            >
                                <ToggleButton value={false} aria-label="telefone">
                                    Benfício Eventual
                                </ToggleButton>
                                <ToggleButton value={true} aria-label="e-mail">
                                    Outra concessão
                                </ToggleButton>
                            </ToggleButtonGroup>
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
                    columns={columns}
                />

            </formContext.Provider>
        </>
    )
}