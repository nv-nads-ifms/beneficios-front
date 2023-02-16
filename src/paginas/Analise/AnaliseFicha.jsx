import React from 'react';
import { Grid } from '@material-ui/core';
import AnalisePessoaView from './Views/AnalisePessoaView';
import AnaliseHistoricoMoradiasView from './Views/AnaliseHistoricoMoradiasView';
import SituacaoEconomicaView from './Views/SituacaoEconomicaView';
import AnaliseComposicaoFamiliaView from './Views/AnaliseComposicaoFamiliaView';

export default function AnaliseFicha(props) {
    const { atendimento } = props;

    const moradia = atendimento.pessoa.moradias.filter(obj => obj.dataSaida == null)[0];
    const moradiasAnteriores = atendimento.pessoa.moradias.filter(obj => obj.dataSaida != null);

    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                <AnalisePessoaView atendimento={atendimento} moradia={moradia} />
            </Grid>
            {moradiasAnteriores.length > 0 && (
                <Grid item>
                    <AnaliseHistoricoMoradiasView
                        pessoa={atendimento.pessoa}
                        moradiasAnteriores={moradiasAnteriores} />
                </Grid>
            )}
            <Grid item>
                <AnaliseComposicaoFamiliaView atendimento={atendimento} />
            </Grid>
            <Grid item>
                <SituacaoEconomicaView
                    prontuario={atendimento.prontuario} />
            </Grid>
        </Grid>
    );

}