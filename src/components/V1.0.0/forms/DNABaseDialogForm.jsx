import React from "react";

import { Grid, ListItemText } from "@mui/material";
import { DNAStatus, emptyBaseObject } from "../../../api/utils/constants";
import { handleChangeInputComponent } from "../../../api/utils/util";
import DNAFormDialog from "../dialog/DNAFormDialog";
import DNATextfield from "../DNATextfield";
import { objectContext } from "../../../contexts/objectContext";

function DNABaseDialogForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func, text } = props;

    const [object, setObject] = React.useState(emptyBaseObject);

    const handleChange = (e, newValue) => {
        handleChangeInputComponent(e, newValue, setObject, object);
    }

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    return (
        <objectContext.Provider value={{
            object: object,
            setObject: setObject,
            emptyObject: emptyBaseObject
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={text}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}

                fullWidth={true}
                maxWidth={'sm'}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} container justifyContent="flex-start">
                        <ListItemText 
                            primary={object.id}
                            secondary="Código"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DNATextfield
                            id='nome'
                            value={object.nome}
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={handleChange} />
                    </Grid>
                </Grid>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default DNABaseDialogForm;