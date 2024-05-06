import React from 'react';

import { Link, Typography } from "@material-ui/core";
import LogoHeaderComponent from './LoginHeaderComponent';
import { Stack } from '@mui/material';

export default function AvisoSenha() {
    return (
        <LogoHeaderComponent>
            <Stack spacing={2}>
                <Typography gutterBottom paragraph variant="h4" component="h3" align="center">
                    Aviso de Recuperação de Senha
                </Typography>
                <Typography variant="subtitle1" align="left" color="textPrimary">
                    Um e-mail foi enviado para o endereço que você forneceu.
                </Typography>
                <Typography variant="body1" align="left" color="textPrimary">
                    Por favor, siga as instruções no e-mail para completar sua alteração de senha.
                </Typography>
                <Typography variant="body2" align="left" color="textPrimary">
                    <Link href={process.env.PUBLIC_URL + "/beneficios/login"}>
                        Clique aqui
                    </Link> para voltar a tela de autenticação.
                </Typography>
            </Stack>
        </LogoHeaderComponent>
    );
}