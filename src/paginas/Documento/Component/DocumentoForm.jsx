import React from 'react';
import { FormControlLabel, Grid, Switch } from '@material-ui/core';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import MuiAlert from '@material-ui/lab/Alert';

export default function DocumentoForm(props) {
    const { documento, onChange, status } = props;
    //const enabledFields = status != null && status === 'edit';

    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CustomTextField
                        id="descricao"
                        label="Descrição"
                        value={documento.descricao}
                        placeholder="Digite a descrição do Tipo de Documento"
                        autoFocus={true}
                        onChangeHandler={onChange}
                        //disabled={!enabledFields}
                     
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={documento.exigeOrgaoExpedidor}
                                onChange={onChange}
                                name="exigeOrgaoExpedidor"
                                color="primary"
                                size="medium"
                            />
                           
                        }
                        
                        label="Exige órgão expedidor?"
                        
                       //disabled={!enabledFields}
                    />
                   
                </Grid>
            </Grid>
        </React.Fragment>
    );
}