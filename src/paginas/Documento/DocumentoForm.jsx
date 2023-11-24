import React, { useState } from 'react';

import { objectContext } from '../../contexts/objectContext';
import { DNAStatus, emptyBaseObject } from '../../api/utils/constants';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { FormControlLabel, Grid, ListItemText, Switch, TextField } from '@mui/material';
import DNAStatusComponent from '../../components/V1.0.0/DNAStatusComponent';
import { handleChangeInputComponent } from '../../api/utils/util';

const emptyDoc = {
    ...emptyBaseObject,
    exigeOrgaoExpedidor: false,

}

function DocumentoForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props

    const [documento, setDocumento] = useState(emptyDoc);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setDocumento, documento);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    return (
        <objectContext.Provider value={{
            object: documento,
            setObject: setDocumento,
            emptyObject: emptyDoc
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Documento"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListItemText primary={documento.id} secondary="Código" />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TextField
                            id='nome'
                            value={documento.nome}
                            label={"Nome do Documento"}
                            variant='outlined'
                            fullWidth
                            disabled={datacontrol === DNAStatusComponent.VIEW}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormControlLabel
                            label="Exige órgão expedidor?"
                            control={
                                <Switch
                                    checked={documento.exigeOrgaoExpedidor}
                                    onChange={handleChange}
                                    name="exigeOrgaoExpedidor"
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

export default DocumentoForm;