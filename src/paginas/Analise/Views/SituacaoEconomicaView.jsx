import React from 'react';
import { Avatar, Card, CardContent, CardHeader, Collapse, Typography } from '@material-ui/core';
import ExpandMoreIconButton from '../../../components/CustomIconButtons/ExpandMoreIconButton';
import GroupIcon from '@material-ui/icons/Group';
import ProntuarioRendimentoListagemComponent from '../../Prontuario/SituacaoEconomica/ProntuarioRendimentoListagemComponent';

export default function SituacaoEconomicaView(props) {
    const { prontuario } = props;
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Situação Econômica"
                        aria-label="situação economica">
                        <GroupIcon />
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