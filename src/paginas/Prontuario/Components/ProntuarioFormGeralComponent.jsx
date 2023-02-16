
import React from "react";

import { FormControlLabel, Grid, Switch, Typography } from "@material-ui/core";
import CardPessoaComponent from "./CardPessoaComponent";
import GrupoSocioeducativoService from "../../../services/GrupoSocioeducativoService";
import CustomAutoComplete from "../../../components/CustomFields/CustomAutoComplete";
import CustomTextField from "../../../components/CustomFields/CustomTextField";
import DadosTitularComponent from "./DadosTitularComponent";

export default function ProntuarioFormGeralComponent(props) {
    const { disabled, prontuario, setProntuario, onChange } = props;
    const [participaGrupo, setParticipaGrupo] = React.useState(false);

    const handleChangeParticipaGrupo = (event) => {
        const participa = event.target.checked;
        setParticipaGrupo(participa);
        if (!participa) {
            setProntuario({
                ...prontuario,
                grupoSocioeducativo: null,
            });
        }
    }

    const setTitular = (titular) => {
        setProntuario({
            ...prontuario,
            titular: titular,
        });
    }

    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CardPessoaComponent
                        disabled={disabled}
                        value={prontuario.titular}
                        callback={setTitular}
                        prontuario={prontuario}
                        setProntuario={setProntuario}>
                        <DadosTitularComponent value={prontuario.titular} />
                    </CardPessoaComponent>
                </Grid>
            </Grid>
            <Grid container spacing={0} direction="row" alignItems="center">
                <Grid item xs={4} >
                    <Typography variant="body1" color="textPrimary">
                        Participa de Grupo Sócioeducativo?
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={participaGrupo}
                                onChange={handleChangeParticipaGrupo}
                                name="enabled"
                                color="primary"
                                size="medium"
                                disabled={disabled}
                            />
                        }
                        label={participaGrupo ? "Sim" : "Não"}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography
                        variant="body1"
                        color={participaGrupo ? "textPrimary" : "textSecondary"}
                    >
                        Qual?
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <CustomAutoComplete
                        id="grupoSocioeducativo"
                        disabled={!participaGrupo && disabled}
                        value={prontuario.grupoSocioeducativo}
                        retrieveDataFunction={GrupoSocioeducativoService.getListaGruposSocioeducativos}
                        label="Grupo Sócioeducativo"
                        placeholder="<< Selecione um Grupo Sócioeducativo >>"
                        onChangeHandler={(event, newValue) => onChange(event, newValue)}
                        getOptionSelected={(option, value) => value != null && option.id === value.id}
                        getOptionLabel={(option) => option.nome}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={0} direction="row" alignItems="flex-end">
                <Grid item xs={4} >
                    <Typography variant="body1" color="textPrimary">
                        Está em acompanhamento familiar?
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <FormControlLabel
                        control={
                            <Switch
                                disabled={disabled}
                                checked={prontuario.acompanhamento}
                                onChange={onChange}
                                name="acompanhamento"
                                id="acompanhamento"
                                color="primary"
                                size="medium"
                            />
                        }
                        label={prontuario.acompanhamento ? "Sim" : "Não"}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CustomTextField
                        disabled={disabled}
                        id="descricaoSaude"
                        label="Condições de saúde da famíla"
                        value={prontuario.descricaoSaude}
                        placeholder={"Descreva a condição de saúde da família"}
                        multiline
                        rows={4}
                        onChangeHandler={(event) => onChange(event)}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}