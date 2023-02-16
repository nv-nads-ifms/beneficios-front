import React from 'react';
import Moment from 'moment';
import {
    Avatar, Card, CardContent, CardHeader, Collapse,
    Paper, Typography
} from "@material-ui/core";
import HouseIcon from '@material-ui/icons/House';
import { ccyFormat } from '../../../api/format';
import { Sexo } from '../../../api/utils/constants';
import ExpandMoreIconButton from '../../../components/CustomIconButtons/ExpandMoreIconButton';

export default function AnaliseHistoricoMoradiasView(props) {
    const { pessoa, moradiasAnteriores } = props;
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Histórico de Moradias"
                        aria-label="moradias">
                        <HouseIcon />
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
                            <Typography variant="body2">
                                No período entre <b>{Moment(obj.dataOcpacao).format('DD/MM/Y')}</b> e
                                &nbsp;<b>{Moment(obj.dataOcpacao).format('DD/MM/Y')}</b>,
                                &nbsp;{pessoa.sexo === Sexo.MASCULINO ? "ele" : "ela"} morou
                                &nbsp;no bairro <b>{obj.enderecoDto.bairroNome}</b>
                                &nbsp;({obj.enderecoDto.cidadeNome}/{obj.enderecoDto.ufSigla}),
                                &nbsp;<b>{obj.enderecoDto.logradouroNome}, {obj.enderecoDto.numero}</b>.
                                &nbsp;Era uma <b>{obj.tipoMoradiaDto.descricao}</b>,
                                &nbsp;{obj.condicaoMoradiaDto.descricao} no valor de <b>{ccyFormat(obj.valor)}</b>.
                            </Typography>
                        ))}
                    </Paper>
                </CardContent>
            </Collapse>
        </Card>
    );
}