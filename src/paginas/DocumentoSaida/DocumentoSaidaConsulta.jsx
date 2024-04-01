import React from 'react';

import { formContext } from '../../contexts/formContext';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { DNAStatus, Status } from '../../api/utils/constants';
import DocumentoSaidaContagem from './DocumentoSaidaContagem';
import DocumentoSaidaForm from './DocumentoSaidaForm';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        renderCell: (params) => {
            return (
                <ChipStatus status={params.value} />
            );
        }
    },
    {
        field: 'unidadeAtendimento',
        headerName: 'Unidade de atendimento',
        minWidth: 100,
        flex: 1,
        valueGetter: ({ value }) => value.nome,
    },
    {
        field: 'observacao',
        headerName: 'Observação',
        minWidth: 100,
        flex: 1,
    },
];

function DocumentoSaidaConsulta() {
    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "documento-saida";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [status, setStatus] = React.useState("");

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState(0);

    const decrement = React.useCallback(() => {
        if (formId >= 0) {
            setFormId(formId - 1);
        } else {
            setFormId(-1);
        }
    }, [formId]);

    const handleClose = () => {
        setOpen(false);
        decrement();
    };

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle='Consultar Documentos de Saída'
                filterparams={{
                    status: status === Status.TODOS ? '' : status,
                }}
                columns={columns}
            >
                <DocumentoSaidaContagem rowCount={formId} />

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Status do Documento de Saída</FormLabel>
                            <RadioGroup
                                row
                                defaultValue={Status.TODOS}
                                aria-label="status"
                                name="status"
                                onChange={(e) => setStatus(e.target.value)}>
                                <FormControlLabel value={Status.TODOS} control={<Radio color="primary" />} label="Todos" />
                                <FormControlLabel value={Status.PENDENTE} control={<Radio color="primary" />} label="Pendente" />
                                <FormControlLabel value={Status.PARCIAL} control={<Radio color="primary" />} label="Parcial" />
                                <FormControlLabel value={Status.FINALIZADO} control={<Radio color="primary" />} label="Finalizado" />
                                <FormControlLabel value={Status.CANCELADO} control={<Radio color="primary" />} label="Cancelado" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </DNADefaultDialogListForm>

            <DocumentoSaidaForm
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

export default DocumentoSaidaConsulta;