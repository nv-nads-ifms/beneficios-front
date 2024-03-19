import React from 'react';

import { formContext } from '../../contexts/formContext';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { emptyDocumentoEntrada } from '../../models/DocumentoEntrada';
import { handleChangeInputComponent } from '../../api/utils/util';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import { DNAStatus } from '../../api/utils/constants';
import DocumentoEntradaContagem from './DocumentoEntradaContagem';
import DocumentoEntradaForm from './DocumentoEntradaForm';

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
        field: 'documento',
        headerName: 'Documento',
        minWidth: 100,
        flex: 1,
        renderCell: ({ row }) => {
            return (
                row.doacao == null || row.doacao === false ? (
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="body1" >{row.processo}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Processo</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{row.ata}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº da Ata</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{row.pregao}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Pregão</Typography>}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={<Typography variant="body1" >{row.empenhoContabil}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Empenho Contábil</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{row.contrato}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº do Contrato</Typography>}
                            />
                            <ListItemText
                                primary={<Typography variant="body1" >{row.numeroNotaFiscal}</Typography>}
                                secondary={<Typography variant="caption" color="textSecondary">Nº da Nota Fiscal</Typography>}
                            />
                        </ListItem>
                    </List>
                ) : (
                    <List>
                        <ListItemText
                            primary={<Typography variant="body2" >Os itens foram Doados</Typography>}
                            secondary={<Typography variant="caption" color="textSecondary">Doação</Typography>}
                        />
                    </List>
                )
            );
        }
    },
    {
        field: 'fornecedor',
        headerName: 'Fornecedor',
        minWidth: 100,
        flex: 1,
        valueGetter: ({ value }) => value.nome
    }
];

function DocumentoEntradaConsulta() {
    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "documento-entrada";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [documentoEntrada, setDocumentoEntrada] = React.useState(emptyDocumentoEntrada);

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

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setDocumentoEntrada, documentoEntrada);
    };

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle='Consultar Documentos de Entrada'
                filterparams={documentoEntrada}
                columns={columns}
            >
                <DocumentoEntradaContagem rowCount={formId} />
                <Grid container spacing={1}>
                    <Grid item lg={2} md={4} sm={6} xs={12}>
                        <TextField
                            id="processo"
                            label="Nº do Processo"
                            onChange={handleChange}
                            fullWidth
                            variant='outlined' />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6} xs={12}>
                        <TextField
                            id="ata"
                            label="Nº da Ata"
                            onChange={handleChange}
                            fullWidth
                            variant='outlined' />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6} xs={12}>
                        <TextField
                            id="pregao"
                            label="Nº do Pregão"
                            onChange={handleChange}
                            fullWidth
                            variant='outlined' />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6} xs={12}>
                        <TextField
                            id="empenhoContabil"
                            label="Nº do Empenho Contábil"
                            onChange={handleChange}
                            fullWidth
                            variant='outlined' />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6} xs={12}>
                        <TextField
                            id="contrato"
                            label="Nº do Contrato"
                            onChange={handleChange}
                            fullWidth
                            variant='outlined' />
                    </Grid>
                    <Grid item lg={2} md={4} sm={6} xs={12}>
                        <TextField
                            id="numeroNotaFiscal"
                            label="Nº da Nota Fiscal"
                            onChange={handleChange}
                            fullWidth
                            variant='outlined' />
                    </Grid>
                    <Grid item xs={12}>
                        <DNAAutocomplete
                            id="fornecedor"
                            path="fornecedores"
                            input_label="Fornecedor"

                            onChange={handleChange}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.nome}

                        />
                    </Grid>
                </Grid>
            </DNADefaultDialogListForm>

            <DocumentoEntradaForm
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

export default DocumentoEntradaConsulta;