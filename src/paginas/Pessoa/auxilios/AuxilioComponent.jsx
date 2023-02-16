import React from "react";
import {
    Paper, Grid
} from "@material-ui/core";
import AuxiliosTableRowComponent from "./AuxiliosTableRowComponent";
import SimpleTable from "../../../components/CustomTable/SimpleTable";
import AddButton from "../../../components/CustomButtons/AddButton";
import AuxilioFormComponent from "./AuxilioFormComponent";
import { fichaStyles } from "../../../components/UI/GlobalStyle";

const columns = [
    { id: 'status', label: 'Status' },
    { id: 'programa', label: 'Benefício/Programa de Governo' },
    { id: 'inicio', label: 'Data de início' },
    { id: 'fim', label: 'Data de encerramento' },
    { id: 'valor', label: 'Valor' }
];

export default function AuxilioComponent(props) {
    const { auxilios, disabled, callback } = props;

    const classes = fichaStyles();
    const [open, setOpen] = React.useState(false);
    const [auxilio, setAuxilio] = React.useState(null);

    const handleOpen = () => {
        setAuxilio(null);
        setOpen(true);
    };

    const handleEdit = (event, value) => {
        setAuxilio(value);
        setOpen(true);
    };

    const handleDelete = (value) => {
        const list = auxilios.map(obj => {
            if (obj.id === value.id &&
                obj.programaGoverno.id === value.programaGoverno.id) {
                obj.deleted = true;
            }
            return obj;
        });
        callback(list);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (value) => {
        const index = auxilios.findIndex(obj => (
            obj.id === value.id &&
            obj.programaGoverno.id === value.programaGoverno.id
        ));

        if (index !== -1) {
            auxilios[index] = value;
        } else {
            auxilios.push(value);
        }
        setAuxilio(value);
        callback(auxilios);
    }

    const isEmpty = () => {
        if (auxilios.length === 0) {
            return true;
        }
        const count = auxilios.map(obj => obj.deleted ? 1 : 0)
            .reduce((acc, cur) => acc + cur);

        return count === auxilios.length;
    }

    return (
        <Paper>
            <Grid container spacing={0} direction="column" alignItems="flex-end">
                <Grid item xs>
                    <AddButton
                        type="button"
                        disabled={disabled}
                        className={classes.button}
                        onClick={handleOpen} />
                </Grid>
            </Grid>

            <SimpleTable
                emptyRows={isEmpty()}
                columns={columns}
            >
                {auxilios.map((row, key) => (
                    !row.deleted && (
                        <AuxiliosTableRowComponent
                            key={"row-" + key}
                            row={row}
                            onRemove={() => handleDelete(row)}
                            onEdit={(e) => handleEdit(e, row)} />
                    )
                ))}
            </SimpleTable>

            <AuxilioFormComponent
                openModal={open}
                value={auxilio}
                callback={handleSave}
                onClose={handleClose} />
        </Paper>
    );
}