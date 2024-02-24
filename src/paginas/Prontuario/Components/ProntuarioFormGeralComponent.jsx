
import React from "react";

import { FormControlLabel, Grid, Switch, Typography } from "@material-ui/core";
import CardPessoaComponent from "./CardPessoaComponent";
import DadosTitularComponent from "./DadosTitularComponent";
import DNAAutocomplete from "../../../components/V1.0.0/DNAAutocomplete";
import { TextField } from "@mui/material";
import { objectContext } from "../../../contexts/objectContext";

export default function ProntuarioFormGeralComponent(props) {
    const { disabled, onChange } = props;

    const { object, setObject } = React.useContext(objectContext);

    const [participaGrupo, setParticipaGrupo] = React.useState(false);

    const handleChangeParticipaGrupo = (event) => {
        const participa = event.target.checked;
        setParticipaGrupo(participa);
        if (!participa) {
            setObject({
                ...object,
                grupoSocioeducativo: null,
            });
        }
    }

    const setTitular = (titular) => {
        setObject({
            ...object,
            titular: titular,
        });
    }

    return (
        <React.Fragment>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CardPessoaComponent
                        disabled={disabled}
                        value={object.titular}
                        callback={setTitular}
                        prontuario={object}
                        setProntuario={setObject}>
                        <DadosTitularComponent value={object.titular} />
                    </CardPessoaComponent>
                </Grid>
                <Grid item md={4} lg={4} container direction="row" alignItems="center">
                    <Typography variant="body1" color="textPrimary">
                        Participa de Grupo Sócioeducativo?
                    </Typography>
                </Grid>
                <Grid item md={8} lg={2} container direction="row" alignItems="center">
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
                <Grid item md={4} lg={1} container direction="row" alignItems="center">
                    <Typography
                        variant="body1"
                        color={participaGrupo ? "textPrimary" : "textSecondary"}
                    >
                        Qual?
                    </Typography>
                </Grid>
                <Grid item md={8} lg={5}>
                    <DNAAutocomplete
                        id="grupoSocioeducativo"
                        path="grupo-socioeducativo"
                        input_label="<< Selecione um Grupo Socioeducativo >>"
                        value={object.grupoSocioeducativo}
                        disabled={participaGrupo === false || disabled}
                        onChange={onChange}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        getOptionLabel={(option) => option.nome}
                        input_modal={true}
                        input_modal_title={"Cadastrar um novo Grupo Socioeducativo"}
                    />
                </Grid>
                <Grid item xs={4} container direction="row" alignItems="center">
                    <Typography variant="body1" color="textPrimary">
                        Está em acompanhamento familiar?
                    </Typography>
                </Grid>
                <Grid item xs={8} container direction="row" alignItems="center">
                    <FormControlLabel
                        control={
                            <Switch
                                disabled={disabled}
                                checked={object.acompanhamento}
                                onChange={onChange}
                                name="acompanhamento"
                                id="acompanhamento"
                                color="primary"
                                size="medium"
                            />
                        }
                        label={object.acompanhamento ? "Sim" : "Não"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="descricaoSaude"
                        label="Condições de saúde da famíla"
                        value={object.descricaoSaude}
                        variant="outlined"
                        placeholder={"Descreva a condição de saúde da família"}
                        disabled={disabled}
                        multiline
                        rows={4}
                        fullWidth
                        onChange={onChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}