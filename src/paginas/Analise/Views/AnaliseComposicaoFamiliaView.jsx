import React from 'react';
import {
    Avatar, Card, CardContent, CardHeader, Collapse, Grid, Typography
} from '@material-ui/core';
import ExpandMoreIconButton from '../../../components/CustomIconButtons/ExpandMoreIconButton';
import GroupIcon from '@material-ui/icons/Group';
import ListPessoaView from '../Components/ListPessoaView';

export default function AnaliseComposicaoFamiliaView(props) {
    const { atendimento } = props;
    const [expanded, setExpanded] = React.useState(false);

    const dependentes = atendimento.prontuario.dependentes;

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Composição Familiar"
                        aria-label="familia">
                        <GroupIcon />
                    </Avatar>
                }
                disableTypography={false}
                title={
                    <Typography variant="h6" >
                        Composição familiar
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
                    {dependentes.length > 0 && (
                        <Grid container spacing={2}>
                            {dependentes.map((obj, index) => (
                                <Grid item key={index}>
                                    <ListPessoaView pessoa={obj.pessoa} parentesco={obj.parentesco} key={index} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}