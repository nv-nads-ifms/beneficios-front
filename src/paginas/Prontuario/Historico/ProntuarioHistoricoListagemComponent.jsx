
import React from "react";
import Moment from 'moment';

import { objectContext } from "../../../contexts/objectContext";
import ChipStatus from "../../../components/CustomButtons/ChipStatus";
import { Box } from "@mui/material";
import DNADataGrid from "../../../components/V1.0.0/DNADataGrid";

const columns = [
    {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => (
            <ChipStatus status={params.value} />
        )
    },
    {
        field: 'funcionario',
        headerName: 'Funcionário',
        minWidth: 150,
        flex: 1,
        valueGetter: (params) => params.value.nome
    },
    {
        field: 'emissao',
        headerName: 'Emissão',
        width: 170,
        renderCell: (params) => {
            return (
                Moment(params.value).format('DD/MM/Y hh:mm:ss a')
            );
        }
    },
    {
        field: 'observacao',
        headerName: 'Observação',
        width: 250,
    },
];

export default function ProntuarioHistoricoListagemComponent() {
    const { object } = React.useContext(objectContext);

    const [historicos, setHistoricos] = React.useState([]);

    React.useEffect(() => {
        if (object != null) {
            setHistoricos(object.historicos);
        } else {
            setHistoricos([]);
        }
    }, [object]);

    return (
        <Box sx={{ height: 250 }}>
            <DNADataGrid
                rows={historicos}
                columns={columns}
            />
        </Box>
    );
}