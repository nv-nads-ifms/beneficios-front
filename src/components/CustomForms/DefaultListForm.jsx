import React from 'react';
import { Grid, Paper } from "@material-ui/core";

import { useHistory } from 'react-router-dom';
import AutoLoadTable from '../../components/CustomTable/AutoLoadTable';
import { fichaStyles } from "../../components/UI/GlobalStyle";
import NewButton from "../../components/CustomButtons/NewButton";
import BaseForm from "./BaseForm";
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';

export default function DefaultListForm(props) {
    const { children, formTitle, addButtonLabel, onRowRemoveButton, retrieveDataFunction,
        columns, idColumnName, url, onAddHandler, messageAlert, remotePath } = props;

    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, remotePath);
    const classes = fichaStyles();
    let history = useHistory();

    const handleAction = (row, action) => {
        const idValue = row[idColumnName];
        history.push(`${url}/${idValue}/${action}`);
    }

    const handleClick = (event) => {
        history.push(`${url}/0/edit`);
    }

    return (
        <BaseForm title={formTitle}
            messageAlert={messageAlert}>
            {addButtonLabel != null && perfil.escrever && (
                <Grid container spacing={0} direction="column" alignItems="flex-end">
                    <Grid item xs>
                        <NewButton
                            label={addButtonLabel}
                            onClick={onAddHandler != null ? onAddHandler : handleClick}
                            className={classes.button} />
                    </Grid>
                </Grid>
            )}

            {children != null && (
                <Paper>{children}</Paper>
            )}
            {children == null && (
                <AutoLoadTable
                    retrieveDataFunction={retrieveDataFunction}
                    columns={columns}
                    idColumnName={idColumnName}
                    handleView={perfil.ler ? (row) => handleAction(row, 'view') : null}
                    handleEdit={perfil.escrever ? (row) => handleAction(row, 'edit') : null}
                    handleRemove={perfil.remover ? onRowRemoveButton : null}
                />
            )}
        </BaseForm>
    );
}