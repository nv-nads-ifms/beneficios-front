import React from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { DNAStatus, emptyBaseObject } from "../../api/utils/constants";
import { handleChangeInputComponent } from "../../api/utils/util";
import DNATextfield from "../DNATextfield";
import DNAFormPanel from "../panels/DNAFormPanel";

export default function DNAForm(props) {
    const { text, path } = props;
    const { status } = useParams();

    const [object, setObject] = React.useState(emptyBaseObject);
    const [dataControl, setDataControl] = React.useState(status);
    
    React.useEffect(() => {
        setDataControl(status === DNAStatus.VIEW);
    }, [status]);

    const handleChange = (e, newValue) => {
        handleChangeInputComponent(e, newValue, setObject, object);
    }

    const handleEdit = () => {
        setDataControl(DNAStatus.EDIT);
    }

    return (
        <DNAFormPanel
            text={text}
            path={path}
            status={dataControl}
            object={object}
            setobject={setObject}
            emptyobject={emptyBaseObject}
            edit_func={handleEdit}
        >
            <Grid container spacing={2} justifyContent="flex-end">
                <Grid
                    item
                    xs={12}
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <DNATextfield
                        id='id'
                        label="Número de Identificação"
                        disabled={true}
                        value={object.id}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DNATextfield
                        id='nome'
                        value={object.nome}
                        fullWidth
                        label="Nome"
                        edit={dataControl === DNAStatus.VIEW ? "edit" : null}
                        disabled={dataControl === DNAStatus.VIEW}
                        onChange={handleChange} />
                </Grid>
            </Grid>
        </DNAFormPanel>
    );
}