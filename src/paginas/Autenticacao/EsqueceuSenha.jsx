import React from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';

import { CircularProgress, Container, Grid, Paper, Typography } from "@material-ui/core";
import AutenticacaoService from '../../services/AutenticacaoService';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import CustomAlert from '../../components/CustomAlert/CustomAlert';
import useErros from '../../hooks/useErros';
import { validarCampo } from '../../models/validaCampos';
import BackButton from '../../components/CustomButtons/BackButton';
import SendButton from '../../components/CustomButtons/SendButton';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    messages: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(15),
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(5),
    },
    button: {
        margin: theme.spacing(1),
    }
}));

export default function EsqueceuSenha() {
    let history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("warning");
    const [requestMessage, setRequestMessage] = useState("");
    const [erros, validarCampos] = useErros({
        email: validarCampo,
    });

    const [email, setEmail] = useState("");
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const handlePost = (event) => {
        event.preventDefault();
        if (!loading) {
            setLoading(true);
            setSuccess(false);
        }

        AutenticacaoService.forgotPassword(email)
            .then(r => r.json())
            .then(resp => {
                setLoading(false);
                if (resp.status !== undefined && resp.status === 400) {
                    setRequestMessage(resp.message);
                    setSeverity("warning");
                    setOpen(true);
                    return;
                }
                if (Array.isArray(resp)) {
                    validarCampos(resp);

                    setRequestMessage("O campo de E-mail não foi informado!");
                    setSeverity("warning");
                    setOpen(true);
                } else {
                    setSuccess(true);
                    history.push('/aviso-senha');
                }
            })
            .catch(error => {
                setRequestMessage("O sistema está indisponível no momento!");
                setSeverity("error");
                setOpen(true);
            });
    }

    return (
        <main className={classes.content}>
            <Container component="article" maxWidth="sm">
                <Paper className={classes.paper} elevation={3}>
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '10vh' }}>
                        <Grid item xs>
                            <Typography gutterBottom paragraph variant="h4" component="h3" align="center">
                                Recuperação de Senha
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                        <Grid item xs>
                            <Typography variant="body2" align="left" color="textPrimary">
                                Para redefinir sua senha, informe seu e-mail abaixo e clique em Enviar.
                            </Typography>
                        </Grid>
                    </Grid>

                    <form onSubmit={(event) => handlePost(event)}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <CustomTextField
                                    id="email"
                                    label="Endereço de E-mail"
                                    value={email}
                                    placeholder="Digite seu de E-mail"
                                    autoFocus={true}
                                    error={erros.email}
                                    onChangeHandler={(event) => setEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid container spacing={0} direction="column" alignItems="flex-end">
                                <Grid item xs={12}>
                                    <BackButton
                                        disabled={loading}
                                        className={classes.button} />
                                    <SendButton
                                        sx={buttonSx}
                                        disabled={loading}
                                        className={classes.button} />
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: green[500],
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            <CustomAlert open={open} setOpen={setOpen}
                requestMessage={requestMessage} messageType={severity} />
        </main>
    );
}