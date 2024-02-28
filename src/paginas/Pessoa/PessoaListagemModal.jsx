import React from 'react';
import { Grid } from '@material-ui/core';
import DialogForms from '../../components/CustomForms/DialogForms';
import { emptyData } from '../../api/utils/constants';
import { Box, InputAdornment, TextField } from '@mui/material';
import { Check, Search } from '@mui/icons-material';
import DNADataGrid from '../../components/V1.0.0/DNADataGrid';
import DataService from '../../api/services/DataServices';
import { convertToParams } from '../../api/utils/util';
import PessoaNomeColumn from './components/PessoaNomeColumn';
import PessoaDocumentosColumn from './components/PessoaDocumentosColumn';
import PessoaContatosColumn from './components/PessoaContatosColumn';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { GridActionsCellItem } from '@mui/x-data-grid';

const columns = [
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 250,
        flex: 1,
        renderCell: (params) => {
            return (
                <PessoaNomeColumn row={params.row} value={params.value} />
            );
        }
    },
    {
        field: 'documentos',
        headerName: 'Documentos',
        width: 150,
        renderCell: (params) => {
            return (
                <PessoaDocumentosColumn row={params.row} />
            );
        }
    },
    {
        field: 'contatos',
        headerName: 'Contatos',
        width: 200,
        renderCell: (params) => {
            return (
                <PessoaContatosColumn row={params.row} />
            );
        }
    },
    {
        field: 'escolaridade',
        headerName: 'Escolaridade',
        width: 200,
        valueGetter: (params) => params.value.nome
    }
];

/* Criação do serviço para recuperação de dados */
const datasourceUrl = 'pessoas';
const dataService = new DataService(`/${datasourceUrl}`);

export default function PessoaListagemModal(props) {
    const { openModal, onClose, response } = props;

    /* Controle de perfil de acesso */
    const usuario = React.useContext(userContext);
    const perfil = React.useMemo(() => {
        if (usuario != null && usuario.hasOwnProperty('perfis'))
            return getMenuPerfilByUrl(usuario.perfis, `/${datasourceUrl}`);
        return [];
    }, [usuario]);

    /* Atributos de controle da tabela */
    const [nome, setNome] = React.useState('');
    const [documento, setDocumento] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState(emptyData);


    const handleSelect = React.useCallback(
        (row) => {
            dataService.getById(row.id)
                .then((r) => {
                    response(r.data);
                    onClose();
                });
        }, [response, onClose]);

    const getColumnActions = (params) => {
        let columns = [];
        if (perfil.ler) {
            columns.push(
                <GridActionsCellItem
                    icon={<Check />}
                    label="Selecionar pessoa"
                    onClick={() => handleSelect(params)}
                />);
        }

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
            documento: documento,
            page: page,
            size: rowsPerPage,
        });
    }, [nome, documento, page, rowsPerPage]);

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
            title="Consulta de pessoas"
            open={openModal}
            maxWidth="lg"
            onClose={onClose}
        >
            <Box sx={{ mt: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={7}>
                        <TextField
                            id="nome"
                            label="Nome da pessoa"
                            placeholder="Buscar pelo nome da pessoa"
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
                    <Grid item xs={12} md={5}>
                        <TextField 
                            id="documento"
                            label="Número do documento da pessoa"
                            placeholder="Buscar pelo número do documento da pessoa"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            fullWidth
                            onChange={(event) => setDocumento(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{
                            height: 350,
                            width: '100%',
                            mt: 1
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
            </Box>

        </DialogForms>

    );
}