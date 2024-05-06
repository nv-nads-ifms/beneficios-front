import React from 'react';
import Grid from '@mui/material/Grid';

import { handleChangeInputComponent } from '../../api/utils/util';
import { getData, postData } from '../../api/api';
import { login, logout } from '../../api/services/auth';

import { showErrorMessages, swalWithBootstrapButtons } from '../../api/utils/modalMessages';

import DNALink from '../../components/DNALink';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoHeaderComponent from './LoginHeaderComponent';
import { Box, Button, TextField } from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import TextFieldPasswordComponent from '../../components/TextFieldPasswordComponent';

const emptyUsuario = {
    email: '',
    senha: '',
};

export default function SignIn() {
    const [usuario, setUsuario] = React.useState(emptyUsuario);
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e, newValue) => {
        handleChangeInputComponent(e, newValue, setUsuario, usuario);
    }

    const getLink = (url, label) => {
        return (
            <DNALink href={url}>
                {label}
            </DNALink>
        );
    }

    const handleLogout = React.useCallback(() => {
        getData('/auth/logout')
            .then((response) => {
                if (response.status === 200) {
                    logout();
                    navigate('/login');
                } else {
                    swalWithBootstrapButtons.fire(
                        'Ooops!',
                        "Não foi possível fazer o logout. Entre em contato com o administrador!",
                        'error'
                    );
                }
            });
    }, [navigate]);

    const handleLogin = (event) => {
        event.preventDefault();

        if (usuario.email === '') {
            swalWithBootstrapButtons.fire(
                'Ooops!',
                "Você deve informar um usuário",
                'warning'
            );
            return;
        }

        if (usuario.senha === '') {
            swalWithBootstrapButtons.fire(
                'Ooops!',
                "Você deve informar uma senha",
                'warning'
            );
            return;
        }

        postData("/auth", usuario)
            .then((resp) => {
                if (resp.hasOwnProperty('status') && resp.status === 403) {
                    swalWithBootstrapButtons.fire(
                        'Ooops!',
                        resp.data.message,
                        'warning'
                    );
                    handleLogout();
                }

                if (!showErrorMessages(resp)) {
                    login(resp.data.token);
                    if (location.state?.from) {
                        navigate(location.state.from.pathname);
                    } else {
                        navigate('/');
                    }
                }
            })
            .catch((error) => {
                swalWithBootstrapButtons.fire(
                    'Ooops!',
                    'O sistema está indisponível.',
                    'error'
                );
            });
    };

    return (
        <LogoHeaderComponent>
            <Box component="form" onSubmit={handleLogin} noValidate>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            id='email'
                            required
                            value={usuario.email}
                            fullWidth
                            label={"Endereço de Email"}
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldPasswordComponent
                            id='senha'
                            value={usuario.senha}
                            required
                            fullWidth
                            label={"Senha"}
                            type="password"
                            autoComplete="current-password"
                            onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2, p: 2 }}
                            startIcon={<LoginIcon />}
                        >
                            Entrar
                        </Button>
                    </Grid>
                    <Grid item spacing={2} container>
                        <Grid item xs={12} md={6} container justifyContent={'center'}>
                            {getLink("/pass-recover", "Esqueci minha senha!")}
                        </Grid>
                        <Grid item xs={12} md={6} container justifyContent={'center'}>
                            {getLink("/signup", "Cadastre-se Gratuitamente")}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LogoHeaderComponent>
    );
}