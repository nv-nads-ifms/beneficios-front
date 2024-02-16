import React from 'react';
import { Card, CardContent, FormControlLabel, Grid, Switch } from '@material-ui/core';
import CustomCurrency from '../../../components/CustomFields/CustomCurrency';
import DialogForms from '../../../components/CustomForms/DialogForms';
import { emptyAuxilio } from '../../../models/Auxilio';
import { Avatar, CardHeader, TextField, Typography } from '@mui/material';
import { LocalPharmacy } from '@mui/icons-material';
import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { extractEventValue, handleChangeInputComponent, handleDatePickerChange, setFieldValue } from '../../../api/utils/util';
import { showErrorMessages } from '../../../api/utils/modalMessages';

export default function AuxilioFormComponent(props) {
    const { value, callback, openModal, onClose } = props;
    const [auxilio, setAuxilio] = React.useState(emptyAuxilio);

    React.useEffect(() => {
        if (value != null) {
            setAuxilio(value);
        } else {
            setAuxilio(emptyAuxilio);
        }
    }, [value]);

    const handleChange = (event, newValue) => {
        const { fieldname } = extractEventValue(event, newValue);
        if (fieldname === 'status') {
            const t = event.target;
            setFieldValue(fieldname, t.checked ? "ATIVO" : "INATIVO", setAuxilio, auxilio);
            setFieldValue('dataFim', !t.checked ? new Date() : '', setAuxilio, auxilio);
        } else {
            handleChangeInputComponent(event, newValue, setAuxilio, auxilio);
        }
    };

    const validarAuxilio = (obj) => {
        let campos = [];
        if (obj.dataRegistro == null || obj.dataRegistro === '') {
            campos.push({ campo: "dataRegistro", erro: "A DATA DE REGISTRO não foi informada." });
        }

        if (obj.programaGoverno == null) {
            campos.push({ campo: "programaGoverno", erro: "O PROGRAMA DE GOVERNO não foi informado." });
        }

        if (obj.valor === '') {
            campos.push({ campo: "valor", erro: "O VALOR relativo ao benefício não foi informado." });
        }
        return campos;
    };

    const onSaveHandler = () => {
        const data = validarAuxilio(auxilio);
        
        if (data.length > 0) {
            showErrorMessages(data);
        } else {
            callback(auxilio);
            onClose();
        }
    };

    return (
        <DialogForms
            title="Cadastro de Benefícios/Programas de Governo da Pessoa"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={onSaveHandler}
        >
            <Card>
                <CardHeader
                    avatar={
                        <Avatar>
                            <LocalPharmacy />
                        </Avatar>
                    }
                    title={
                        <Typography variant="h6">
                            Dados dos Auxílios
                        </Typography>
                    }
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <DNAAutocomplete
                                id="programaGoverno"
                                path="programas-de-governo"
                                input_label="<< Selecione um Benefício/Programa de Governo >>"
                                value={auxilio.programaGoverno}

                                onChange={handleChange}
                                getOptionSelected={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.nome}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                                label='Data de Início'
                                value={dayjs(auxilio.dataRegistro)}
                                disableFuture
                                format='DD/MM/YYYY'
                                onChange={(newValue) => handleDatePickerChange('dataRegistro', newValue["$d"], setAuxilio, auxilio)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="valor"
                                label="Valor"
                                value={auxilio.valor}
                                variant='outlined'
                                fullWidth
                                onChange={handleChange}
                                InputProps={{
                                    inputComponent: CustomCurrency,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item >
                            Status do Benefício/Programa de Governo
                        </Grid>
                        <Grid item >
                            <FormControlLabel
                                control={
                                    <Switch
                                        value={auxilio.status}
                                        checked={auxilio.status === "ATIVO"}
                                        onChange={handleChange}
                                        name="status"
                                        color="primary"
                                        size="medium"
                                    />
                                }
                                label={auxilio.status}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </DialogForms>
    );
}