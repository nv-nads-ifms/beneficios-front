import React from "react";

import { ccyFormat } from "../../../api/format";
import { createListaAuxilios, createListaRendimentos } from "../../../models/Prontuario";
import { objectContext } from "../../../contexts/objectContext";
import { Box, Grid, ListItemText, Stack, Typography } from "@mui/material";
import ChipStatus from "../../../components/CustomButtons/ChipStatus";
import DNADataGrid from "../../../components/V1.0.0/DNADataGrid";

const rendimentoCols = [
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        renderCell: (params) => {
            return (
                <ChipStatus status={params.value} />
            );
        }
    },
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
            <ListItemText
                primary={params.value}
                secondary={params.row.parentesco}
            />
        )
    },
    {
        field: 'condicaoTrabalho',
        headerName: 'Condição de Trabalho',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'valor',
        headerName: 'Valor',
        width: 130,
        renderCell: (params) => {
            return (
                ccyFormat(params.value)
            );
        }
    },
];

const auxilioCols = [
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        renderCell: (params) => {
            return (
                <ChipStatus status={params.value} />
            );
        }
    },
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
            <ListItemText
                primary={params.value}
                secondary={params.row.parentesco}
            />
        )
    },
    {
        field: 'programaGoverno',
        headerName: 'Benefício/Programa de Governo',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'valor',
        headerName: 'Valor',
        width: 130,
        renderCell: (params) => {
            return (
                ccyFormat(params.value)
            );
        }
    },
];

export function CustomFooterComponent(props) {
    const { label, valor } = props;
    return (
        <Stack direction="row" spacing={2} justifyContent={'flex-end'}>
            <Typography variant="h6">
                {label}
            </Typography>
            <Typography variant="h6">
                {ccyFormat(valor)}
            </Typography>
        </Stack>
    );
}

export default function ProntuarioRendimentoListagemComponent() {
    const { object } = React.useContext(objectContext);

    const [rendimentos, setRendimentos] = React.useState([]);
    const [auxilios, setAuxilios] = React.useState([]);

    React.useEffect(() => {
        if (object != null) {
            setRendimentos(createListaRendimentos(object));
            setAuxilios(createListaAuxilios(object));
        } else {
            setRendimentos([]);
            setAuxilios([]);
        }
    }, [object]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} lg={6}>
                <Box sx={{ height: 250 }}>
                    <DNADataGrid
                        rows={rendimentos}
                        columns={rendimentoCols}
                        slots={{
                            footer: CustomFooterComponent,
                        }}
                        slotProps={{
                            footer: {
                                label: 'Subtotal',
                                valor: object.valorTotalRendimentos
                            },
                        }}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Box sx={{ height: 250 }}>
                    <DNADataGrid
                        rows={auxilios}
                        columns={auxilioCols}
                        slots={{
                            footer: CustomFooterComponent,
                        }}
                        slotProps={{
                            footer: {
                                label: 'Subtotal',
                                valor: object.valorTotalAuxilios
                            },
                        }}
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <CustomFooterComponent
                    label={'Total'}
                    valor={object.valorTotalRendimentos + object.valorTotalAuxilios}
                />
            </Grid>
        </Grid>
    );
}