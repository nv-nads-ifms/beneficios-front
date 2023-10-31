import React from 'react';

import { objectContext } from '../../contexts/objectContext';
import { DNAStatus, emptyBaseObject } from '../../api/utils/constants';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { FormControlLabel, Grid, ListItemText, Switch, TextField } from '@mui/material';
import DNAStatusComponent from '../../components/V1.0.0/DNAStatusComponent';
import { handleChangeInputComponent } from '../../api/utils/util';
import PerfilMenuComponent from './PerfilMenuComponent';
import DataService from '../../api/services/DataServices';

const emptyPerfil = {
    ...emptyBaseObject,
    status: 'ATIVO',
    menus: [],
}

const menuDataService = new DataService("/menus");

function PerfilForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [perfil, setPerfil] = React.useState(emptyPerfil);
    const [menuItens, setMenuItens] = React.useState([]);

    React.useEffect(() => {
        menuDataService.getDataList()
            .then((r) => {
                setMenuItens(r.data);
            });
    }, [setMenuItens]);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setPerfil, perfil);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    const setData = (fieldname, value) => {
        setPerfil({
            ...perfil,
            [fieldname]: value,
        });
    }

    return (
        <objectContext.Provider value={{
            object: perfil,
            setObject: setPerfil,
            emptyObject: emptyPerfil
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Perfil"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}

                fullWidth={true}
                maxWidth={'lg'}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListItemText primary={perfil.id} secondary="Código" />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TextField
                            id='nome'
                            value={perfil.nome}
                            label={"Nome do Perfil"}
                            variant='outlined'
                            fullWidth
                            disabled={datacontrol === DNAStatusComponent.VIEW}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid xs={12} md={2} container direction={'row'} justifyContent={'center'}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={perfil.status === "ATIVO"}
                                    onChange={handleChange}
                                    name="status"
                                    color="primary"
                                    size="medium"
                                />
                            }
                            label="Ativo"
                            disabled={datacontrol === DNAStatusComponent.VIEW}
                        />
                    </Grid>
                </Grid>
                <PerfilMenuComponent
                    rows={perfil.menus}
                    menus={menuItens}
                    setRows={(data) => setData("menus", data)} />
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default PerfilForm;