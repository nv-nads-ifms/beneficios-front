import React from 'react';
import {
    Card, CardContent, CardHeader,
    Grid, Collapse
} from '@material-ui/core';
import { emptyData, Message } from '../../api/utils/constants';
import { emptyMessageAlert, sendMessageAlert } from '../../api/utils/customMessages';
import BaseForm from '../../components/CustomForms/BaseForm';
import { emptyDocumentoSaida } from '../../models/DocumentoSaida';
import DocumentoSaidaService from '../../services/DocumentoSaidaService';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIconButton from '../../components/CustomIconButtons/ExpandMoreIconButton';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import CustomAutoComplete from '../../components/CustomFields/CustomAutoComplete';
import FornecedorService from '../../services/FornecedorService';
import CustomTable from '../../components/CustomTable/CustomTable';
import DocumentoSaidaConferenciaTableRow from './DocumentoSaidaConferenciaTableRow';
import DocumentoSaidaConferenciaForm from './DocumentoSaidaConferenciaForm';

const columnsNames = [
    { id: 'status', label: 'Status' },
    { id: 'origem', label: 'Origem' },
    { id: 'destino', label: 'Destino' },
    { id: 'numero', label: 'Item' },
    { id: 'beneficio', label: 'Beneficio Eventual' },
    { id: 'quantidade', label: 'Qtd. Solicitada' },
    { id: 'conferido', label: 'Qtd. Conferida' },
];

const emptyItem = { documentoSaidaId: '', itemNumero: '' };

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

export default function DocumentoSaidaConferencia() {
    const [expanded, setExpanded] = React.useState(false);
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);
    const [documentoSaida, setDocumentoSaida] = React.useState(emptyDocumentoSaida);
    const [item, setItem] = React.useState(emptyItem);
    const [openModal, setOpenModal] = React.useState(false);
    const [enabled, setEnabled] = React.useState(true);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tamanho, setTamanho] = React.useState(0);
    const [data, setData] = React.useState(emptyData);
    const [dataFetched, setDataFetched] = React.useState(false);

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    React.useEffect(() => {
        setDataFetched(false);
        const params = getRequestParams(documentoSaida, page, rowsPerPage);
        DocumentoSaidaService.getListaDocumentoSaidaItens(params)
            .then((resp) => {
                setDataFetched(true);
                setData(resp.data)
                setRowsPerPage(resp.data.pageable.pageSize);
                setPage(resp.data.number);
            })
            .catch(() => {
                sendMessage(Message.INFORMATION, "O documento de entrada informado é inválido");
            });

    }, [documentoSaida, tamanho, setRowsPerPage, setPage, page, rowsPerPage]);

    const atualizaLista = (data) => {
        setTamanho(tamanho + 1);
    }

    const setFieldValue = (fieldname, value) => {
        setDocumentoSaida({
            ...documentoSaida,
            [fieldname]: value
        });
    }

    const onChange = (event) => {
        let t = event.target;
        let value = t.value;
        const fieldname = t.id.split('-')[0];
        setFieldValue(fieldname, value);
    }

    const onChangeComplete = (event, newValue) => {
        setFieldValue("fornecedorId", newValue != null ? newValue.id : '');
    }

    const handleOnClose = () => {
        setItem(emptyItem);
        setOpenModal(false);
    }

    const handleConferencia = (value, activate) => {
        setItem({
            documentoSaidaId: value.documentoSaida.id,
            itemNumero: value.numero
        });
        setEnabled(activate);
        setOpenModal(true);
    }

    return (
        <BaseForm
            title="Conferência de Saída de Estoque"
            messageAlert={messageAlert}
        >
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
                        </React.Fragment>

                    }
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <CustomTextField
                                        id="processo"
                                        label="Nº do Processo"
                                        onChangeHandler={onChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <CustomTextField
                                        id="ata"
                                        label="Nº da Ata"
                                        onChangeHandler={onChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <CustomTextField
                                        id="pregao"
                                        label="Nº do Pregão"
                                        onChangeHandler={onChange} />
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <CustomTextField
                                    id="empenhoContabil"
                                    label="Nº do Empenho Contábil"
                                    onChangeHandler={onChange} />
                            </Grid>
                            <Grid item xs={4}>
                                <CustomTextField
                                    id="contrato"
                                    label="Nº do Contrato"
                                    onChangeHandler={onChange} />
                            </Grid>
                            <Grid item xs={4}>
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
                                    onChangeHandler={(event, newValue) => onChangeComplete(event, newValue)}
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
                        <DocumentoSaidaConferenciaTableRow
                            key={"row-" + key}
                            row={row}
                            onConferenciaRow={(value) => handleConferencia(value, true)}
                            onViewRow={(value) => handleConferencia(value, false)}
                        />
                    );
                })}
            </CustomTable>

            <DocumentoSaidaConferenciaForm
                documentoSaidaId={item.documentoSaidaId}
                itemNumero={item.itemNumero}
                openModal={openModal}
                onClose={handleOnClose}
                callback={atualizaLista}
                enabled={enabled}
            />
        </BaseForm>
    );
}