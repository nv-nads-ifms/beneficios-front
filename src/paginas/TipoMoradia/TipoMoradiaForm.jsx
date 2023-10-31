import React, { useState } from 'react';

import { objectContext } from '../../contexts/objectContext';
import { DNAStatus, emptyBaseObject } from '../../api/utils/constants';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { FormControlLabel, Grid, ListItemText, Switch, TextField } from '@mui/material';
import DNAStatusComponent from '../../components/V1.0.0/DNAStatusComponent';
import { handleChangeInputComponent } from '../../api/utils/util';

const emptyMoradia = {
    ...emptyBaseObject,
    complementar: false
}

function TipoMoradiaForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [tipoMoradia, setTipoMoradia] = useState(emptyMoradia);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setTipoMoradia, tipoMoradia);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    return (
        <objectContext.Provider value={{
            object: tipoMoradia,
            setObject: setTipoMoradia,
            emptyObject: emptyMoradia
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do tipo de moradia"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListItemText primary={tipoMoradia.id} secondary="Código" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='nome'
                            value={tipoMoradia.nome}
                            label={"Descricao da moradia"}
                            variant='outlined'
                            fullWidth
                            disabled={datacontrol === DNAStatusComponent.VIEW}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            label={"Exige complemento?"}
                            control={
                                <Switch
                                    checked={tipoMoradia.complementar}
                                    onChange={handleChange}
                                    name="complementar"
                                    color="primary"
                                    size="medium"
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default TipoMoradiaForm;