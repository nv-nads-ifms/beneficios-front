import React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import { Grid } from "@material-ui/core";
import CustomTextField from "../../components/CustomFields/CustomTextField";
import BaseForm from "./BaseForm";
import { saveModalMessage } from '../../api/utils/modalMessages';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';

export default function DefaultForm(props) {
    const { title, retrieveData, fieldname, label, placeholder,
        saveFunction, returnUrl, id, read } = props;
    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnUrl);
    let history = useHistory();

    const [value, setValue] = useState("");

    useEffect(() => {
        if (id > 0) {
            retrieveData(id)
                .then(response => setValue(response.data[fieldname]))
                .catch(() => {
                    history.push('/404');
                });
        }
    }, [id, history, fieldname, retrieveData]);

    const handlePost = (event) => {
        saveModalMessage(
            () => saveFunction(id, value),
            () => history.push(returnUrl)
        );
    }

    return (
        <BaseForm
            title={title}
            backButton
            onSave={perfil.escrever && !read ? handlePost : null}>
            <Grid container spacing={1}>
                <Grid item xs>
                    <CustomTextField
                        id={fieldname}
                        label={label}
                        value={value}
                        placeholder={placeholder}
                        autoFocus={true}
                        disabled={read}
                        onChangeHandler={(event) => setValue(event.target.value)}
                    />
                </Grid>
            </Grid>
        </BaseForm>
    );
}