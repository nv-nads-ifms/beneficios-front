import React from 'react'
import Moment from 'moment';
import ChipStatus from '../../../components/CustomButtons/ChipStatus';
import { Box } from '@mui/material';
import DNADataGrid from '../../../components/V1.0.0/DNADataGrid';

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
        headerName: 'Atendente',
        minWidth: 150,
        flex: 1,
        valueGetter: (params) => params.value.nome
    },
    {
        field: 'unidadeAtendimento',
        headerName: 'Unid. Atendimento',
        width: 150,
        valueGetter: ({row}) => {
            const und = row.funcionario.unidadeAtendimento;
            return `${und.id}/${und.numeroDaUnidade}`;
        }
    },
    {
        field: 'emissao',
        headerName: 'Emissão',
        width: 170,
        renderCell: (params) => {
            console.log(params)
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

export default function AnaliseHistoricoSolicitacoesView(props) {
    const { atendimento } = props;
    
    const [historicos, setHistoricos] = React.useState([]);

    React.useEffect(() => {
        if (atendimento != null) {
            setHistoricos(atendimento.historicos);
        } else {
            setHistoricos([]);
        }
    }, [atendimento]);

    return (
        <Box sx={{ height: 250 }}>
            <DNADataGrid
                rows={historicos}
                columns={columns}
            />
        </Box>
    );
}