import React from 'react';
import DialogForms from '../../../components/CustomForms/DialogForms';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import { Card, CardContent, CardHeader, Grid, Avatar, Typography } from '@material-ui/core';
import useErros from '../../../hooks/useErros';
import { validarCampo } from '../../../models/validaCampos';
import Logradouro from '../../../components/Endereco/Logradouro';
import CustomAutoComplete from '../../../components/CustomFields/CustomAutoComplete';
import TipoMoradiaService from '../../../services/TipoMoradiaService';
import CondicaoDeMoradiaService from '../../../services/CondicaoDeMoradiaService';
import CustomCurrency from '../../../components/CustomFields/CustomCurrency';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HouseIcon from '@material-ui/icons/House';
import { emptyMoradia, validarMoradia } from '../../../models/Moradia';

export default function MoradiaFormComponent(props) {
    const { value, callback, openModal, onClose } = props;
    const [moradia, setMoradia] = React.useState(emptyMoradia);

    const [erros, validarCampos] = useErros({
        dataOcupacao: validarCampo,
        valor: validarCampo,
        condicaoMoradiaDto: validarCampo,
        tipoMoradiaDto: validarCampo,
        enderecoDto: validarCampo,
        logradouroNome: validarCampo,
        bairroNome: validarCampo,
        cidadeNome: validarCampo,
        ufSigla: validarCampo,
        numero: validarCampo,
    });

    React.useEffect(() => {
        if (value != null) {
            setMoradia(value);
        } else {
            setMoradia(emptyMoradia);
        }
    }, [value]);

    const onChange = (event, newValue) => {
        let t = event.target;
        const fieldname = t.id.split('-')[0];
        setFieldValue(fieldname, newValue != null ? newValue : t.value);
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
            validarCampos(data);
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
                        <Grid item xs={6}>
                            <CustomAutoComplete
                                id="tipoMoradiaDto"
                                value={moradia.tipoMoradiaDto}
                                retrieveDataFunction={TipoMoradiaService.getListaTipoMoradias}
                                label="Tipo de Moradia"
                                placeholder="Selecione um Tipo de Moradia"
                                error={erros.tipoMoradiaDto}
                                onChangeHandler={(event, newValue) => onChange(event, newValue)}
                                getOptionSelected={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.descricao}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomAutoComplete
                                id="condicaoMoradiaDto"
                                value={moradia.condicaoMoradiaDto}
                                retrieveDataFunction={CondicaoDeMoradiaService.getListaCondicoesDeMoradia}
                                label="Condição de Moradia"
                                placeholder="Selecione uma Condição de Moradia"
                                error={erros.condicaoMoradiaDto}
                                onChangeHandler={(event, newValue) => onChange(event, newValue)}
                                getOptionSelected={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.descricao}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField
                                id="dataOcupacao"
                                label="Data de ocupação"
                                value={moradia.dataOcupacao}
                                type="date"
                                error={erros.dataOcupacao}
                                onChangeHandler={onChange} />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField
                                id="dataSaida"
                                label="Data de Saída"
                                value={moradia.dataSaida}
                                onChangeHandler={onChange}
                                type="date" />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField
                                id="valor"
                                label="Valor"
                                value={moradia.valor}
                                error={erros.valor}
                                onChangeHandler={onChange}
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
                                erros={erros}
                                obj={moradia.enderecoDto}
                                callback={(value) => setFieldValue("enderecoDto", value)} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </DialogForms>
    );
}