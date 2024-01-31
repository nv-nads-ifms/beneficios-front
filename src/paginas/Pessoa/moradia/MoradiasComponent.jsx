import React from "react";
import Moment from "moment";
import MoradiaFormComponent from './MoradiaFormComponent';
import AddButton from "../../../components/CustomButtons/AddButton";
import { fichaStyles } from "../../../components/UI/GlobalStyle";
import { Avatar, Box, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Delete, Edit, House, LocationOn } from "@mui/icons-material";
import { ccyFormat } from "../../../api/format";
import ChipStatus from "../../../components/CustomButtons/ChipStatus";
import DNADataGrid from "../../../components/V1.0.0/DNADataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Status } from "../../../api/utils/constants";

const columns = [
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => {
            const { row } = params;
            const isOcupado = (row.dataSaida == null || row.dataSaida === '');
            let label;
            let status;
            if (isOcupado) {
                label = 'Ocupado';
                status = Status.ATIVO;
            } else {
                label = 'Desocupado';
                status = Status.INATIVO;
            }
            return (
                <ChipStatus label={label} status={status} />
            );
        }
    },
    {
        field: 'condicaoMoradia',
        headerName: 'Tipo de Moradia',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            const { row, value } = params;
            return (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <House />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={row.tipoMoradia.nome}
                        secondary={
                            <React.Fragment>
                                <Typography variant="body2">
                                    Ocupada em: {Moment(row.dataOcupacao).format('D/MM/Y')}
                                    {!(row.dataSaida == null || row.dataSaida === '') && (
                                        <Typography variant="body2" component="span">
                                            &nbsp;e desocupada em: {Moment(row.dataSaida).format('D/MM/Y')}
                                        </Typography>
                                    )}.
                                </Typography>
                                <Typography variant="body2">
                                    {value.nome} no valor de R$ {ccyFormat(row.valor)}.
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            );
        }
    },
    {
        field: 'endereco',
        headerName: 'Endereço',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            const { value } = params;
            return (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LocationOn />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="body2">
                                {value.logradouroNome}, {value.numero}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body2" color="textSecondary">
                                {value.bairroNome}, {value.cidadeNome} - {value.ufSigla}
                            </Typography>
                        }
                    />
                </ListItem>
            );
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
                    rowHeight={72}
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