import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTable from '../../components/CustomTable/CustomTable';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, Divider, InputBase, makeStyles } from '@material-ui/core';
import DialogForms from '../../components/CustomForms/DialogForms';
import BairroTableRow from './BairroTableRow';
import BairroService from '../../services/BairroService';
import { emptyData } from '../../api/utils/constants';

const columnsNames = [
    { id: 'nome', label: 'Nome' },
];

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const getRequestParams = (nome, page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }
    if (pageSize) {
        params["size"] = pageSize;
    }
    if (nome) {
        params["nome"] = nome;
    }
    return params;
};

export default function BairroListagemModal(props) {
    const { openModal, onClose, response } = props;
    const inputClasses = useStyles();

    const [nome, setNome] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dataFetched, setDataFetched] = React.useState(false);

    const [data, setData] = React.useState(emptyData);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(nome, page, rowsPerPage);
        BairroService.getBairros(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [nome, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleSelect = (data) => {
        response(data);
        onClose();
    }

    return (
        <DialogForms
            title="Consulta de Bairros"
            open={openModal}
            maxWidth="md"
            onClose={onClose}>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <Paper elevation={3} component="form" className={inputClasses.root}>
                        <InputBase
                            className={inputClasses.input}
                            placeholder="Buscar por nome"
                            inputProps={{ 'aria-label': 'busca por nome' }}
                            onChange={(event) => setNome(event.target.value)}
                        />
                        <Divider className={inputClasses.divider} orientation="vertical" />
                        <SearchIcon />
                    </Paper>
                </Grid>
            </Grid>
            <CustomTable
                data={data}
                columns={columnsNames}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                dataFetched={dataFetched}
            >
                {data.content.map((row, key) => {
                    return (
                        <BairroTableRow
                            key={"row-" + key}
                            row={row}
                            onSelectRow={handleSelect} />
                    );
                })}
            </CustomTable>

        </DialogForms>

    );
}