import React from 'react';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import { Card, CardContent, FormControlLabel, Grid, Switch } from '@material-ui/core';
import useErros from '../../../hooks/useErros';
import { validarCampo } from '../../../models/validaCampos';
import CustomAutoComplete from '../../../components/CustomFields/CustomAutoComplete';
import CustomCurrency from '../../../components/CustomFields/CustomCurrency';
import DialogForms from '../../../components/CustomForms/DialogForms';
import { emptyAuxilio, validarAuxilio } from '../../../models/Auxilio';
import ProgramaDeGovernoService from '../../../services/ProgramaDeGovernoService';

export default function AuxilioFormComponent(props) {
    const { value, callback, openModal, onClose } = props;
    const [auxilio, setAuxilio] = React.useState(emptyAuxilio);

    const [erros, validarCampos] = useErros({
        programaGoverno: validarCampo,
        dataRegistro: validarCampo,
        valor: validarCampo,
    });

    React.useEffect(() => {
        if (value != null) {
            setAuxilio(value);
        } else {
            setAuxilio(emptyAuxilio);
        }
    }, [value]);

    const onChange = (event, newValue) => {
        let t = event.target;
        let value = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];

        if (!isStatus(event)) {
            setAuxilio({
                ...auxilio,
                [fieldname]: value,
            });
        }
    };

    const isStatus = (e) => {
        const t = e.target;
        if (t.name === 'status') {
            setAuxilio({
                ...auxilio,
                status: t.checked ? "ATIVO" : "INATIVO",
                dataFim: !t.checked ? new Date() : '',
            });
            return true;
        }
        return false;
    }

    const onSaveHandler = () => {
        const data = validarAuxilio(auxilio);
        if (data.length > 0) {
            validarCampos(data);
        } else {
            callback(auxilio);
            onClose();
        }
    };

    return (
        <DialogForms
            title="Cadastro de Benefícios/Programas de Governo da Pessoa"
            open={openModal}
            maxWidth="md"
            onClose={onClose}
            onSave={onSaveHandler}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <CustomAutoComplete
                                        id="programaGoverno"
                                        value={auxilio.programaGoverno}
                                        retrieveDataFunction={ProgramaDeGovernoService.getListaProgramasDeGoverno}
                                        label="Benefício/Programa de Governo"
                                        placeholder="Selecione um Benefício/Programa de Governo"
                                        error={erros.programaGoverno}
                                        onChangeHandler={(event, newValue) => onChange(event, newValue)}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        getOptionLabel={(option) => option.descricao}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <CustomTextField
                                        id="dataRegistro"
                                        label="Data de Início"
                                        value={auxilio.dataRegistro}
                                        type="date"
                                        error={erros.dataRegistro}
                                        onChangeHandler={onChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomTextField
                                        id="valor"
                                        label="Valor"
                                        value={auxilio.valor}
                                        error={erros.valor}
                                        onChangeHandler={onChange}
                                        InputProps={{
                                            inputComponent: CustomCurrency,
                                        }} />
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
                                                onChange={onChange}
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
                </Grid>
            </Grid>
        </DialogForms>
    );
}