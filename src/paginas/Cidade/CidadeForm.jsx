import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../hooks/userContext';
import CidadeService from '../../services/CidadeService';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import BaseForm from '../../components/CustomForms/BaseForm';
import CustomAutoComplete from '../../components/CustomFields/CustomAutoComplete';
import UfService from '../../services/UfService';
import { saveModalMessage } from '../../api/utils/modalMessages';
import { Grid } from '@mui/material';
import CustomTextField from '../../components/CustomFields/CustomTextField';

const emptyCidade = {
    nome: '',
    uf: {id: '', nome: ''}
};

export default function CidadeForm() {
    const { id, status } = useParams();

    const usuario = useContext(userContext);
    const returnURL = "/cidades";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    let history = useHistory();
    const [cidade, setCidade] = React.useState(emptyCidade);

    React.useEffect(() => {
        if (id > 0) {
            CidadeService.getCidadeById(id)
                .then(r => {
                    const data = r.data;
                    setCidade(data);
                })
                .catch(() => {
                    history.push('/404');
                });
        } else {
            setCidade(emptyCidade);
        }
    }, [id, history]);

    const onChange = (event, newValue) => {
        const t = event.target;
        const fieldname = t.id.split('-')[0];
        let value = newValue != null ? newValue : t.value;
        if (t.type === "checkbox") {
            value = t.checked;
        }

        setFieldValue(fieldname, value);
    }

    const setFieldValue = (fieldname, value) => {
        setCidade({
            ...cidade,
            [fieldname]: value,
        });
    }

    const handlePost = (event) => {
        saveModalMessage(
            () => CidadeService.saveCidade(id, cidade),
            () => history.push(returnURL)
        );
    }

    return (
        <BaseForm
            title="Cadastro de Cidade"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>
            <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                    <CustomTextField
                        id="nome"
                        label="Nome"
                        value={cidade.nome}
                        placeholder="Digite o nome da Cidade"
                        autoFocus={true}
                        onChangeHandler={onChange}
                        disabled={!enabledFields}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomAutoComplete
                        id="uf"
                        value={cidade.uf}
                        retrieveDataFunction={UfService.getListaUfs}
                        label="Unidade Federativa"
                        placeholder="<< Selecione uma U.F. >>"
                        onChangeHandler={(event, newValue) => onChange(event, newValue)}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.nome}
                        disabled={!enabledFields}
                    />
                </Grid>
            </Grid>
        </BaseForm>
    );
}