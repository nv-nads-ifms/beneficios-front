import React from 'react';

import { objectContext } from '../../contexts/objectContext';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { DNAStatus, MenuTipo } from '../../api/utils/constants';
import { handleChangeInputComponent } from '../../api/utils/util';
import { Grid, TextField, Typography } from '@mui/material';

const emptyMenuSistema = {
    id: '',
    nome: '',
    disponivel: false,
    remotePath: '',
    tipo: MenuTipo.ATENDIMENTO,
}

function MenuSistemaForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [menuSistema, setMenuSistema] = React.useState(emptyMenuSistema);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setMenuSistema, menuSistema);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    return (
        <objectContext.Provider value={{
            object: menuSistema,
            setObject: setMenuSistema,
            emptyObject: emptyMenuSistema
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Prontuário"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
                fullWidth
                maxWidth={"lg"}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="subtitle1" color="textPrimary" align="center">
                                Menu ID {menuSistema.id}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="nome"
                            label="Nome do menu"
                            value={menuSistema.nome}
                            variant="outlined"
                            placeholder={"Digite o nome do menu"}
                            disabled={datacontrol === DNAStatus.VIEW}
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="remotePath"
                            label="URL de acesso"
                            value={menuSistema.remotePath}
                            variant="outlined"
                            placeholder={"Digite a URL de acesso ao menu"}
                            disabled={datacontrol === DNAStatus.VIEW}
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="remotePath"
                            label="URL de acesso"
                            value={menuSistema.remotePath}
                            variant="outlined"
                            placeholder={"Digite a URL de acesso ao menu"}
                            disabled={datacontrol === DNAStatus.VIEW}
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default MenuSistemaForm;