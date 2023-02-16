import React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import { Container, Typography } from "@material-ui/core";
import { fichaStyles } from '../UI/GlobalStyle';
import SaveButton from "../CustomButtons/SaveButton";
import BackButton from "../CustomButtons/BackButton";
import CustomAlert from "../CustomAlert/CustomAlert";
import useErros from "../../hooks/useErros";

export default function DefaultFieldsForm(props) {
    const { title, retrieveData, responseRetrieveData, FieldsComponent,
        validacoes, saveFunction, saveParamsData, returnUrl, id } = props;
    let history = useHistory();
    const classes = fichaStyles();
    const [requestMessage, setRequestMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [erros, validarCampos] = useErros(validacoes);

    useEffect(() => {
        if (id > 0) {
            retrieveData(id)
                .then(r => r.json())
                .then(data => responseRetrieveData(data))
                .catch(() => {
                    history.push('/404');
                });
        }
    }, [id, history, responseRetrieveData, retrieveData]);

    const handlePost = (event) => {
        event.preventDefault();

        saveFunction(saveParamsData, id)
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    validarCampos(data);

                    setRequestMessage("Alguns campos não foram informados!");
                    setOpen(true);
                } else {
                    history.push(returnUrl);
                }
            });
    }

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container component="article" maxWidth="md">
                <Typography variant="h3" component="h1" align="center">{title}</Typography>
                <form onSubmit={(event) => handlePost(event)}>
                    <FieldsComponent erros={erros} />

                    <SaveButton type="submit" className={classes.button} />
                    <BackButton className={classes.button} />
                </form>
            </Container>
            <CustomAlert open={open} setOpen={setOpen}
                requestMessage={requestMessage} messageType="warning" />
        </main>
    );
}