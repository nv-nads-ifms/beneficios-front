import React from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';

import { Button, Container, Grid, Link, Paper, Typography } from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import AutenticacaoService from '../../services/AutenticacaoService';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import CustomAlert from '../../components/CustomAlert/CustomAlert';
import useErros from '../../hooks/useErros';
import { validarCampo } from '../../models/validaCampos';
import { closeMessageAlert, emptyMessageAlert, sendMessageAlert } from '../../api/utils/customMessages';
import { Message } from '../../api/utils/constants';
import { login } from '../../api/services/auth';

const useStyles = makeStyles((theme) => ({
    messages: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    content: {
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(5),
    }
}));

export default function Autenticacao() {
    let history = useHistory();
    const classes = useStyles();
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);

    const [erros, validarCampos] = useErros({
        email: validarCampo,
        senha: validarCampo,
    });

    const [credentials, setCredentials] = useState({
        email: "",
        senha: "",
    });

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    const onChange = (event) => {
        let t = event.target;
        setCredentials({
            ...credentials,
            [t.name]: t.value
        });
    }

    const handlePost = async (event) => {
        event.preventDefault();

        AutenticacaoService.requestToken(credentials)
            .then(r => r.json())
            .then(resp => {
                if ('statusCode' in resp && resp.statusCode === 'UNAUTHORIZED') {
                    sendMessage(Message.WARNING, resp.message);
                    return;
                }
                if (resp.status !== undefined && resp.status === 404) {
                    sendMessage(Message.WARNING, resp.message);
                    return;
                } else if (resp.status !== undefined && resp.status === 400) {
                    sendMessage(Message.WARNING, "Usuário e senha informados estão incorretos!");
                    return;
                } else if (Array.isArray(resp)) {
                    validarCampos(resp);
                    sendMessage(Message.WARNING, "Falha na autenticação!");
                } else {
                    login(resp.token);
                    history.push('/home');
                }
            })
            .catch(error => {
                sendMessage(Message.ERROR, "O sistema está indisponível no momento!");
            });
    }

    return (
        <main className={classes.content}>
            <Container component="article" maxWidth="sm">
                <Paper className={classes.paper} elevation={3}>
                    <form onSubmit={(event) => handlePost(event)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{ minHeight: '15vh' }}>
                                <Typography gutterBottom paragraph variant="h4" align="center">
                                    Benefícios Eventuais
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h3" align="left" color="textSecondary">
                                    <LockIcon />
                                    Login
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                id="email"
                                label="Endereço de E-mail"
                                value={credentials.email}
                                placeholder="Digite seu de E-mail"
                                autoFocus={true}
                                error={erros.email}
                                onChangeHandler={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                id="senha"
                                label="Senha"
                                value={credentials.senha}
                                error={erros.senha}
                                type="password"
                                onChangeHandler={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Link
                                href={process.env.PUBLIC_URL + "/#/esqueceu-senha"}
                                variant="body2">
                                Esqueceu sua senha?
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="#">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    name="btAcessar"
                                    margin="normal"
                                    size="large"

                                    startIcon={<LockOpenIcon />}
                                >
                                    Entrar
                                </Button>
                            </Link>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            <CustomAlert
                open={messageAlert.open}
                setOpen={(value) => closeMessageAlert(setMessageAlert)}
                requestMessage={messageAlert.requestMessage}
                messageType={messageAlert.messageType} />
        </main>
    );
}