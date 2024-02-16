import React from "react";
import Moment from 'moment';
import AddButton from "../../../components/CustomButtons/AddButton";
import AuxilioFormComponent from "./AuxilioFormComponent";
import { fichaStyles } from "../../../components/UI/GlobalStyle";
import AuxilioStatusColumn from "./components/AuxilioStatusColumn";
import { Box, Grid, Typography } from "@mui/material";
import { ccyFormat } from "../../../api/format";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import DNADataGrid from "../../../components/V1.0.0/DNADataGrid";

const columns = [
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => {
            return <AuxilioStatusColumn row={params.row} />
        }
    },
    {
        field: 'programaGoverno',
        headerName: 'Benefício/Programa de Governo',
        minWidth: 100,
        flex: 1,
        valueGetter: (param) => (param.value.nome)
    },
    {
        field: 'inicio',
        headerName: 'Data de início',
        width: 120,
        renderCell: (params) => Moment(params.value).format('DD/MM/Y')
    },
    {
        field: 'fim',
        headerName: 'Encerrado em',
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

export default function AuxilioComponent(props) {
    const { auxilios, disabled, callback } = props;

    const classes = fichaStyles();
    const [open, setOpen] = React.useState(false);
    const [auxilio, setAuxilio] = React.useState(null);

    const handleOpen = () => {
        setAuxilio(null);
        setOpen(true);
    };

    const handleEdit = (value) => () => {
        setAuxilio(value);
        setOpen(true);
    };

    const handleDelete = (value) => () => {
        const list = auxilios.filter(obj => !(
            obj.id === value.id &&
            obj.programaGoverno.id === value.programaGoverno.id
        ));
        callback(list);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (value) => {
        let list = [];
        list = list.concat(auxilios);

        if (value.id === "") {
            list.push(value);
        } else {
            const index = list.findIndex(obj => (
                obj.id === value.id &&
                obj.programaGoverno.id === value.programaGoverno.id
            ));

            if (index !== -1) {
                list[index] = value;
            }
        }
        setAuxilio(value);
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
                    getRowId={(row) => row.id}
                    rows={auxilios}
                    rowCount={auxilios.length}

                    columns={[...columns, actionColumn]}
                />
            </Box>

            <AuxilioFormComponent
                openModal={open}
                value={auxilio}
                callback={handleSave}
                onClose={handleClose} />
        </React.Fragment>
    );
}