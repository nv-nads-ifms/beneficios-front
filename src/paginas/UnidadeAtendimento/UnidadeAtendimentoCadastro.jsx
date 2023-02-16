import React from "react";
import { useParams, useHistory } from 'react-router-dom';

import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import UnidadeAtendimentoService from "../../services/UnidadeAtendimentoService";
import TipoUnidadeDeAtendimentoService from "../../services/TipoUnidadeDeAtendimentoService";

import CustomTextField from "../../components/CustomFields/CustomTextField";
import CustomAutoComplete from "../../components/CustomFields/CustomAutoComplete";
import Logradouro from "../../components/Endereco/Logradouro";
import BaseForm from "../../components/CustomForms/BaseForm";
import { emptyUnidadeAtendimento } from "../../models/UnidadeAtendimento";
import { saveModalMessage } from "../../api/utils/modalMessages";
import { userContext } from "../../hooks/userContext";
import { getMenuPerfilByUrl } from "../../api/utils/menuUtils";

export default function UnidadeAtendimentoCadastro() {
    let history = useHistory();
    const { id, status } = useParams();
    const usuario = React.useContext(userContext);
    const returnURL = "/unidades-de-atendimento";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState(emptyUnidadeAtendimento);

    React.useEffect(() => {
        if (id > 0) {
            UnidadeAtendimentoService.getUnidadeAtendimentoById(id)
                .then(r => {
                    setUnidadeAtendimento(r.data);
                })
                .catch(() => {
                    history.push('/404');
                });
        } else {
            return;
        }
    }, [id, history]);

    const handlePost = (event) => {
        saveModalMessage(
            () => UnidadeAtendimentoService.saveUnidadeAtendimento(unidadeAtendimento, id),
            () => history.push(returnURL)
        );
    };

    const onChange = (event, newValue) => {
        let t = event.target;
        let value = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];
        if (t.type === "checkbox") {
            value = t.checked;
        }
        setData(fieldname, value);
    }

    const setData = (fieldname, value) => {
        setUnidadeAtendimento({
            ...unidadeAtendimento,
            [fieldname]: value
        });
    }

    return (
        <BaseForm
            title="Cadastro de Unidade de Atendimento"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <CustomTextField
                        id="nome"
                        label="Nome da Unidade de Atendimento"
                        value={unidadeAtendimento.nome}
                        placeholder={"<< Digite o nome da Unidade de Atendimento >>"}
                        autoFocus={true}
                        disabled={!enabledFields}
                        onChangeHandler={onChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomAutoComplete
                        id="tipoUnidadeAtendimento"
                        value={unidadeAtendimento.tipoUnidadeAtendimento}
                        retrieveDataFunction={TipoUnidadeDeAtendimentoService.getListaTiposUnidadesDeAtendimento}
                        label="Tipo de Unidade de Atendimento"
                        placeholder="<< Selecione um Tipo de Unidade >>"
                        disabled={!enabledFields}
                        onChangeHandler={onChange}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.nome}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        id="numeroDaUnidade"
                        label="Número da Unidade"
                        value={unidadeAtendimento.numeroDaUnidade}
                        disabled={!enabledFields}
                        onChangeHandler={onChange} />
                </Grid>
                <Grid item xs={12}>
                    <Logradouro 
                        disabled={!enabledFields}
                        obj={unidadeAtendimento.endereco} 
                        callback={(value) => setData("endereco", value)} />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={unidadeAtendimento.matriz}
                                onChange={onChange}
                                id="matriz"
                                color="primary"
                                size="medium"
                                disabled={!enabledFields}
                            />
                        }
                        label="Matriz"
                    />
                </Grid>
            </Grid>
        </BaseForm>
    );
}