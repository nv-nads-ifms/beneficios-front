import React from 'react';
import { Grid, TextField } from '@mui/material';
import { handleChangeInputComponent } from '../../../api/utils/util';
import { objectContext } from '../../../contexts/objectContext';
import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';

export default function DocumentoSaidaDadosForm(props) {
    const { disabled } = props;
    /* Recuperação do objeto Analise que será manipulado */
    const { object, setObject, emptyObject } = React.useContext(objectContext);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setObject, object);
    };

    return (
        <Grid container spacing={1} direction="column">
            <Grid item>
                <DNAAutocomplete
                    id='unidadeAtendimento'
                    path="unidades-de-atendimento"
                    placeholder="<< Selecione uma Unidade de Atendimento >>"
                    input_label={"Unidade de Atendimento Origem"}
                    value={object.unidadeAtendimento}
                    disabled={disabled}
                    onChange={handleChange}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.numeroDaUnidade + " - " +
                        option.nome + (option.matriz ? " [Matriz]" : "")}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="observacao"
                    label="Observação"
                    value={object.observacao}
                    placeholder={"Digite uma observação se necessário"}

                    onChange={handleChange}
                    fullWidth
                    variant='outlined'

                    minRows={4}
                    multiline
                    disabled={disabled}
                />
            </Grid>
        </Grid>
    );
}