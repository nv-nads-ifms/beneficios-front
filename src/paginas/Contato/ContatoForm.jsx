import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { TipoContato } from '../../api/utils/constants';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import ContatoService from '../../services/ContatoService';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import SettingsCellIcon from '@material-ui/icons/SettingsCell';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const emptyContato = {
    descricao: '',
    contato: '',
};

export default function ContatoForm(props) {
    const { id, callback, status } = props;
    let history = useHistory();
    const enabledFields = status != null && status === 'edit';

    const [contato, setContato] = React.useState(emptyContato);

    const setValue = (fieldname, value) => {
        setContato({
            ...contato,
            [fieldname]: value,
        });
        callback({
            ...contato,
            [fieldname]: value,
        });
    }
    
    React.useEffect(() => {
        if (id > 0) {
            ContatoService.getContatoById(id)
                .then(response => {
                    setContato(response.data);
                })
                .catch(() => {
                    history.push('/404');
                });
        } else {
            setContato(emptyContato);
        }
    }, [id, history]);

    return (
        <React.Fragment>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <CustomTextField
                        id="descricao"
                        label="Descrição"
                        value={contato.descricao}
                        placeholder="Informe a descrição do Tipo de Contato"
                        autoFocus={true}
                        onChangeHandler={(e) => setValue('descricao', e.target.value)}
                        disabled={!enabledFields}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ToggleButtonGroup
                        id="tipoContato"
                        name="tipoContato"
                        value={contato.tipoContato}
                        exclusive
                        size="large"
                        onChange={(e, value) => setValue('tipoContato', value)}
                        aria-label="text tipo contato"
                    >
                        <ToggleButton disabled={!enabledFields} value={TipoContato.PHONE} aria-label="telefone">
                            <PhoneIcon />
                        </ToggleButton>
                        <ToggleButton disabled={!enabledFields} value={TipoContato.MAIL} aria-label="e-mail">
                            <MailIcon />
                        </ToggleButton>
                        <ToggleButton disabled={!enabledFields} value={TipoContato.TWITTER} aria-label="twitter">
                            <TwitterIcon />
                        </ToggleButton>
                        <ToggleButton disabled={!enabledFields} value={TipoContato.FACEBOOK} aria-label="facebook">
                            <FacebookIcon />
                        </ToggleButton>
                        <ToggleButton disabled={!enabledFields} value={TipoContato.CELLPHONE} aria-label="celular">
                            <SettingsCellIcon />
                        </ToggleButton>
                        <ToggleButton disabled={!enabledFields} value={TipoContato.WHATSAPP} aria-label="whatsApp">
                            <WhatsAppIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}