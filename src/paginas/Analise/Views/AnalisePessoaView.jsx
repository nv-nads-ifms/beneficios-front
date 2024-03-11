import React from 'react';
import Moment from 'moment';

import { ccyFormat } from "../../../api/format";
import { Sexo } from "../../../api/utils/constants";
import ListPessoaView from '../Components/ListPessoaView';
import { emptyPessoa } from '../../../models/Pessoa';
import { emptyProntuario } from '../../../models/Prontuario';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function AnalisePessoaView(props) {
    const { atendimento } = props;
    
    const [pessoa, setPessoa] = React.useState(emptyPessoa);
    const [prontuario, setProntuario] = React.useState(emptyProntuario);
    const [moradia, setMoradia] = React.useState(null);

    React.useEffect(() => {
        if (atendimento != null) {
            setPessoa(atendimento.prontuario.titular);
            setProntuario(atendimento.prontuario);
            setMoradia(atendimento.prontuario.titular.moradias.find(obj => obj.dataSaida == null));
        }
    }, [atendimento]);

    return (
        <List>
            <ListItem>
                <ListItemText
                    primary={
                        <Typography variant="h6" align="center" >
                            Prontuario N.o {atendimento.prontuario.id}
                        </Typography>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography variant="h5" align="center" color="textSecondary" >
                                {prontuario.unidadeAtendimento.nome}
                            </Typography>
                            <Typography variant="subtitle1" align="center" color="textSecondary">
                                Data de emissão: {Moment(prontuario.emissao).format('DD/MM/Y hh:mm:ss a')}
                            </Typography>
                            <Typography variant="subtitle1" align="center" gutterBottom
                                color={prontuario.acompanhamento == null ? "primary" : "secondary"}>
                                {prontuario.acompanhamento == null ? ("Não está") : ("Está")}
                                &nbsp;em acompanhamento familiar.
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={"Dados do Titular"}
                />
            </ListItem>
            <ListItem>
                <ListPessoaView pessoa={pessoa} />
            </ListItem>
            <ListItem>
                {moradia != null && (
                    <ListItemText
                        primary="Dados da moradia"
                        secondary={
                            <React.Fragment>
                                <Typography component="p" variant="caption">
                                    Desde o dia {Moment(moradia.dataOcupacao).format('DD/MM/Y')}, {pessoa.sexo === Sexo.MASCULINO ? "ele" : "ela"} mora em
                                    &nbsp;uma <b>{moradia.tipoMoradia.descricao}</b>,
                                    &nbsp;<b>{moradia.condicaoMoradia.descricao}</b> no valor de <b>{ccyFormat(moradia.valor)}</b>.
                                </Typography>
                                <Typography variant="caption">
                                    Seu endereço fica na <b>{moradia.endereco.logradouroNome},
                                        &nbsp;{moradia.endereco.numero}, {moradia.endereco.bairroNome}</b>, em
                                    &nbsp;{moradia.endereco.cidadeNome}/{moradia.endereco.ufSigla}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                )}
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="Condições de saúde da família"
                    secondary={
                        <Typography variant="caption">
                            {prontuario.descricaoSaude}
                        </Typography>
                    }
                />
            </ListItem>
        </List>
    );
}