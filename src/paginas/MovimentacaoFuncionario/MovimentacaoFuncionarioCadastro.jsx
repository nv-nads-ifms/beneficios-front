import React from 'react';
import { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';

import { Button, Container, Typography } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { fichaStyles } from '../../components/UI/GlobalStyle';

import FuncionarioService from "../../services/FuncionarioService";

import CustomTextField from "../../components/CustomFields/CustomTextField";

import { ValidacaoFuncionario } from "../../models/ValidacaoFuncionario";
import useErros from "../../hooks/useErros";
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function MovimentacaoFuncionarioCadastro() {
    let history = useHistory();
    const classes = fichaStyles();
    const { id } = useParams();
    const [requestMessage, setRequestMessage] = useState("");

    const [open, setOpen] = useState("");
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [funcao, setFuncao] = useState(null);
    const [usuario, setUsuario] = useState(null);

    const validacoes = ValidacaoFuncionario;
    const [erros, validarCampos] = useErros(validacoes);

    const updateFields = (data) => {
        setNome(data.nome);
        setNascimento(data.nascimento);
        setFuncao(data.funcao);
        setUsuario(data.email);
    }

    useEffect(() => {
        if (id > 0) {
            FuncionarioService.getFuncionarioById(id)
                .then(r => r.json())
                .then(data => updateFields(data))
                .catch(() => {
                    history.push('/404');
                });
        }
    }, [id, history]);

    const handleClick = (event) => {
        history.go(-1);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen("");
    };

    const handlePost = (event) => {
        event.preventDefault();

        FuncionarioService.saveFuncionario({
            nome: nome,
            nascimento: nascimento,
            funcao: funcao,
            email: usuario
        }, id)
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    validarCampos(data);

                    setRequestMessage("Alguns campos não foram informados!");
                    setOpen("warning");
                } else {
                    history.push('/funcionarios');
                }
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container component="article" maxWidth="sm">
                <Typography variant="h3" component="h1" align="center">Cadastro de Funcionário</Typography>
                <form onSubmit={(event) => handlePost(event)}>
                    <CustomTextField
                        id="nome"
                        label="Nome"
                        value={nome}
                        placeholder={"Digite o nome do funcionário"}
                        autoFocus={true}
                        error={erros.nome}
                        onChangeHandler={(event) => { setNome(event.target.value); }}
                    />

                    <CustomTextField
                        id="nascimento"
                        label="Data de Nascimento"
                        value={nascimento}
                        type="date"
                        error={erros.nascimento}
                        onChangeHandler={(event) => { setNascimento(event.target.value); }} />

                    <DNAAutocomplete
                        id="funcao"
                        fullWidth
                        path={`funcoes`}
                        input_label={'<< Selecione uma Função >>'}

                        value={funcao}
                        onChange={(event, value) => setFuncao(value)}

                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.ema}
                    />

                    <DNAAutocomplete
                        id="email"
                        fullWidth
                        path={`funcionarios`}
                        input_label={'Buscar por Nome de Funcionario'}

                        value={usuario}
                        onChange={(event, value) => setUsuario(value)}

                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.ema}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="default"
                        className={classes.button}
                        name="btSalvar"
                        startIcon={<SaveIcon />}
                    >
                        Salvar
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        name="btVoltar"
                        startIcon={<ArrowBackIcon />}
                        onClick={(event) => handleClick(event)}
                    >
                        Voltar
                    </Button>
                </form>
            </Container>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open !== ""}
                autoHideDuration={3000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={open}>
                    {requestMessage}
                </Alert>
            </Snackbar>
        </main>
    );
}

export default MovimentacaoFuncionarioCadastro;