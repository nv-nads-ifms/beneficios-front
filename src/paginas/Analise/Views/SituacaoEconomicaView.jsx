import React from 'react';
import { Avatar, Card, CardContent, CardHeader, Collapse, Typography } from '@mui/material';
import ExpandMoreIconButton from '../../../components/CustomIconButtons/ExpandMoreIconButton';

import ProntuarioRendimentoListagemComponent from '../../Prontuario/SituacaoEconomica/ProntuarioRendimentoListagemComponent';
import { emptyProntuario } from '../../../models/Prontuario';
import { Group } from '@mui/icons-material';

export default function SituacaoEconomicaView(props) {
    const { atendimento } = props;

    const [expanded, setExpanded] = React.useState(false);
    const prontuario = React.useMemo(() => {
        if (atendimento != null) {
            return atendimento.prontuario;
        }
        return emptyProntuario;
    }, [atendimento]);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Situação Econômica"
                        aria-label="situação economica">
                        <Group />
                    </Avatar>
                }
                disableTypography={false}
                title={
                    <Typography variant="h6" >
                        Situação Econômica
                    </Typography>
                }
                action={
                    <ExpandMoreIconButton
                        expanded={expanded}
                        callback={setExpanded} />
                }
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {prontuario.dependentes.length === 0 && (
                        <Typography variant="caption" color="textSecondary">
                            Não existe lançamentos de rendimentos ou auxílios.
                        </Typography>
                    )}
                    {prontuario.dependentes.length > 0 && (
                        <ProntuarioRendimentoListagemComponent prontuario={prontuario} />
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}