import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar, Button, Card, CardActions, List, ListItem,
    ListItemAvatar, ListItemText, Stack, Typography
} from '@mui/material';
import Countdown from 'react-countdown';

import { getToken, logout } from '../../api/services/auth';
import { firstName } from '../../api/utils/stringUtils';
import noImageAvailable from "../../img/noImageAvailable.png";
import jwt_decode from "jwt-decode";
import Moment, { utc } from 'moment';

import DataService from '../../api/services/DataServices';
import { swalWithBootstrapButtons } from '../../api/utils/modalMessages';
import { AccountBox, ExitToApp } from '@mui/icons-material';
import LinearProgressWithLabelComponent from '../../components/V1.0.0/LinearProgressWithLabelComponent';

const mensagemTempoExpiracao = () => {
    swalWithBootstrapButtons.fire('Ooops!', `Tempo de sessão expirado. Você foi desconectado do sistema!`, 'warning');
}

const dataService = new DataService('/usuarios');

export default function UserView(props) {
    const { usuario } = props;
    const navigate = useNavigate();

    const [funcionario, setFuncionario] = React.useState("");
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState("");
    const [imagePreview, setImagePreview] = React.useState(null);
    const sToken = getToken();
    const [token, setToken] = React.useState({});
    const [percentual, setPercentual] = React.useState(0);

    const tempoExpiracao = React.useMemo(() => {
        return (token.exp - token.iat) * 1000;
    }, [token]);

    const renderer = (props) => {
        const { total, formatted, completed } = props;
        setPercentual((tempoExpiracao - total) / tempoExpiracao * 100);

        if (completed) {
            mensagemTempoExpiracao();
            handleClick();
            return <span>You are good to go!</span>;
        } else {
            // Render a countdown
            return (
                <React.Fragment>
                    <Typography variant="caption" align='center'>
                        {formatted.hours}:{formatted.minutes}:{formatted.seconds}
                    </Typography>
                </React.Fragment>
            );
        }
    };
    console.log(percentual)
    React.useEffect(() => {
        if (sToken !== "") {
            setToken(jwt_decode(sToken));
        } else {
            setToken({});
        }
    }, [sToken]);

    React.useEffect(() => {
        setImagePreview(noImageAvailable);
        if (usuario.arquivo != null) {
            setImagePreview("data:" + usuario.arquivo.documentFormat + ";base64," + usuario.arquivo.file);
        }
    }, [usuario.arquivo]);

    React.useEffect(() => {
        if (usuario.funcionario) {
            const unidadeNome = usuario.funcionario.unidadeAtendimento.numeroDaUnidade +
                (usuario.funcionario.unidadeAtendimento.matriz === true ? "/Matriz" : "/Filial");
            setFuncionario(firstName(usuario.funcionario.nome));
            setUnidadeAtendimento(unidadeNome);
        } else {
            setFuncionario(firstName(""));
            setUnidadeAtendimento("");
        }
    }, [usuario.funcionario]);

    const handleClick = () => {
        dataService.getBy('auth/logout')
            .then(response => {
                logout();
                navigate('/login');
            })
            .catch(error => {
                mensagemTempoExpiracao();
                logout();
                navigate('/login');
            });
    }

    const accountHandlerClick = () => {
        navigate('/conta-usuario');
    }

    return (
        <React.Fragment>
            <List dense={true}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            aria-label="usuario"
                            src={imagePreview}
                            sx={{ width: 50, height: 50 }} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="h6">
                                {funcionario}
                            </Typography>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography variant="caption" color="textSecondary" component="p">
                                    {unidadeAtendimento}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <Stack spacing={1}>
                                <LinearProgressWithLabelComponent value={percentual} />
                                <Countdown
                                    date={utc(token.exp * 1000).toDate()}
                                    renderer={renderer} />
                            </Stack>
                        }
                        secondary={
                            <Typography variant="caption" color="textSecondary" component="p" align='center'>
                                Tempo de expiração da sessão
                            </Typography>
                        }
                    />
                    {/* <RestoreIconButton tooltip={"Clique aqui para renovar a sua sessão"} /> */}
                </ListItem>
            </List >

            <Card>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"

                        onClick={accountHandlerClick}
                        startIcon={<AccountBox />}
                    >
                        Conta
                    </Button>
                    <Button
                        size="small"
                        color="primary"

                        startIcon={<ExitToApp />}
                        onClick={handleClick}
                    >
                        Sair
                    </Button>

                </CardActions>
            </Card>
        </React.Fragment>
    );
}