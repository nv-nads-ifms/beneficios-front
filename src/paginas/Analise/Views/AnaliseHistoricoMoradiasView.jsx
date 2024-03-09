import React from 'react';
import Moment from 'moment';

import { ccyFormat } from '../../../api/format';
import { Sexo } from '../../../api/utils/constants';
import ExpandMoreIconButton from '../../../components/CustomIconButtons/ExpandMoreIconButton';
import { objectContext } from '../../../contexts/objectContext';
import { Avatar, Card, CardContent, CardHeader, Collapse, Paper, Typography } from '@mui/material';
import { House } from '@mui/icons-material';
import { emptyPessoa } from '../../../models/Pessoa';

export default function AnaliseHistoricoMoradiasView() {
    const [expanded, setExpanded] = React.useState(false);

    /* Recuperação do object que será manipulado */
    const { object } = React.useContext(objectContext);
    const [pessoa, setPessoa] = React.useState(emptyPessoa);
    const [moradiasAnteriores, setMoradiasAnteriores] = React.useState([]);

    React.useEffect(() => {
        if (object != null) {
            setPessoa(object.pessoa);
            setMoradiasAnteriores(object.prontuario.titular.moradias.filter(obj => obj.dataSaida != null));
        }
    }, [object]);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Histórico de Moradias"
                        aria-label="moradias">
                        <House />
                    </Avatar>
                }
                disableTypography={false}
                title={
                    <Typography variant="h6" >
                        Histórico de Moradias
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
                    <Paper elevation={2} variant="outlined" style={{ padding: '1em' }}>
                        {moradiasAnteriores.length === 0 && (
                            <Typography variant="caption" color="textSecondary">
                                Sem registro de moradias anteriores
                            </Typography>
                        )}
                        {moradiasAnteriores.map(obj => (
                            <Typography
                                key={obj.id} 
                                variant="body2"
                            >
                                No período entre <b>{Moment(obj.dataOcpacao).format('DD/MM/Y')}</b> e
                                &nbsp;<b>{Moment(obj.dataOcpacao).format('DD/MM/Y')}</b>,
                                &nbsp;{pessoa.sexo === Sexo.MASCULINO ? "ele" : "ela"} morou
                                &nbsp;no bairro <b>{obj.endereco.bairroNome}</b>
                                &nbsp;({obj.endereco.cidadeNome}/{obj.endereco.ufSigla}),
                                &nbsp;<b>{obj.endereco.logradouroNome}, {obj.endereco.numero}</b>.
                                &nbsp;Era uma <b>{obj.tipoMoradia.descricao}</b>,
                                &nbsp;{obj.condicaoMoradia.descricao} no valor de <b>{ccyFormat(obj.valor)}</b>.
                            </Typography>
                        ))}
                    </Paper>
                </CardContent>
            </Collapse>
        </Card>
    );
}