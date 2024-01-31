import React from "react";
import Moment from 'moment';
import RendimentoFormComponent from './RendimentoFormComponent';
import { Grid } from "@material-ui/core";
import AddButton from "../../../components/CustomButtons/AddButton";
import { fichaStyles } from "../../../components/UI/GlobalStyle";
import RendimentoStatusColumn from "./components/RendimentoStatusColumn";
import { ccyFormat } from "../../../api/format";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import DNADataGrid from "../../../components/V1.0.0/DNADataGrid";
import { Box, Typography } from "@mui/material";

const columns = [
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => {
            return <RendimentoStatusColumn row={params.row} />
        }
    },
    {
        field: 'condicaoTrabalho',
        headerName: 'Condição de trabalho',
        minWidth: 100,
        flex: 1,
        valueGetter: (param) => (param.value.nome)
    },
    {
        field: 'admissao',
        headerName: 'Admissão',
        width: 120,
        renderCell: (params) => Moment(params.value).format('DD/MM/Y')
    },
    {
        field: 'demissao',
        headerName: 'Demissão',
        width: 120,
        renderCell: (params) => {
            return (params.value == null || params.value === '') ? ' - ' : Moment(params.value).format('DD/MM/Y')
        }
    },
    {
        field: 'valor',
        headerName: 'Valor',
        width: 120,
        type: 'number',
        renderCell: (param) => (
            <Typography>
                {ccyFormat(param.row.valor)}
            </Typography>
        )
    },
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

    const handleEdit = (value) => () => {
        setRendimento(value);
        setOpen(true);
    };

    const handleDelete = (value) => () => {
        const list = rendimentos.filter(obj => !(
            obj.sequencia === value.sequencia &&
            obj.condicaoTrabalho.id === value.condicaoTrabalho.id
        ));
        callback(list);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (value) => {
        let list = [];
        list = list.concat(rendimentos);

        if (value.sequencia === "") {
            list.push(value);
        } else {
            const index = list.findIndex(obj => (
                obj.sequencia === value.sequencia &&
                obj.condicaoTrabalho.id === value.condicaoTrabalho.id
            ));

            if (index !== -1) {
                list[index] = value;
            }
        }
        setRendimento(value);
        callback(list);
    }

    const actionColumn = {
        field: "actions",
        headerName: "Ações",
        width: 140,
        pinnable: false,
        type: 'actions',
        getActions: (params) => {
            let columns = [
                <GridActionsCellItem
                    disabled={disabled}
                    icon={<Delete />}
                    label="Excluir"
                    onClick={handleDelete(params.row)}
                />,
                <GridActionsCellItem
                    disabled={disabled}
                    icon={<Edit />}
                    label="Alterar"
                    onClick={handleEdit(params.row)}
                />
            ];

            return columns;
        }
    };

    return (
        <React.Fragment>
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

            <Box sx={{
                height: 320,
                width: '100%',
                mt: 1
            }}>
                <DNADataGrid
                    getRowId={(row) => row.sequencia}
                    rows={rendimentos}
                    rowCount={rendimentos.length}

                    columns={[...columns, actionColumn]}
                />
            </Box>


            <RendimentoFormComponent
                openModal={open}
                value={rendimento}
                callback={handleSave}
                onClose={handleClose} />

        </React.Fragment>
    );
}