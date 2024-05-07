import * as React from 'react';
import { Backdrop, Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';

import LogoHeaderComponent from './LoginHeaderComponent';
import { getData } from '../../api/api';
import { swalWithBootstrapButtons } from '../../api/utils/modalMessages';
import { green } from '@mui/material/colors';
import AlterarSenhaForm from './AlterarSenhaForm';

export default function VerificaPass() {
    const [code, setCode] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleChange = (e) => {
        setCode(e.target.value);
    }

    const handleButtonClick = (event) => {
        event.preventDefault();

        if (!loading) {
            setLoading(true);
            setSuccess(false);
        }

        getData(`/code/verification/${code}`)
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    setSuccess(true);
                    setOpen(true);
                } else {
                    setLoading(false);
                    setSuccess(false);
                    
                    setOpen(false);
                    swalWithBootstrapButtons.fire(
                        'Ooops!',
                        "Código Inválido!",
                        'error'
                    );
                }
            })
    };

    return (
        <LogoHeaderComponent>
            <Box component="form" onSubmit={handleButtonClick} noValidate sx={{ mt: 1, mb: 3, ml: 2, mr: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h6" sx={{mb: 5}}>
                            Mandamos um Código de Verificação para o seu Email.<br />
                            Por favor digite o código e confirme.
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="codigo"
                            label="Código"
                            fullWidth
                            value={code}
                            onChange={handleChange}
                            autoFocus

                        />
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
                            Enviar Código
                        </Button>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                            onClick={() => setLoading(false)}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Grid>
                    {/* <Grid item xs={12}>
                    <DNALink
                        component="button"
                        onClick={resend}
                        fontSize={12}
                        textAlign={'right'} >
                        Não Recebi o Código!!!.
                    </DNALink>
                </Grid> */}
                </Grid>
            </Box>
            <AlterarSenhaForm
                open={open}
                functionClose={() => setOpen(false)}
                url="/auth/reset-password"
                code={code}
            />
        </LogoHeaderComponent>
    );
}