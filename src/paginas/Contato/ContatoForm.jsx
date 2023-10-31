import React, { useState } from 'react';

import { objectContext } from '../../contexts/objectContext';
import { DNAStatus, emptyBaseObject, TipoContato } from '../../api/utils/constants';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { Grid, ListItemText, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DNAStatusComponent from '../../components/V1.0.0/DNAStatusComponent';
import { handleChangeInputComponent } from '../../api/utils/util';

import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import SettingsCellIcon from '@material-ui/icons/SettingsCell';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const emptyContato = {
    ...emptyBaseObject,
    tipoContato: null,
};


function ContatoForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props

    const [contato, setContato] = useState(emptyContato);

    const handleChange = (event, newValue) => {
        console.log(newValue)
        handleChangeInputComponent(event, newValue, setContato, contato);
        
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    return (
        <objectContext.Provider value={{
            object: contato,
            setObject: setContato,
            emptyObject: emptyContato
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Contato"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListItemText primary={contato.id} secondary="Código" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='nome'
                            value={contato.nome}
                            label={"Nome do tipo do Contato"}
                            variant='outlined'
                            fullWidth
                            disabled={datacontrol === DNAStatusComponent.VIEW}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            // id="tipoContato"
                            name="tipoContato"
                            value={contato.tipoContato}
                            exclusive
                            size="large"
                            onChange={handleChange}
                            aria-label="text tipo contato"
                        >
                            <ToggleButton disabled={datacontrol === DNAStatusComponent.VIEW} name="tipoContato" value={"PHONE"} aria-label="telefone">
                                <PhoneIcon />
                            </ToggleButton>
                            <ToggleButton disabled={datacontrol === DNAStatusComponent.VIEW} name="tipoContato" value={"MAIL"} aria-label="e-mail">
                                <MailIcon />
                            </ToggleButton>
                            <ToggleButton disabled={datacontrol === DNAStatusComponent.VIEW} name="tipoContato" value={"TWITTER"} aria-label="twitter">
                                <TwitterIcon />
                            </ToggleButton>
                            <ToggleButton disabled={datacontrol === DNAStatusComponent.VIEW} name="tipoContato" value={"FACEBOOK"} aria-label="facebook">
                                <FacebookIcon />
                            </ToggleButton>
                            <ToggleButton disabled={datacontrol === DNAStatusComponent.VIEW} name="tipoContato" value={"CELLPHONE"} aria-label="celular">
                                <SettingsCellIcon />
                            </ToggleButton>
                            <ToggleButton disabled={datacontrol === DNAStatusComponent.VIEW} name="tipoContato" value={"WHATSAPP"} aria-label="whatsApp">
                                <WhatsAppIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>

                </Grid>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default ContatoForm;