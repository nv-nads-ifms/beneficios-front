import React from 'react';

import throttle from 'lodash/throttle';
import AutocompleteService from '../../services/AutocompleteService';
import CustomTextField from '../CustomFields/CustomTextField';
import { emptyEndereco, enderecoToString, stringToEndereco } from '../../models/Endereco';
import CepFormModal from './CepFormModal';

import { Autocomplete, Grid, Link, TextField, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

const autocompleteService = { current: null };

export default function Logradouro(props) {
    const { erros, obj, callback, disabled } = props;
    
    const [openModal, setOpenModal] = React.useState(false);

    const [endereco, setEndereco] = React.useState(emptyEndereco);
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);

    React.useEffect(() => {
        if (obj != null) {
            setEndereco(obj);
            setValue(enderecoToString(obj));
        } else {
            setEndereco(emptyEndereco);
            setValue('');
        }
    }, [obj]);

    const fetchLogradouros = React.useMemo(
        () =>
            throttle((request, callback) => {
                return autocompleteService.current
                    .getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current) {
            autocompleteService.current = AutocompleteService;
        }
        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetchLogradouros({ input: inputValue })
            .then(r => {
                const data = r.data;
                if (active) {
                    let newOptions = [];

                    if (value) {
                        newOptions = [value];
                    }
                    if (data) {
                        newOptions = [...newOptions, ...data];
                    }
                    setOptions(newOptions);
                }
            });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetchLogradouros]);

    const handleClick = () => {
        if (disabled != null || !disabled) {
            setOpenModal(true);
        }
    };

    const handleClose = () => {
        setOpenModal(false);
    }

    const atualizaLista = (data) => {
        setEndereco({
            ...endereco,
            cidade: data.cidade,
            bairro: data.bairro,
            logradouro: data.logradouro,
            logradouroNome: data.logradouro.nome,
            bairroNome: data.bairro.nome,
            cidadeNome: data.cidade.nome,
            ufSigla: data.cidade.uf.sigla,
        });
        callback({
            ...endereco,
            cidade: data.cidade,
            bairro: data.bairro,
            logradouro: data.logradouro,
            logradouroNome: data.logradouro.nome,
            bairroNome: data.bairro.nome,
            cidadeNome: data.cidade.nome,
            ufSigla: data.cidade.uf.sigla,
        });
    }

    const onChange = (event, newValue) => {
        let t = event.target;
        let value = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];

        setEndereco({
            ...endereco,
            [fieldname]: value
        });
        callback({
            ...endereco,
            [fieldname]: value
        });
    }

    const onChangeLocalizacaoHandler = (event, newValue) => {
        if (newValue == null) {
            setEndereco(emptyEndereco);
            return;
        }
        
        setEndereco(stringToEndereco(endereco, newValue));

        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);

        callback(stringToEndereco(endereco, newValue));
    }

    return (
        <div>
            <Grid container spacing={1} alignContent="flex-start" alignItems="flex-start">
                <Grid item xs={12}>
                    <Autocomplete
                        id="localizacao"
                        value={value}
                        disabled={disabled}
                        getOptionLabel={(option) => (typeof option === 'string' ? option : option.logradouro)}
                        filterOptions={(x) => x}
                        options={options}
                        autoComplete
                        fullWidth
                        includeInputInList
                        filterSelectedOptions
                        onChange={(event, newValue) => onChangeLocalizacaoHandler(event, newValue)}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params}
                                label="Informe uma localização"
                                variant="outlined"
                                placeholder="Ex: Avenida Weimar Gonçalves Torres, Centro, Naviraí-MS"

                                error={erros != null && erros.endereco != null ? !erros.endereco.valido : false}
                                helperText={erros != null && erros.endereco != null ? erros.endereco.texto : ''}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        )}
                        renderOption={(option) => {
                            return (
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <LocationOn />
                                    </Grid>
                                    <Grid item xs>
                                        <span key='0' style={{ fontWeight: 400 }}>
                                            {option.nome}
                                        </span>
                                        <Typography variant="body2" color="textSecondary">
                                            {option.bairroNome}, {option.cidadeNome} - {option.sigla}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            );
                        }}
                    />
                    <Link
                        variant="body2"
                        underline="hover"
                        onClick={handleClick}>
                        Se a localização não existir, clique aqui para cadastrá-la?
                    </Link>
                </Grid>
                <Grid item xs={2}>
                    <CustomTextField
                        id="numero"
                        label="Número"
                        value={endereco.numero}
                        error={erros != null ? erros.numero : null}
                        disabled={disabled}
                        placeholder={"Ex.: 1234 ou S/N"}
                        onChangeHandler={onChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomTextField
                        id="complemento"
                        label="Complemento"
                        value={endereco.complemento}
                        disabled={disabled}
                        placeholder={"Ex.: Casa/Apto 01..."}
                        required={false}
                        onChangeHandler={onChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        id="referencia"
                        label="Referência"
                        placeholder={"Ex.: Próximo à farmácia ..."}
                        value={endereco.referencia}
                        disabled={disabled}
                        onChangeHandler={onChange}
                    />
                </Grid>
            </Grid>

            <CepFormModal
                openModal={openModal}
                onClose={handleClose}
                callback={atualizaLista}
            />
        </div>
    );
}
