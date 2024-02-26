import React from 'react';

import { objectContext } from '../../contexts/objectContext';
import { DNAStatus, emptyBaseObject } from '../../api/utils/constants';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { Grid, ListItemText, TextField } from '@mui/material';
import { handleChangeInputComponent } from '../../api/utils/util';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';

const emptyLogradouro = {
    ...emptyBaseObject,
    tipoLogradouro: null
}

function LogradouroForm (props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [logradouro, setLogradouro] = React.useState(emptyLogradouro);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setLogradouro, logradouro);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    return (
        <objectContext.Provider value={{
            object: logradouro,
            setObject: setLogradouro,
            emptyObject: emptyLogradouro
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Logradouro"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListItemText primary={logradouro.id} secondary="Código" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='nome'
                            value={logradouro.nome}
                            label={"Nome do Logradouro"}
                            variant='outlined'
                            fullWidth
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DNAAutocomplete
                            id="tipoLogradouro"
                            path="tipos-de-logradouros"
                            input_label="Tipo de Logradouro"
                            value={logradouro.tipoLogradouro}
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={handleChange}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.nome}
                        />
                    </Grid>
                </Grid>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default LogradouroForm;