import React from 'react';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import CustomCurrency from '../../../components/CustomFields/CustomCurrency';
import DialogForms from '../../../components/CustomForms/DialogForms';
import { handleChangeInputComponent } from '../../../api/utils/util';
import { showErrorMessages } from '../../../api/utils/modalMessages';
import { Avatar, Typography } from '@mui/material';
import { Work } from '@mui/icons-material';
import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';

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
                        <Grid item xs={12}>
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
                            <CustomTextField
                                id="valor"
                                label="Rendimento"
                                value={rendimento.valor}
                                onChangeHandler={handleChange}
                                InputProps={{
                                    inputComponent: CustomCurrency,
                                }} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomTextField
                                id="admissao"
                                label="Data de Admissão"
                                value={rendimento.admissao}
                                type="date"
                                onChangeHandler={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomTextField
                                id="demissao"
                                label="Data de Demissão"
                                value={rendimento.demissao}
                                type="date"
                                onChangeHandler={handleChange} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </DialogForms>
    );
}