import React from "react";
import { useParams, useHistory } from 'react-router-dom';
import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import UsuarioService from '../../services/UsuarioService';
import Checkbox from './CheckboxPerfil'
import BaseForm from "../../components/CustomForms/BaseForm";
import CustomTextField from "../../components/CustomFields/CustomTextField";
import CustomAutoComplete from "../../components/CustomFields/CustomAutoComplete";
import FuncionarioService from "../../services/FuncionarioService";
import { Status } from "../../api/utils/constants";
import { userContext } from "../../hooks/userContext";
import { getMenuPerfilByUrl } from "../../api/utils/menuUtils";
import { saveModalMessage } from "../../api/utils/modalMessages";

export default function UsuarioCadastro() {
    let history = useHistory();
    const { id, status } = useParams();
    const loggedUser = React.useContext(userContext);
    const returnURL = "/usuarios";
    const perfil = getMenuPerfilByUrl(loggedUser.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    const [usuario, setUsuario] = React.useState({
        nome: '',
        email: '',
        status: "ATIVO",
        enabled: true,
        funcionario: null,
        perfis: []
    });

    React.useEffect(() => {
        if (id > 0) {
            UsuarioService.getUsuarioById(id)
                .then(resp => {
                    setUsuario(resp.data);
                })
                .catch(() => {
                    history.push('/404');
                });
        }
    }, [id, history]);

    const onChange = (event, newValue) => {
        let t = event.target;
        let value = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];

        if (t.type === "checkbox") {
            value = t.checked;
        }

        if (t.name === 'status') {
            value = t.checked ? Status.ATIVO : Status.INATIVO;
        }

        setUsuario({
            ...usuario,
            [fieldname]: value
        });
    }

    const handlePost = (event) => {
        saveModalMessage(
            () => UsuarioService.saveUsuario(id, usuario),
            () => history.push(returnURL)
        );
    }

    const setPerfis = (value) => {
        setUsuario({
            ...usuario,
            perfis: value,
        })
    }

    return (
        <BaseForm
            title="Cadastro de Usuário"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <CustomTextField
                        id="nome"
                        label="Nome"
                        value={usuario.nome}
                        placeholder="Digite o nome do usuário"
                        autoFocus={true}
                        onChangeHandler={onChange}
                        disabled={!enabledFields}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        id="email"
                        label="E-mail"
                        value={usuario.email}
                        placeholder="Digite o e-mail do usuário"
                        onChangeHandler={onChange}
                        disabled={!enabledFields}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomAutoComplete
                        id="funcionario"
                        value={usuario.funcionario}
                        retrieveDataFunction={FuncionarioService.getListaFuncionarios}
                        label="Funcionário"
                        placeholder="<< Selecione um Funcionário >>"
                        onChangeHandler={(event, newValue) => onChange(event, newValue)}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.nome}
                        disabled={!enabledFields}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={0} direction="column" alignItems="flex-end">
                <Grid item xs>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={usuario.status === Status.ATIVO}
                                onChange={onChange}
                                name="status"
                                color="primary"
                                size="medium"
                            />
                        }
                        label="Ativo"
                        disabled={!enabledFields}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={usuario.enabled}
                                onChange={onChange}
                                name="enabled"
                                color="primary"
                                size="medium"
                            />
                        }
                        label={usuario.enabled ? "Autorizado" : "Bloqueado"}
                        disabled={!enabledFields}
                    />
                </Grid>
            </Grid>
            <Checkbox values={usuario.perfis} callback={setPerfis} read={enabledFields} />
        </BaseForm>
    );
};