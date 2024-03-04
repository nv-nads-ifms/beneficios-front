import React, { useState } from 'react';

import { useParams } from 'react-router-dom'
import { objectContext } from '../../contexts/objectContext';
import { DNAStatus, emptyBaseObject, Status } from '../../api/utils/constants';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { FormControlLabel, Grid, ListItemText, Switch, TextField } from '@mui/material';
import DNAStatusComponent from '../../components/V1.0.0/DNAStatusComponent';
import { handleChangeInputComponent } from '../../api/utils/util';
import CheckboxPerfil from './CheckboxPerfil';
import DNAAutocomplete from '../../components/V1.0.0/DNAAutocomplete';

const emptyDoc = {
    ...emptyBaseObject,
    email: '',
    status: "ATIVO",
    enabled: true,
    funcionario: null,
    perfis: []
}

export default function UsuarioForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;
    const { status } = useParams();

    const [usuario, setUsuario] = useState(emptyDoc);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setUsuario, usuario);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    const onChange = (event, newValue) => {
        let t = event.target;
        let value = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];

        if (t.type === "checkbox") {
            value = t.checked;
        }

        if (t.name === 'status') {
            value = t.checked ? Status.ATIVO : Status.INATIVO;
        }

        setUsuario({
            ...usuario,
            [fieldname]: value
        });
    }

    const setPerfis = (value) => {
        setUsuario({
            ...usuario,
            perfis: value,
        })
    }

    const enabledFields = status != null && status === 'edit';

    return (
        <>
            <objectContext.Provider value={{
                object: usuario,
                setObject: setUsuario,
                emptyObject: emptyDoc
            }}>
                <DNAFormDialog
                    direction="column"
                    id_value={id_value}
                    texto_titulo_formulario={"Cadastro de Usuario"}
                    datacontrol={datacontrol}
                    open={open}
                    data_source_url={data_source_url}
                    on_edit_func={handleEdit}
                    on_close_func={on_close_func}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ListItemText primary={usuario.id} secondary="Código" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='nome'
                                value={usuario.nome}
                                label={"Nome do Usuario"}
                                variant='outlined'
                                fullWidth
                                disabled={datacontrol === DNAStatusComponent.VIEW}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id='email'
                                value={usuario.email}
                                label={"E-mal do Usuario"}
                                variant='outlined'
                                fullWidth
                                disabled={datacontrol === DNAStatusComponent.VIEW}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DNAAutocomplete
                                id="funcionario"
                                fullWidth
                                path={`funcionarios`}
                                input_label={'<< Selecione um Funcionário >>'}

                                value={usuario.funcionario}
                                onChange={handleChange}

                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                getOptionLabel={(option) => option.nome}
                            />
                        </Grid>

                        <Grid container spacing={0} direction="column" alignItems="flex-end">
                            <Grid item xs>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={usuario.status === Status.ATIVO}
                                            onChange={onChange}
                                            name="status"
                                            color="primary"
                                            size="medium"
                                        />
                                    }
                                    label="Ativo"
                                    disabled={!enabledFields}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={usuario.enabled}
                                            onChange={onChange}
                                            name="enabled"
                                            color="primary"
                                            size="medium"
                                        />
                                    }
                                    label={usuario.enabled ? "Autorizado" : "Bloqueado"}
                                    disabled={!enabledFields}
                                />
                            </Grid>
                        </Grid>

                        <CheckboxPerfil values={usuario.perfis} callback={setPerfis} read={!enabledFields} />

                    </Grid>
                </DNAFormDialog>

            </objectContext.Provider>
        </>
    )
}