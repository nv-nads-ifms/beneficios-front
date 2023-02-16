import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTable from '../../components/CustomTable/CustomTable';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, Divider, InputBase, makeStyles } from '@material-ui/core';
import CidadeService from '../../services/CidadeService';
import CidadeTableRow from './CidadeTableRow';
import DialogForms from '../../components/CustomForms/DialogForms';
import { emptyData } from '../../api/utils/constants';

const columnsNames = [
    { id: 'nome', label: 'Nome' },
    { id: 'uf', label: 'U.F.' },
    { id: 'pais', label: 'País' },
];

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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

export default function CidadeListagemModal(props) {
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
        CidadeService.getCidades(params)
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
            title="Consulta de Cidades"
            open={openModal}
            maxWidth="md"
            onClose={onClose}
        >
            <Grid container spacing={1} direction="column">
                <Grid item>
                    <Paper elevation={1} square={true} variant="outlined" component="form" className={inputClasses.root}>
                        <InputBase
                            fullWidth
                            className={inputClasses.input}
                            placeholder="Digite para buscar por nome da cidade"
                            inputProps={{ 'aria-label': 'busca por nome' }}
                            onChange={(event) => setNome(event.target.value)}
                        />
                        <Divider className={inputClasses.divider} orientation="vertical" />
                        <SearchIcon />
                    </Paper>
                </Grid>
                <Grid item>
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
                                <CidadeTableRow
                                    key={"row-" + key}
                                    row={row}
                                    onSelectRow={handleSelect} />
                            );
                        })}
                    </CustomTable>
                </Grid>
            </Grid>
        </DialogForms>

    );
}