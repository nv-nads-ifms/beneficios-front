import React from 'react';
import { Card, CardContent, CardHeader, Grid, Avatar, TextField, Typography } from '@mui/material';
import CustomCurrency from '../../../components/CustomFields/CustomCurrency';
import DialogForms from '../../../components/CustomForms/DialogForms';
import { handleChangeInputComponent, setFieldValue } from '../../../api/utils/util';
import { showErrorMessages } from '../../../api/utils/modalMessages';
import { Work } from '@mui/icons-material';
import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const emptyRendimento = {
    sequencia: '',
    condicaoTrabalho: null,
    valor: '',
    admissao: '',
    demissao: '',
};

export default function RendimentoFormComponent(props) {
    const { value, callback, openModal, onClose } = props;
    const [rendimento, setRendimento] = React.useState(emptyRendimento);

    React.useEffect(() => {
        if (value != null) {
            setRendimento(value);
        } else {
            setRendimento(emptyRendimento);
        }
    }, [value]);

    const handleChange = (e, newValue) => {
        handleChangeInputComponent(e, newValue, setRendimento, rendimento);
    }

    const validarRendimento = (rendimento) => {
        let campos = [];
        if (rendimento.admissao == null || rendimento.admissao === '') {
            campos.push({ campo: "admissao", erro: "A DATA DE ADMISSÃO não foi informada." });
        }

        if (rendimento.condicaoTrabalho == null) {
            campos.push({ campo: "condicaoTrabalho", erro: "A CONDIÇÃO DE TRABALHO não foi informada." });
        }

        if (rendimento.valor === '') {
            campos.push({ campo: "valor", erro: "O VALOR relativo à moradia não foi informado." });
        }
        return campos;
    };

    const onSaveHandler = () => {
        const data = validarRendimento(rendimento);

        if (data.length > 0) {
            showErrorMessages(data);
        } else {
            callback(rendimento);
            onClose();
        }
    };

    return (
        <DialogForms
            title="Cadastro de Rendimentos da Pessoa"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={onSaveHandler}
        >
            <Card>
                <CardHeader
                    avatar={
                        <Avatar>
                            <Work />
                        </Avatar>
                    }
                    title={
                        <Typography variant="h6">
                            Dados dos Rendimentos
                        </Typography>
                    }
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={8}>
                            <DNAAutocomplete
                                id="condicaoTrabalho"
                                path="condicoes-de-trabalho"
                                input_label="<< Selecione uma Condição de Trabalho >>"
                                value={rendimento.condicaoTrabalho}

                                onChange={handleChange}
                                getOptionSelected={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.nome}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                id="valor"
                                label="Rendimento"
                                value={rendimento.valor}
                                variant='outlined'
                                fullWidth
                                onChange={handleChange}
                                InputProps={{
                                    inputComponent: CustomCurrency,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label='Data de Admissão'
                                value={dayjs(rendimento.admissao)}
                                disableFuture
                                format='DD/MM/YYYY'
                                onChange={(newValue) => setFieldValue('admissao', newValue["$d"], setRendimento, rendimento)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label='Data de Demissão'
                                minDate={dayjs(rendimento.admissao)}
                                value={dayjs(rendimento.demissao)}
                                disableFuture
                                format='DD/MM/YYYY'
                                onChange={(newValue) => setFieldValue('demissao', newValue["$d"], setRendimento, rendimento)}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </DialogForms>
    );
}