import React from 'react';

import AnalisePessoaView from './Views/AnalisePessoaView';
import AnaliseHistoricoMoradiasView from './Views/AnaliseHistoricoMoradiasView';
import SituacaoEconomicaView from './Views/SituacaoEconomicaView';
import AnaliseComposicaoFamiliaView from './Views/AnaliseComposicaoFamiliaView';
import { Grid } from '@mui/material';

export default function AnaliseFicha() {
    return (
        <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
                <AnalisePessoaView />
            </Grid>
            <Grid item xs={12}>
                <AnaliseHistoricoMoradiasView />
            </Grid>
            <Grid item xs={12}>
                <AnaliseComposicaoFamiliaView />
            </Grid>
            <Grid item xs={12}>
                <SituacaoEconomicaView />
            </Grid>
        </Grid>
    );

}