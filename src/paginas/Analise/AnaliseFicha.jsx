import React from 'react';

import AnalisePessoaView from './Views/AnalisePessoaView';
import AnaliseHistoricoMoradiasView from './Views/AnaliseHistoricoMoradiasView';
import SituacaoEconomicaView from './Views/SituacaoEconomicaView';
import AnaliseComposicaoFamiliaView from './Views/AnaliseComposicaoFamiliaView';
import { Grid } from '@mui/material';

export default function AnaliseFicha(props) {
    const { atendimento } = props;
    return (
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
                <AnalisePessoaView atendimento={atendimento} />
            </Grid>
            <Grid item xs={12}>
                <AnaliseHistoricoMoradiasView atendimento={atendimento} />
            </Grid>
            <Grid item xs={12}>
                <AnaliseComposicaoFamiliaView atendimento={atendimento} />
            </Grid>
            <Grid item xs={12}>
                <SituacaoEconomicaView atendimento={atendimento} />
            </Grid>
        </Grid>
    );

}