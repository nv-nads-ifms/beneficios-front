import React from 'react';
import DialogForms from '../../../components/CustomForms/DialogForms';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import { Card, CardContent, CardHeader, Grid, Avatar, Typography } from '@material-ui/core';
import Logradouro from '../../../components/Endereco/Logradouro';
import CustomCurrency from '../../../components/CustomFields/CustomCurrency';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HouseIcon from '@material-ui/icons/House';
import { emptyMoradia, validarMoradia } from '../../../models/Moradia';
import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';
import { handleChangeInputComponent } from '../../../api/utils/util';
import { showErrorMessages } from '../../../api/utils/modalMessages';

export default function MoradiaFormComponent(props) {
    const { value, callback, openModal, onClose } = props;
    const [moradia, setMoradia] = React.useState(emptyMoradia);

    React.useEffect(() => {
        if (value != null) {
            setMoradia(value);
        } else {
            setMoradia(emptyMoradia);
        }
    }, [value]);

    const handleChange = (e, newValue) => {
        handleChangeInputComponent(e, newValue, setMoradia, moradia);
    }

    const setFieldValue = (fieldname, value) => {
        setMoradia({
            ...moradia,
            [fieldname]: value,
        });
    }

    const onSaveHandler = () => {
        const data = validarMoradia(moradia);

        if (data.length > 0) {
            showErrorMessages(data);
        } else {
            callback(moradia);
            onClose();
        }
    };

    return (
        <DialogForms
            title="Cadastro de Moradia da Pessoa"
            open={openModal}
            maxWidth="md"
            onClose={onClose}
            onSave={onSaveHandler}
        >
            <Card>
                <CardHeader
                    avatar={
                        <Avatar>
                            <HouseIcon />
                        </Avatar>
                    }
                    title={
                        <Typography variant="h6">
                            Dados da Moradia
                        </Typography>
                    } />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <DNAAutocomplete
                                id="tipoMoradia"
                                path="tipos-de-moradia"
                                input_label="<< Selecione um Tipo de Moradia >>"
                                value={moradia.tipoMoradia}
                                // disabled={disabled}
                                onChange={handleChange}
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                getOptionLabel={(option) => option.nome}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DNAAutocomplete
                                id="condicaoMoradia"
                                path="condicoes-de-moradia"
                                input_label="<< Selecione uma Condição de Moradia >>"
                                value={moradia.condicaoMoradia}
                                // disabled={disabled}
                                onChange={handleChange}
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                getOptionLabel={(option) => option.nome}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomTextField
                                id="dataOcupacao"
                                label="Data de ocupação"
                                value={moradia.dataOcupacao}
                                type="date"
                                onChangeHandler={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomTextField
                                id="dataSaida"
                                label="Data de Saída"
                                value={moradia.dataSaida}
                                onChangeHandler={handleChange}
                                type="date" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomTextField
                                id="valor"
                                label="Valor"
                                value={moradia.valor}
                                onChangeHandler={handleChange}
                                InputProps={{
                                    inputComponent: CustomCurrency,
                                }} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar>
                                    <LocationOnIcon />
                                </Avatar>
                            }
                            title={
                                <Typography variant="h6">
                                    Endereço da Moradia
                                </Typography>
                            } />
                        <CardContent>
                            <Logradouro
                                obj={moradia.endereco}
                                callback={(value) => setFieldValue("endereco", value)} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </DialogForms>
    );
}