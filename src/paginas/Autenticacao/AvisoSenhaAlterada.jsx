import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Container, Grid, Link, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(15),
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(5),
    },
    text: {
        margin: theme.spacing(1),
    }
}));

export default function AvisoSenhaAlterada() {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <Container component="article" maxWidth="sm">
                <Paper className={classes.paper} elevation={3}>
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '10vh' }}>
                        <Grid item xs>
                            <Typography gutterBottom paragraph variant="h4" component="h3" align="center">
                                Aviso!
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                        <Grid item xs>
                            <Typography className={classes.text} variant="subtitle1" align="left" color="textPrimary">
                                Sua senha foi alterada com sucesso!
                            </Typography>
                            <Typography className={classes.text} variant="body2" align="left" color="textPrimary">
                                <Link href={process.env.PUBLIC_URL + "/#/login"}>
                                    Clique aqui
                                </Link> para voltar a tela de autenticação.
                            </Typography>
                            
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </main>
    );
}