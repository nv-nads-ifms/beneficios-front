import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTable from '../../components/CustomTable/CustomTable';
import PessoaService from '../../services/PessoaService';
import PessoaTableRow from './PessoaTableRow';
import DialogForms from '../../components/CustomForms/DialogForms';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, Divider, InputBase, makeStyles } from '@material-ui/core';
import { emptyData } from '../../api/utils/constants';

const columnsNames = [
    { id: 'id', label: 'Id.' },
    { id: 'nome', label: 'Nome' },
    { id: 'nascimento', label: 'Nascimento' },
    { id: 'documento', label: 'Documentos' },
    { id: 'contato', label: 'Contatos' },
    { id: 'escolaridade', label: 'Escolaridade' },
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

export default function PessoaListagemModal(props) {
    const { openModal, onClose, response } = props;
    const inputClasses = useStyles();

    const [nome, setNome] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [data, setData] = React.useState(emptyData);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(nome, page, rowsPerPage);
        PessoaService.getPessoas(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data);
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [nome, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleSelect = (data) => {
        PessoaService.getPessoaById(data.id)
            .then((r) => {
                response(r.data);
                onClose();
            });
    }

    return (
        <DialogForms
            title="Consulta de pessoas"
            open={openModal}
            maxWidth="md"
            onClose={onClose}
        >
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
                        <PessoaTableRow
                            key={"row-" + key}
                            row={row}
                            onSelectRow={handleSelect} />
                    );
                })}
            </CustomTable>

        </DialogForms>

    );
}