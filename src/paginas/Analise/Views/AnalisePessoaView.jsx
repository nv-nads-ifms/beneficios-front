import React from 'react';
import Moment from 'moment';
import { List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { ccyFormat } from "../../../api/format";
import { Sexo } from "../../../api/utils/constants";
import ListPessoaView from '../Components/ListPessoaView';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '3px 3px 10px 3px #ddd',
    },
}));

export default function AnalisePessoaView(props) {
    const { atendimento, moradia } = props;
    const classes = useStyles();
    const pessoa = atendimento.prontuario.titular;
    const prontuario = atendimento.prontuario;

    return (
        <List className={classes.root}>
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
                    <React.Fragment>
                        <ListItemText
                            primary="Dados da moradia"
                            secondary={
                                <React.Fragment>
                                    <Typography component="p" variant="caption">
                                        Desde o dia {Moment(moradia.dataOcupacao).format('DD/MM/Y')}, {pessoa.sexo === Sexo.MASCULINO ? "ele" : "ela"} mora em
                                        &nbsp;uma <b>{moradia.tipoMoradiaDto.descricao}</b>,
                                        &nbsp;<b>{moradia.condicaoMoradiaDto.descricao}</b> no valor de <b>{ccyFormat(moradia.valor)}</b>.
                                    </Typography>
                                    <Typography variant="caption">
                                        Seu endereço fica na <b>{moradia.enderecoDto.logradouroNome},
                                            &nbsp;{moradia.enderecoDto.numero}, {moradia.enderecoDto.bairroNome}</b>, em
                                        &nbsp;{moradia.enderecoDto.cidadeNome}/{moradia.enderecoDto.ufSigla}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </React.Fragment>
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