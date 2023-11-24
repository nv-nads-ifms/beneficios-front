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
        renderCell: (value) => value ? "Benefício Eventual" : "Outra Concessão",
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
    const [tipoConcessao, setTipoConcessao] = useState(false);
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
                        
                    }}
                    columns={columns}
                >
                    
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