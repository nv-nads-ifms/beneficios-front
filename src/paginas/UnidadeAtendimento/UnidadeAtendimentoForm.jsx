import React from 'react';

import { objectContext } from '../../contexts/objectContext';
import { DNAStatus, emptyBaseObject } from '../../api/utils/constants';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { FormControlLabel, Grid, ListItemText, Switch, TextField } from '@mui/material';
import { handleChangeInputComponent } from '../../api/utils/util';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';
import Logradouro from '../../components/Endereco/Logradouro';

const emptyUnidadeAtendimento = {
    ...emptyBaseObject,
    numeroDaUnidade: '',
    tipoUnidadeAtendimento: null,
    matriz: false,
}

function UnidadeAtendimentoForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(emptyUnidadeAtendimento);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setUnidadeAtendimento, unidadeAtendimento);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    const setData = (fieldname, value) => {
        setUnidadeAtendimento({
            ...unidadeAtendimento,
            [fieldname]: value
        });
    }


    return (
        <objectContext.Provider value={{
            object: unidadeAtendimento,
            setObject: setUnidadeAtendimento,
            emptyObject: emptyUnidadeAtendimento
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados da Unidade de Atendimento"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
                fullWidth
                maxWidth={"md"}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListItemText primary={unidadeAtendimento.id} secondary="Código" />
                    </Grid>
                    <Grid item xs={12} lg={5}>
                        <TextField
                            id='nome'
                            value={unidadeAtendimento.nome}
                            label={"Nome da Unidade Federativa"}
                            variant='outlined'
                            fullWidth
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={8} lg={4}>
                        <DNAAutocomplete
                            id="tipoUnidadeAtendimento"
                            path="tipos-de-unidades-atendimento"
                            input_label="Tipo de Unidade de Atendimento"
                            value={unidadeAtendimento.tipoUnidadeAtendimento}
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={handleChange}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.nome}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <TextField
                            id='numeroDaUnidade'
                            value={unidadeAtendimento.numeroDaUnidade}
                            label={"Número da Unidade"}
                            variant='outlined'
                            fullWidth
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Logradouro
                            disabled={datacontrol === DNAStatus.VIEW}
                            obj={unidadeAtendimento.endereco}
                            callback={(value) => setData("endereco", value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={unidadeAtendimento.matriz}
                                    onChange={handleChange}
                                    id="matriz"
                                    color="primary"
                                    size="medium"
                                    disabled={datacontrol === DNAStatus.VIEW}
                                />
                            }
                            label="Matriz"
                        />
                    </Grid>
                </Grid>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default UnidadeAtendimentoForm;