import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, CardActions, List, ListItem, 
    ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { blue } from '@material-ui/core/colors';
import { getToken, logout } from '../../api/services/auth';
import { firstName } from '../../api/utils/stringUtils';
import noImageAvailable from "../../img/noImageAvailable.png";
import jwt_decode from "jwt-decode";
import Moment, { utc } from 'moment';

import DataService from '../../api/services/DataServices';
import { swalWithBootstrapButtons } from '../../api/utils/modalMessages';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    avatar: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    lista: {
        width: '100%',
        minWidth: '12ch',
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(1),
    },
    item: {
        marginRight: theme.spacing(2),
    }
}));

const dataService = new DataService('/usuarios');

export default function UserView(props) {
    const { usuario } = props;
    const classes = useStyles();
    const navigate = useNavigate();

    const [funcionario, setFuncionario] = React.useState("");
    const [unidadeAtendimento, setUnidadeAtendimento] = React.useState("");
    const [imagePreview, setImagePreview] = React.useState(null);
    const sToken = getToken();
    const [token, setToken] = React.useState({});

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
                swalWithBootstrapButtons.fire('Ooops!', `Tempo de sessão expirado. Você será desconectado do sistema!`, 'warning');
                logout();
                navigate('/login');
            });
    }

    const accountHandlerClick = () => {
        navigate('/conta-usuario');
    }

    return (
        <React.Fragment>
            <List className={classes.lista} dense={true}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar className={classes.item}>
                        <Avatar
                            aria-label="usuario"
                            className={classes.avatar}
                            src={imagePreview} />
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
                <ListItem onClick={handleClick}>
                    <ListItemText
                        primary={
                            <Typography variant="caption">
                                {Moment(utc(token.exp * 1000).toDate()).format('DD/MM/Y hh:mm:ss a')}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="caption" color="textSecondary" component="p">
                                Expiração da sessão
                            </Typography>
                        }
                    />
                    {/* <RestoreIconButton tooltip={"Clique aqui para renovar a sua sessão"} /> */}
                </ListItem>
            </List >

            <Card className={classes.root}>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        className={classes.button}
                        onClick={accountHandlerClick}
                        startIcon={<AccountBoxIcon />}
                    >
                        Conta
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        className={classes.button}
                        startIcon={<ExitToAppIcon />}
                        onClick={handleClick}
                    >
                        Sair
                    </Button>

                </CardActions>
            </Card>
        </React.Fragment>
    );
}