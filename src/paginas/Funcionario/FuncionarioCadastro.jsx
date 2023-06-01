import React from "react";
import Moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@material-ui/core";
import FuncionarioService from "../../services/FuncionarioService";

import CustomTextField from "../../components/CustomFields/CustomTextField";
import CustomAutoComplete from "../../components/CustomFields/CustomAutoComplete";
import FuncaoService from "../../services/FuncaoService";
import UnidadeAtendimentoService from "../../services/UnidadeAtendimentoService";
import BaseForm from "../../components/CustomForms/BaseForm";
import { Sexo } from "../../api/utils/constants";
import { emptyFuncionario } from "../../models/Funcionario";
import { saveModalMessage } from "../../api/utils/modalMessages";
import { userContext } from "../../hooks/userContext";
import { getMenuPerfilByUrl } from "../../api/utils/menuUtils";
import PerfilService from "../../services/PerfilService";

export default function FuncionarioCadastro() {
    let history = useHistory();
    const { id, status } = useParams();
    const loggedUser = React.useContext(userContext);
    const returnURL = "/funcionarios";
    const perfil = getMenuPerfilByUrl(loggedUser.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    const [funcionario, setFuncionario] = React.useState(emptyFuncionario);

    React.useEffect(() => {
        if (id > 0) {
            FuncionarioService.getFuncionarioById(id)
                .then(r => {
                    const data = r.data;
                    const perfis = data.perfis.length > 0 ? data.perfis[0] : null;
                    setFuncionario({
                        ...data,
                        perfil: perfis
                    })
                })
                .catch(() => {
                    history.push('/404');
                });
        }
    }, [id, history]);

    const onChange = (event, newValue) => {
        let t = event.target;
        let value = newValue != null ? newValue : event.target.value;
        const fieldname = t.id.split('-')[0];

        setFuncionario({
            ...funcionario,
            [fieldname]: value
        });
    }

    const handlePost = (event) => {
        saveModalMessage(
            () => FuncionarioService.saveFuncionario(id, funcionario),
            () => history.push(returnURL)
        );
    }

    return (
        <BaseForm
            title="Cadastro de Funcionário"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>
            <Grid container spacing={1}>
                <Grid item md={8} xs={12}>
                    <CustomTextField
                        id="nome"
                        label="Nome"
                        value={funcionario.nome}
                        placeholder={"Digite o nome do funcionário"}
                        autoFocus={true}
                        onChangeHandler={(event) => onChange(event)}
                        disabled={!enabledFields}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Sexo</FormLabel>
                        <RadioGroup
                            row
                            aria-label="sexo"
                            name="sexo"
                            value={funcionario.sexo}
                            onChange={onChange}>
                            <FormControlLabel 
                                value={Sexo.FEMININO} 
                                control={<Radio id="sexo" color="primary" />} 
                                label="Feminino"
                                disabled={!enabledFields} />
                            <FormControlLabel 
                                value={Sexo.MASCULINO} 
                                control={<Radio id="sexo" color="primary" />} 
                                label="Masculino"
                                disabled={!enabledFields} />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item md={8} xs={12}>
                    <CustomTextField
                        id="email"
                        label="E-mail"
                        type="email"
                        value={funcionario.email}
                        placeholder={"Digite o e-mail do funcionário"}
                        autoFocus={true}
                        onChangeHandler={(event) => onChange(event)}
                        disabled={!enabledFields}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <CustomTextField
                        id="nascimento"
                        label="Data de Nascimento"
                        value={Moment(funcionario.nascimento).format('Y-MM-DD')}
                        type="date"
                        onChangeHandler={(event) => onChange(event)}
                        disabled={!enabledFields} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <CustomAutoComplete
                        id="funcao"
                        value={funcionario.funcao}
                        retrieveDataFunction={FuncaoService.getListaFuncoes}
                        label="Função"
                        placeholder="<< Selecione uma Função >>"
                        onChangeHandler={(event, newValue) => onChange(event, newValue)}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.nome}
                        disabled={!enabledFields}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <CustomAutoComplete
                        id="perfil"
                        value={funcionario.perfil}
                        retrieveDataFunction={PerfilService.getListaPerfis}
                        label="Perfil de Acesso ao Sistema"
                        placeholder="<< Selecione um Perfil de Acesso >>"
                        onChangeHandler={(event, newValue) => onChange(event, newValue)}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.nome}
                        disabled={status === 'view' || id > 0}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomAutoComplete
                        id="unidadeAtendimento"
                        value={funcionario.unidadeAtendimento}
                        retrieveDataFunction={UnidadeAtendimentoService.getListaUnidadeAtendimentos}
                        label="Unidade de Atendimento"
                        placeholder="<< Selecione uma Unidade de Atendimento >>"
                        onChangeHandler={(event, newValue) => onChange(event, newValue)}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.numeroDaUnidade + " - " + option.nome}
                        disabled={status === 'view' || id > 0}
                    />
                </Grid>
            </Grid>
        </BaseForm>
    );
}