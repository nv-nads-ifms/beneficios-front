import React from 'react';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import useErros from '../../../hooks/useErros';
import { validarCampo } from '../../../models/validaCampos';
import CustomAutoComplete from '../../../components/CustomFields/CustomAutoComplete';
import CustomCurrency from '../../../components/CustomFields/CustomCurrency';
import CondicaoDeTrabalhoService from '../../../services/CondicaoDeTrabalhoService';
import DialogForms from '../../../components/CustomForms/DialogForms';

const emptyRendimento = {
    sequencia: '',
    condicaoTrabalhoDto: null,
    valor: '',
    admissao: '',
    demissao: '',
};

export default function RendimentoFormComponent(props) {
    const { value, callback, openModal, onClose } = props;
    const [ rendimento, setRendimento ] = React.useState(emptyRendimento);

    const [erros, validarCampos, possoEnviar] = useErros({
        condicaoTrabalhoDto: validarCampo,
        valor: validarCampo,
    });

    React.useEffect(() => {
        if (value != null) {
            setRendimento(value);
        } else {
            setRendimento(emptyRendimento);
        }
    }, [value]);

    const onChange = (event, newValue) => {
        let t = event.target;

        const fieldname = t.id.split('-')[0];
        setRendimento({
            ...rendimento,
            [fieldname]: newValue != null ? newValue : t.value,
        });
    }

    const onSaveHandler = () => {
        if (possoEnviar) {
            callback(rendimento);
            onClose();
        }
    };

    const onBlurHandler = (event) => {
        let value = event.target.value;
        const fieldname = event.target.id.split('-')[0];
        if (value === "") {
            const msg = "O campo " + fieldname + " não foi informado.";
            validarCampos({ campo: fieldname, erro: msg });
        } else if (fieldname === "valor" && value < 0) {
            const msg = "O campo " + fieldname + " não pode ter valor negativo.";
            validarCampos({ campo: fieldname, erro: msg });
        } else {
            validarCampos({ campo: fieldname, erro: '' });
        }
    };

    return (
        <DialogForms
            title="Cadastro de Rendimentos da Pessoa"
            open={openModal}
            maxWidth="md"
            onClose={onClose}
            onSave={onSaveHandler}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Dados dos Rendimentos" />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={8}>
                                    <CustomAutoComplete
                                        id="condicaoTrabalhoDto"
                                        value={rendimento.condicaoTrabalhoDto}
                                        retrieveDataFunction={CondicaoDeTrabalhoService.getListaCondicoesDeTrabalho}
                                        label="Condição de Trabalho"
                                        placeholder="Selecione uma Condição de Trabalho"
                                        error={erros.condicaoTrabalhoDto}
                                        onChangeHandler={(event, newValue) => onChange(event, newValue)}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        getOptionLabel={(option) => option.descricao}
                                        onBlur={onBlurHandler}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <CustomTextField
                                        id="valor"
                                        label="Rendimento"
                                        value={rendimento.valor}
                                        error={erros.valor}
                                        onChangeHandler={onChange}
                                        InputProps={{
                                            inputComponent: CustomCurrency,
                                        }} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <CustomTextField
                                        id="admissao"
                                        label="Data de Admissão"
                                        value={rendimento.admissao}
                                        type="date"
                                        error={erros.admissao}
                                        onChangeHandler={onChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomTextField
                                        id="demissao"
                                        label="Data de Demissão"
                                        value={rendimento.demissao}
                                        type="date"
                                        onChangeHandler={onChange} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </DialogForms>
    );
}