import React from 'react';

import { objectContext } from '../../../contexts/objectContext';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';
import { Status } from '../../../api/utils/constants';
import { handleChangeInputComponent } from '../../../api/utils/util';

function DocumentoEntradaConsultaFiltro() {
    /* Recuperação do objeto que será manipulado */
    const { object, setObject } = React.useContext(objectContext);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setObject, object);
    };

    return (
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
            <Grid item xs={12} md={6}>
                <DNAAutocomplete
                    id="fornecedor"
                    path="fornecedores"
                    input_label="Fornecedor"

                    onChange={handleChange}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.nome}

                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Status do Documento de Entrada</FormLabel>
                    <RadioGroup
                        row
                        defaultValue={Status.TODOS}
                        aria-label="status"
                        name="status"
                        onChange={handleChange}>
                        <FormControlLabel value={Status.TODOS} control={<Radio color="primary" />} label="Todos" />
                        <FormControlLabel value={Status.PENDENTE} control={<Radio color="primary" />} label="Pendente" />
                        <FormControlLabel value={Status.PARCIAL} control={<Radio color="primary" />} label="Parcial" />
                        <FormControlLabel value={Status.RECEBIDO} control={<Radio color="primary" />} label="Recebido" />
                        <FormControlLabel value={Status.CANCELADO} control={<Radio color="primary" />} label="Cancelado" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default DocumentoEntradaConsultaFiltro;