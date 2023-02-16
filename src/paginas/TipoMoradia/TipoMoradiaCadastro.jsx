import React from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import TipoMoradiaService from '../../services/TipoMoradiaService';
import { userContext } from '../../hooks/userContext';
import { saveModalMessage } from '../../api/utils/modalMessages';
import BaseForm from '../../components/CustomForms/BaseForm';
import { FormControlLabel, Grid, Switch } from '@material-ui/core';
import CustomTextField from '../../components/CustomFields/CustomTextField';

const emptyTipoMoradia = {
    descricao: '',
    complementar: false,
}

export default function TipoMoradiaCadastro() {
    const { id, status } = useParams();
    const usuario = React.useContext(userContext);
    const returnURL = "/tipos-de-moradia";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    let history = useHistory();
    const [tipoMoradia, setTipoMoradia] = React.useState(emptyTipoMoradia);

    React.useEffect(() => {
        if (id > 0) {
            TipoMoradiaService.getTipoMoradiaById(id)
                .then(r => setTipoMoradia(r.data))
                .catch(() => history.push('/404'));
        } else {
            setTipoMoradia(emptyTipoMoradia);
        }
    }, [id, history]);

    const onChange = (event) => {
        const t = event.target;
        const fieldname = t.id.split('-')[0];
        let value = t.value;
        if (t.type === "checkbox") {
            value = t.checked;
        }

        setFieldValue(fieldname, value);
    }

    const setFieldValue = (fieldname, value) => {
        setTipoMoradia({
            ...tipoMoradia,
            [fieldname]: value,
        });
    }

    const handlePost = (event) => {
        saveModalMessage(
            () => TipoMoradiaService.saveTipoMoradia(id, tipoMoradia),
            () => history.push(returnURL)
        );
    };

    return (
        <BaseForm
            title="Cadastro de Benefício Eventual"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>
            <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                    <CustomTextField
                        id="descricao"
                        label="Descrição"
                        value={tipoMoradia.descricao}
                        placeholder="Digite a descrição do Tipo de Moradia"
                        autoFocus={true}
                        onChangeHandler={onChange}
                        disabled={!enabledFields}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={tipoMoradia.complementar}
                                onChange={onChange}
                                name="complementar"
                                id="complementar"
                                color="primary"
                                size="medium"
                                disabled={!enabledFields}
                            />
                        }
                        label={"Exige o preenchimento de complemento?"}
                    />
                </Grid>
            </Grid>
        </BaseForm>
    );
}