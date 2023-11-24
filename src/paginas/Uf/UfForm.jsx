import React from 'react';

import { objectContext } from '../../contexts/objectContext';
import { DNAStatus, emptyBaseObject } from '../../api/utils/constants';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { Grid, ListItemText, TextField } from '@mui/material';
import DNAStatusComponent from '../../components/V1.0.0/DNAStatusComponent';
import { handleChangeInputComponent } from '../../api/utils/util';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';

const emptyUf = {
    ...emptyBaseObject,
    pais: null
}

function UfForm (props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [uf, setUf] = React.useState(emptyUf);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setUf, uf);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    return (
        <objectContext.Provider value={{
            object: uf,
            setObject: setUf,
            emptyObject: emptyUf
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados da Unidade Federativa"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListItemText primary={uf.id} secondary="Código" />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField
                            id='nome'
                            value={uf.nome}
                            label={"Nome da Unidade Federativa"}
                            variant='outlined'
                            fullWidth
                            disabled={datacontrol === DNAStatusComponent.VIEW}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            id='sigla'
                            value={uf.sigla}
                            label={"Sigla da Unidade Federativa"}
                            variant='outlined'
                            fullWidth
                            disabled={datacontrol === DNAStatusComponent.VIEW}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DNAAutocomplete
                            id="pais"
                            path="pais"
                            input_label="País"
                            value={uf.pais}
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

export default UfForm;