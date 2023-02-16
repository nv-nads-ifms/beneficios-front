import React, { useContext } from 'react';
import { Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import CustomTextField from "../../components/CustomFields/CustomTextField";
import { validarCampo } from '../../models/validaCampos';
import useErros from '../../hooks/useErros';
import CustomAlert from '../../components/CustomAlert/CustomAlert';
import SendButton from '../../components/CustomButtons/SendButton';
import { userContext } from '../../hooks/userContext';
import UsuarioService from '../../services/UsuarioService';
import BackButton from '../../components/CustomButtons/BackButton';

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

export default function AlterarSenhaEsquecida() {
    const usuario = useContext(userContext);
    let history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("warning");
    const [requestMessage, setRequestMessage] = React.useState("");

    const [senhas, setSenhas] = React.useState({
        senha: '',
        confirmaSenha: '',
    });

    const [erros, validarCampos] = useErros({
        senha: validarCampo,
        confirmaSenha: validarCampo,
    });

    const onChange = (event) => {
        let t = event.target;
        let value = t.value;
        const fieldname = t.name;
        setSenhas({
            ...senhas,
            [fieldname]: value
        });
    }

    const handlePost = (event) => {
        event.preventDefault();

        UsuarioService.resetPassword(usuario.email, senhas)
            .then(r => r.json())
            .then(resp => {
                if (resp.status !== undefined && resp.status === 400) {
                    setRequestMessage(resp.message);
                    setSeverity("warning");
                    setOpen(true);
                    return;
                }
                if (Array.isArray(resp)) {
                    validarCampos(resp);

                    setRequestMessage(resp.message);
                    setSeverity("warning");
                    setOpen(true);
                } else {
                    history.push('/conta-usuario');
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
                                Alteração de Senha
                            </Typography>
                        </Grid>
                    </Grid>
                    <form onSubmit={(event) => handlePost(event)}>
                        <Grid container spacing={0}>
                            <Grid item xs>
                                <CustomTextField
                                    id="senha"
                                    label="Nova Senha"
                                    value={senhas.senha}
                                    error={erros.senha}
                                    type="password"
                                    onChangeHandler={onChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item xs>
                                <CustomTextField
                                    id="confirmaSenha"
                                    label="Confirmar Senha"
                                    value={senhas.confirmaSenha}
                                    error={erros.confirmaSenha}
                                    type="password"
                                    onChangeHandler={onChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid container spacing={0} direction="column" alignItems="flex-end">
                                <Grid item xs>
                                    <BackButton className={classes.button} />
                                    <SendButton className={classes.button} />
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