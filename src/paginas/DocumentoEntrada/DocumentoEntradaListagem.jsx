import React from 'react';
import { Card, CardContent, CardHeader, Collapse, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { emptyData } from '../../api/utils/constants';
import CustomTable from '../../components/CustomTable/CustomTable';
import DocumentoEntradaService from '../../services/DocumentoEntradaService';
import DocumentoEntradaTableRow from './DocumentoEntradaTableRow';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIconButton from '../../components/CustomIconButtons/ExpandMoreIconButton';
import NewButton from '../../components/CustomButtons/NewButton';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import BaseForm from '../../components/CustomForms/BaseForm';
import { emptyDocumentoEntrada } from '../../models/DocumentoEntrada';
import CustomAutoComplete from '../../components/CustomFields/CustomAutoComplete';
import FornecedorService from '../../services/FornecedorService';
import DocumentoEntradaContagem from './DocumentoEntradaContagem';
import { userContext } from '../../hooks/userContext';
import { deleteModalMessage } from '../../api/utils/modalMessages';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';

const columnsNames = [
    { id: 'status', label: 'Status' },
    { id: 'unidadeAtendimento', label: 'Unidade de Atendimento' },
    { id: 'documento', label: 'Documento' },
    { id: 'fornecedor', label: 'Fornecedor' },
];

const getRequestParams = (documento, page, pageSize) => {
    let params = {};
    if (page) {
        params["page"] = page;
    }
    if (pageSize) {
        params["size"] = pageSize;
    }

    Object.entries(documento).forEach(([key, value]) => {
        if (value !== '') {
            params[key] = value;
        }
    })

    return params;
};

export default function DocumentoEntradaListagem() {
    let history = useHistory();
    const usuario = React.useContext(userContext);
    const perfil = getMenuPerfilByUrl(usuario.perfis, '/documento-entrada');

    const [expanded, setExpanded] = React.useState(false);

    const [documentoEntrada, setDocumentoEntrada] = React.useState(emptyDocumentoEntrada);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tamanho, setTamanho] = React.useState(0);
    const [data, setData] = React.useState(emptyData);
    const [dataFetched, setDataFetched] = React.useState(false);

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(documentoEntrada, page, rowsPerPage);
        DocumentoEntradaService.getDocumentoEntrada(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            });
    }, [documentoEntrada, tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const handleAction = (id, action) => {
        history.push(`/documento-entrada-ficha/${id}/${action}`);
    }

    const atualizaLista = () => {
        setTamanho(tamanho + 1);
    }

    const handleDelete = (row) => {
        const value = row.descricao;

        deleteModalMessage(
            value,
            () => DocumentoEntradaService.deleteDocumentoEntrada(row.id),
            () => atualizaLista()
        );
    }

    const onChange = (event) => {
        let t = event.target;
        let value = t.value;
        const fieldname = t.id.split('-')[0];

        setDocumentoEntrada({
            ...documentoEntrada,
            [fieldname]: value
        });
    }

    const onChangeComplet = (event, newValue) => {
        setDocumentoEntrada({
            ...documentoEntrada,
            fornecedorId: newValue != null ? newValue.id : ''
        });
    }

    return (
        <BaseForm title="Listagem de Documentos de Entrada">
            <DocumentoEntradaContagem rowCount={tamanho} />
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
                                    label="Cadastrar Documento de Entrada"
                                    onClick={() => handleAction(0, 'edit')} />
                            )}
                        </React.Fragment>

                    }
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item lg={2} md={4} sm={6} xs={12}>
                                <CustomTextField
                                    id="processo"
                                    label="Nº do Processo"
                                    onChangeHandler={onChange} />
                            </Grid>
                            <Grid item lg={2} md={4} sm={6} xs={12}>
                                <CustomTextField
                                    id="ata"
                                    label="Nº da Ata"
                                    onChangeHandler={onChange} />
                            </Grid>
                            <Grid item lg={2} md={4} sm={6} xs={12}>
                                <CustomTextField
                                    id="pregao"
                                    label="Nº do Pregão"
                                    onChangeHandler={onChange} />
                            </Grid>
                            <Grid item lg={2} md={4} sm={6} xs={12}>
                                <CustomTextField
                                    id="empenhoContabil"
                                    label="Nº do Empenho Contábil"
                                    onChangeHandler={onChange} />
                            </Grid>
                            <Grid item lg={2} md={4} sm={6} xs={12}>
                                <CustomTextField
                                    id="contrato"
                                    label="Nº do Contrato"
                                    onChangeHandler={onChange} />
                            </Grid>
                            <Grid item lg={2} md={4} sm={6} xs={12}>
                                <CustomTextField
                                    id="numeroNotaFiscal"
                                    label="Nº da Nota Fiscal"
                                    onChangeHandler={onChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomAutoComplete
                                    id="fornecedor"
                                    retrieveDataFunction={FornecedorService.getListaFornecedores}
                                    label="Fornecedor"
                                    placeholder="<< Selecione um Fornecedor >>"
                                    onChangeHandler={(event, newValue) => onChangeComplet(event, newValue)}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.nome}
                                />
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
                        <DocumentoEntradaTableRow
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