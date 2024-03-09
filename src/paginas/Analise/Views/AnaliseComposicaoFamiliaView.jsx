import React from 'react';

import ExpandMoreIconButton from '../../../components/CustomIconButtons/ExpandMoreIconButton';
import ListPessoaView from '../Components/ListPessoaView';
import { objectContext } from '../../../contexts/objectContext';
import { Avatar, Card, CardContent, CardHeader, Collapse, Grid, Typography } from '@mui/material';
import { Group } from '@mui/icons-material';

export default function AnaliseComposicaoFamiliaView() {
    /* Recuperação do object que será manipulado */
    const { object } = React.useContext(objectContext);

    const [expanded, setExpanded] = React.useState(false);

    const dependentes = React.useMemo(() => {
        if (object != null)
            return object.prontuario.dependentes;
        return [];
    }, [object]);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Composição Familiar"
                        aria-label="familia">
                        <Group />
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
                                <Grid item key={index} xs={12}>
                                    <ListPessoaView pessoa={obj.pessoa} parentesco={obj.parentesco} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}