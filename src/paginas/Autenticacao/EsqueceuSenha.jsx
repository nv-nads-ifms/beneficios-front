import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Backdrop, Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { green } from '@material-ui/core/colors';
import { postData } from '../../api/api';
import { swalWithBootstrapButtons } from '../../api/utils/modalMessages';
import LogoHeaderComponent from './LoginHeaderComponent';
import DNALink from '../../components/V1.0.0/DNALink';

export default function EsqueceuSenha() {
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!loading) {
            setLoading(true);
            setSuccess(false);
        }

        postData('/auth/forgot-password', { email: email })
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    setSuccess(true);
                    navigate('/beneficios/aviso-senha');
                } else {
                    setLoading(false);
                    setSuccess(false);
                    swalWithBootstrapButtons.fire(
                        'Ooops!',
                        "Não foi possível solicitar o código de recuperação da senha!",
                        'error'
                    );
                }
            });
    }

    return (
        <LogoHeaderComponent>
            <Typography gutterBottom paragraph variant="h4" component="h3" align="center">
                Recuperação de Senha
            </Typography>
            <Typography variant="subtitle1">
                Se seu Email corresponder a um cadastro existente, nós enviaremos um Link de recuperação de senha para você.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={"Endereço de Email"}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} container direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                        <DNALink href={"/beneficios/login"}>
                            Retornar para o Login.
                        </DNALink>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                ...(success && {
                                    bgcolor: green[500],
                                    '&:hover': {
                                        bgcolor: green[700],
                                    },
                                })
                            }}
                        >
                            Solicitar alteração
                        </Button>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                            onClick={() => setLoading(false)}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Grid>
                </Grid>
            </Box>
        </LogoHeaderComponent>
    );
}