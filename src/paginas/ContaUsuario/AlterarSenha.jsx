import React, { useContext } from 'react';
import { Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import SendButton from '../../components/CustomButtons/SendButton';
import { userContext } from '../../hooks/userContext';
import BackButton from '../../components/CustomButtons/BackButton';
import { handleChangeInputComponent } from '../../api/utils/util';
import DataService from '../../api/services/DataServices';
import { saveModalMessageProps } from '../../api/utils/modalMessages';

const emptySenha = {
    password: '',
    passwordConfirm: '',
};

const dataService = new DataService('/usuarios');

export default function AlterarSenha() {
    const usuario = useContext(userContext);
    const navigate = useNavigate();

    const [senhas, setSenhas] = React.useState(emptySenha);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setSenhas, senhas);
    };

    const handlePost = (event) => {
        event.preventDefault();

        const props = {
            title: 'Confirma a alteração da senha?',
            confirmText: 'Alterar',
            denyText: 'Não alterar',
            successResponseText: 'As alterações foram salvas!',
            denyResponseText: 'As informações não foram salvas',
            errorResponseText: `Não foi possível fazer as alterações. Entre em contato com o administrador do sistema informando a seguinte mensagem: `,
        };
        saveModalMessageProps(
            props,
            () => dataService.save(['reset-password', usuario.email], senhas),
            () => navigate('/conta-usuario'));
    }

    return (
        <Container component="article" maxWidth="sm">
            <Paper elevation={0}>
                <Grid container spacing={1} direction="column" alignItems="center" justify="center" style={{ minHeight: '10vh' }}>
                    <Grid item xs={12}>
                        <Typography gutterBottom paragraph variant="h4" component="h3" align="center">
                            Alteração de Senha
                        </Typography>
                    </Grid>
                </Grid>
                <form onSubmit={(event) => handlePost(event)}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                label="Nova Senha"
                                value={senhas.password}
                                variant='outlined'
                                fullWidth
                                type="password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="passwordConfirm"
                                label="Confirmar Senha"
                                value={senhas.passwordConfirm}
                                variant='outlined'
                                fullWidth
                                type="password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} container direction="column" alignItems="flex-end">
                            <Stack spacing={1} direction={'row'}>
                                <BackButton />
                                <SendButton />
                            </Stack>
                        </Grid>
                    </Grid>

                </form>
            </Paper>
        </Container>
    );
}