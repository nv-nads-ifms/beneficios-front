import React from "react";
import PropTypes from 'prop-types';
import {
    Backdrop,
    Box, Button, CircularProgress, Dialog, DialogActions,
    DialogContent, DialogTitle, Divider, Grid, Typography
} from "@mui/material";
import { saveModalMessage } from "../../api/utils/modalMessages";
import { postData } from "../../api/api";
import { useNavigate } from "react-router-dom";
import TextFieldPasswordComponent from "../../components/V1.0.0/TextFieldPasswordComponent";

function AlterarSenhaForm(params) {
    const { open, functionClose, url, code } = params;
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const [novaSenha, setNovaSenha] = React.useState('');
    const [confirmarSenha, setConfirmarSenha] = React.useState('');

    const handleButtonClick = () => {
        if (!loading) {
            setLoading(true);
        }

        saveModalMessage(
            () => postData(url, {
                token: code,
                password: novaSenha,
                passwordConfirm: confirmarSenha,
            }),
            () => {
                setLoading(false);
                setNovaSenha('');
                setConfirmarSenha('');
                functionClose();
                navigate('/login');
            }
        );
    };

    return (
        <Dialog
            open={open}
            onClose={functionClose}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle>Alteração de Senha</DialogTitle>
            <Divider variant="middle" />
            <DialogContent>
                <Box sx={{ p: 1, m: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextFieldPasswordComponent
                                id='novaSenha'
                                label={"Nova senha"}
                                variant='outlined'
                                fullWidth
                                required
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}>
                                <Typography style={{ fontWeight: 'bold' }}>
                                    Nível de segurança da senha:
                                </Typography>

                                <Typography>
                                    Use pelo menos 8 caracteres. Não use a senha de outro site ou
                                    algo muito óbvio, como o nome do seu animal de estimação.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldPasswordComponent
                                id='confirmarSenha'
                                label={"Confirmar nova senha"}
                                variant='outlined'
                                fullWidth
                                required
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleButtonClick}>
                    Alterar senha
                </Button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                    onClick={() => setLoading(false)}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </DialogActions>
        </Dialog>
    );
}

AlterarSenhaForm.propTypes = {
    open: PropTypes.bool.isRequired,
    functionClose: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    code: PropTypes.string,
}

export default AlterarSenhaForm;