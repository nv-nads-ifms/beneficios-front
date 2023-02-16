import React from "react";
import {
    Paper, Grid
} from "@material-ui/core";
import MoradiaFormComponent from './MoradiaFormComponent';
import AddButton from "../../../components/CustomButtons/AddButton";
import SimpleTable from "../../../components/CustomTable/SimpleTable";
import MoradiasTableRowComponent from "./MoradiasTableRowComponent";
import { fichaStyles } from "../../../components/UI/GlobalStyle";

const columns = [
    { id: 'status', label: 'Status' },
    { id: 'tipoMoradia', label: 'Tipo de Moradia' },
    { id: 'endereco', label: 'Endereço' },
];

export default function MoradiasComponent(props) {
    const { moradias, disabled, callback } = props;
    const classes = fichaStyles();
    const [open, setOpen] = React.useState(false);
    const [moradia, setMoradia] = React.useState(null);

    const handleOpen = () => {
        setMoradia(null);
        setOpen(true);
    };

    const handleEdit = (event, value) => {
        setMoradia(value);
        setOpen(true);
    };

    const handleDelete = (value) => {
        const list = moradias.map(obj => {
            if (obj.id === value.id &&
                obj.condicaoMoradiaDto.id === value.condicaoMoradiaDto.id &&
                obj.tipoMoradiaDto.id === value.tipoMoradiaDto.id) {
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
        const index = moradias.findIndex(obj => (
            obj.id === value.id &&
            obj.condicaoMoradiaDto.id === value.condicaoMoradiaDto.id &&
            obj.tipoMoradiaDto.id === value.tipoMoradiaDto.id
        ));

        if (index !== -1) {
            moradias[index] = value;
        } else {
            moradias.push(value);
        }
        setMoradia(value);
        callback(moradias);
    }

    const isEmpty = () => {
        if (moradias.length === 0) {
            return true;
        }
        const count = moradias.map(obj => obj.deleted ? 1 : 0)
            .reduce((acc, cur) => acc + cur);

        return count === moradias.length;
    }

    return (
        <Paper>
            {callback != null && (
                <Grid container spacing={0} direction="column" alignItems="flex-end">
                    <Grid item xs>
                        <AddButton
                            type="button"
                            disabled={disabled}
                            className={classes.button}
                            onClick={handleOpen} />
                    </Grid>
                </Grid>
            )}

            <SimpleTable
                emptyRows={isEmpty()}
                columns={columns}
                notShowActions={callback == null}
            >
                {moradias.map((row, key) =>
                (callback != null && !row.deleted && (
                    <MoradiasTableRowComponent
                        key={"row-" + key}
                        row={row}
                        onRemove={() => handleDelete(row)}
                        onEdit={(e) => handleEdit(e, row)} />
                )))}
            </SimpleTable>

            <MoradiaFormComponent
                openModal={open}
                value={moradia}
                callback={handleSave}
                onClose={handleClose} />
        </Paper>
    );
}