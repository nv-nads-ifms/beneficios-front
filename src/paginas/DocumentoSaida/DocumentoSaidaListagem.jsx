import React from 'react';
import { Card, CardContent, CardHeader, Collapse, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { emptyData, Status } from '../../api/utils/constants';
import CustomTable from '../../components/CustomTable/CustomTable';
import DocumentoSaidaService from '../../services/DocumentoSaidaService';
import DocumentoSaidaTableRow from './DocumentoSaidaTableRow';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIconButton from '../../components/CustomIconButtons/ExpandMoreIconButton';
import NewButton from '../../components/CustomButtons/NewButton';
import BaseForm from '../../components/CustomForms/BaseForm';
import DocumentoSaidaContagem from './DocumentoSaidaContagem';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { deleteModalMessage } from '../../api/utils/modalMessages';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const columnsNames = [
    { id: 'status', label: 'Status' },
    { id: 'unidadeAtendimento', label: 'Unidade de Atendimento' },
    { id: 'observacao', label: 'Observação' },
];

const getRequestParams = (st, page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }

    if (pageSize) {
        params["size"] = pageSize;
    }

    if (st) {
        params["status"] = st;
    }

    return params;
};

export default function DocumentoSaidaListagem() {
    let history = useHistory();
    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/documento-saida');

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [status, setStatus] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tamanho, setTamanho] = React.useState(0);
    const [data, setData] = React.useState(emptyData);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(status, page, rowsPerPage);
        DocumentoSaidaService.getDocumentoSaida(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [status, tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleAction = (id, action) => {
        history.push(`/documento-saida-ficha/${id}/${action}`);
    }

    const atualizaLista = () => {
        setTamanho(tamanho + 1);
    }

    const handleDelete = (row) => {
        const value = row.descricao;

        deleteModalMessage(
            value,
            () => DocumentoSaidaService.deleteDocumentoSaida(row.id),
            () => atualizaLista()
        );
    }

    return (
        <BaseForm title="Listagem de Documentos de Saida">
            <DocumentoSaidaContagem rowCount={tamanho} />
            <Card>
                <CardHeader
                    title="Filtro de pesquisa"
                    avatar={
                        <SearchIcon />
                    }
                    action={
                        <React.Fragment>
                            <ExpandMoreIconButton
                                tooltip="Clique aqui para expandir ou retrair a visualização dos filtros"
                                expanded={expanded}
                                callback={setExpanded}
                            />
                            {perfil.escrever && (
                                <NewButton
                                    label="Cadastrar Documento de Saída"
                                    onClick={() => handleAction(0, 'edit')} />
                            )}
                        </React.Fragment>

                    }
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="label-status">Status</InputLabel>
                                    <Select
                                        value={status}
                                        fullWidth
                                        labelId="label-status"
                                        id="status"
                                        onChange={(e) => setStatus(e.target.value)}
                                        label="Status"
                                    >
                                        <MenuItem value="">
                                            <em>Nenhum</em>
                                        </MenuItem>
                                        <MenuItem value={Status.PENDENTE}>Pendente</MenuItem>
                                        <MenuItem value={Status.FINALIZADO}>Finalizado</MenuItem>
                                        <MenuItem value={Status.PARCIAL}>Parcial</MenuItem>
                                        <MenuItem value={Status.CANCELADO}>Cancelado</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
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
                        <DocumentoSaidaTableRow
                            key={"row-" + key}
                            row={row}
                            onView={perfil.ler ? (row) => handleAction(row.id, 'view') : null}
                            onEdit={perfil.escrever ? (row) => handleAction(row.id, 'edit') : null}
                            onRemove={perfil.remover ? handleDelete : null} />
                    );
                })}
            </CustomTable>
        </BaseForm>
    );
}