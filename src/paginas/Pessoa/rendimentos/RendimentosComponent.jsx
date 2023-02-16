import React from "react";
import {
    Paper
} from "@material-ui/core";
import RendimentoFormComponent from './RendimentoFormComponent';
import { Grid } from "@material-ui/core";
import SimpleTable from "../../../components/CustomTable/SimpleTable";
import AddButton from "../../../components/CustomButtons/AddButton";
import RendimentosTableRowComponent from "./RendimentosTableRowComponent";
import { fichaStyles } from "../../../components/UI/GlobalStyle";

const columns = [
    { id: 'status', label: 'Status' },
    { id: 'condicaoTrabalhoDto', label: 'Condição de trabalho' },
    { id: 'admissao', label: 'Data de admissão' },
    { id: 'demissao', label: 'Data de demissão' },
    { id: 'valor', label: 'Valor' }
];

export default function RendimentosComponent(props) {
    const { rendimentos, disabled, callback } = props;
    const classes = fichaStyles();
    const [open, setOpen] = React.useState(false);
    const [rendimento, setRendimento] = React.useState(null);

    const handleOpen = () => {
        setRendimento(null);
        setOpen(true);
    };

    const handleEdit = (event, value) => {
        setRendimento(value);
        setOpen(true);
    };

    const handleDelete = (value) => {
        const list = rendimentos.map(obj => {
            if (obj.sequencia === value.sequencia &&
                obj.condicaoTrabalhoDto.id === value.condicaoTrabalhoDto.id) {
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
        const index = rendimentos.findIndex(obj => (
            obj.sequencia === value.sequencia &&
            obj.condicaoTrabalhoDto.id === value.condicaoTrabalhoDto.id
        ));

        if (index !== -1) {
            rendimentos[index] = value;
        } else {
            rendimentos.push(value);
        }
        setRendimento(value);
        callback(rendimentos);
    }

    const isEmpty = () => {
        if (rendimentos.length === 0) {
            return true;
        }
        const count = rendimentos.map(obj => obj.deleted ? 1 : 0)
            .reduce((acc, cur) => acc + cur);

        return count === rendimentos.length;
    }

    return (
        <Paper>
            <Grid container spacing={0} direction="column" alignItems="flex-end">
                <Grid item xs>
                    <AddButton
                        disabled={disabled}
                        type="button"
                        className={classes.button}
                        onClick={handleOpen} />
                </Grid>
            </Grid>

            <SimpleTable
                emptyRows={isEmpty()}
                columns={columns}
            >
                {rendimentos.map((row, key) => (
                    !row.deleted && (
                        <RendimentosTableRowComponent
                            key={"row-" + key}
                            row={row}
                            onRemove={() => handleDelete(row)}
                            onEdit={(e) => handleEdit(e, row)} />
                    )))}
            </SimpleTable>

            <RendimentoFormComponent
                openModal={open}
                value={rendimento}
                callback={handleSave}
                onClose={handleClose} />
        </Paper>
    );
}