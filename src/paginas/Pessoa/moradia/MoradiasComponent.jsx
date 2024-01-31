import React from "react";

import MoradiaFormComponent from './MoradiaFormComponent';
import AddButton from "../../../components/CustomButtons/AddButton";
import { fichaStyles } from "../../../components/UI/GlobalStyle";
import { Box, Grid } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import DNADataGrid from "../../../components/V1.0.0/DNADataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import MoradiaStatusColumn from "./components/MoradiaStatusColumn";
import MoradiaCondicaoColumn from "./components/MoradiaCondicaoColumn";
import MoradiaEnderecoColumn from "./components/MoradiaEnderecoColumn";

const columns = [
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => {
            return <MoradiaStatusColumn row={params.row} />
        }
    },
    {
        field: 'condicaoMoradia',
        headerName: 'Tipo de Moradia',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return (
                <MoradiaCondicaoColumn row={params.row} value={params.value} />
            );
        }
    },
    {
        field: 'endereco',
        headerName: 'Endereço',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return <MoradiaEnderecoColumn value={params.value} />
        }
    },
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

    const handleEdit = (value) => () => {
        setMoradia(value);
        setOpen(true);
    };

    const handleDelete = (value) => () => {
        const list = moradias.map(obj => {
            if (obj.id === value.id &&
                obj.condicaoMoradia.id === value.condicaoMoradia.id &&
                obj.tipoMoradia.id === value.tipoMoradia.id) {
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
        let list = [];
        list = list.concat(moradias);
        
        if (value.id === "") {
            list.push(value);
        } else {
            const index = list.findIndex(obj => (
                obj.id === value.id &&
                obj.condicaoMoradia.id === value.condicaoMoradia.id &&
                obj.tipoMoradia.id === value.tipoMoradia.id
            ));
            
            if (index !== -1) {
                list[index] = value;
            }
        }
        
        setMoradia(value);
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
                    rows={moradias}
                    rowCount={moradias.length}

                    columns={[...columns, actionColumn]}
                    rowHeight={87}
                />
            </Box>


            <MoradiaFormComponent
                openModal={open}
                value={moradia}
                callback={handleSave}
                onClose={handleClose} />
        </React.Fragment>
    );
}