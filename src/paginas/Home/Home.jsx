import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import BaseForm from '../../components/CustomForms/BaseForm';
import { userContext } from '../../hooks/userContext';
import { Sexo } from '../../api/utils/constants';

function getSaudacao(horario) {
    const h = horario.getHours();
    if (h > 5 && h <= 12) {
        return "Bom dia!";
    } else if (h > 12 && h <= 18) {
        return "Boa tarde!";
    }
    return "Boa noite!";
}

function Home() {
    const horario = new Date();
    const usuario = React.useContext(userContext);

    return (
        <BaseForm
            title="Painéis de acompanhamento">
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    {usuario.funcionario != null && (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom align="center">
                                Bem-{usuario.funcionario.sexo === Sexo.MASCULINO ? "vindo" : "vinda"}
                                &nbsp; ao Sistema de Gestão de Benefícios Eventuais.
                            </Typography>
                            <Typography variant="body1" align="center">
                                {getSaudacao(horario)}
                            </Typography>
                            <Typography variant="subtitle1" align="center">
                                Tenha um ótimo trabalho hoje!
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" align="center">
                                -- {usuario.funcionario.nome} --
                            </Typography>
                        </React.Fragment>
                    )}
                </Grid>
            </Grid>
        </BaseForm>
    );
}

export default Home;