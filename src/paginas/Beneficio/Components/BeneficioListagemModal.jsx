import React from 'react';
import { Grid, Box, TextField, InputAdornment } from '@mui/material';
import DialogForms from '../../../components/CustomForms/DialogForms';
import { emptyData } from '../../../api/utils/constants';
import DataService from '../../../api/services/DataServices';
import DNADataGrid from '../../../components/V1.0.0/DNADataGrid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Check } from '@mui/icons-material';
import { convertToParams } from '../../../api/utils/util';
import { Search } from '@material-ui/icons';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'nome',
        headerName: 'Benefício Eventual',
        minWidth: 200,
        flex: 1,
    },
    {
        field: 'tipoConcessao',
        headerName: 'Tipo de Concessão',
        width: 200,
        renderCell: ({ row }) => {
            return row.outraConcessao === true ? "Outra Concessão" : "Benefício Eventual";
        }
    },
    {
        field: 'disponivel',
        headerName: 'Qtde. Disponível',
        width: 100,
    }
];

/* Criação do serviço para recuperação de dados */
const dataService = new DataService('/beneficios-eventuais');

export default function BeneficioListagemModal(props) {
    const { openModal, onClose, response } = props;

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [nome, setNome] = React.useState('');

    /* Atributos de controle da tabela */
    const [isLoading, setIsLoading] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState(emptyData);

    const handleSelect = React.useCallback(
        (data) => {
            dataService.getById(data.id)
                .then((resp) => {
                    response(resp.data);
                    onClose();
                });
        }, [onClose, response]);

    const getColumnActions = (params) => {
        let columns = [];
        columns.push(
            <GridActionsCellItem
                icon={<Check />}
                label="Selecionar"
                onClick={() => handleSelect(params)}
            />);

        return columns;
    }

    const actionColumn = {
        field: "actions",
        headerName: "Ações",
        width: 140,
        pinnable: false,
        type: 'actions',
        getActions: getColumnActions
    };

    const getParams = React.useCallback(() => {
        return convertToParams({
            nome: nome,
            page: page,
            size: rowsPerPage,
        });
    }, [nome, page, rowsPerPage]);

    React.useEffect(() => {
        setIsLoading(true);

        const params = getParams();

        dataService.getDefaultData(params)
            .then(response => {
                setIsLoading(false);
                setRows(response.data);
                setPage(response.data.number);

                setRowsPerPage(response.data.pageable.pageSize);
                setCount(response.data.totalElements);
            });

    }, [getParams, count]);

    function handlePaginationModelChange(props) {
        setPage(isNaN(props.page) || props.page === undefined ? 0 : props.page);
        setRowsPerPage(props.pageSize);
    }

    return (
        <DialogForms
            title="Consulta de Benefícios Eventuais"
            open={openModal}
            maxWidth="md"
            onClose={onClose}
        >
            <Grid container spacing={1} sx={{mt: 1}}>
                <Grid item xs={12}>
                    <TextField
                        id="nome"
                        label="Nome do Benefício Eventual"
                        placeholder="Buscar pelo nome do benefício eventual"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        fullWidth
                        onChange={(event) => setNome(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{
                        height: 320,
                    }}>
                        <DNADataGrid
                            rows={rows.content}
                            rowCount={rows.totalElements}
                            loading={isLoading}

                            paginationModel={{ page: page, pageSize: rowsPerPage }}
                            onPaginationModelChange={handlePaginationModelChange}
                            paginationMode="server"

                            columns={[...columns, actionColumn]}
                            onRowClick={(params, event, details) => {
                                handleSelect(params);
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

        </DialogForms>

    );
}