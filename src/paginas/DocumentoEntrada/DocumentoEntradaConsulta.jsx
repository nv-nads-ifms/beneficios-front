import React from 'react';

import { formContext } from '../../contexts/formContext';
import { objectContext } from '../../contexts/objectContext';

import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { emptyDocumentoEntrada } from '../../models/DocumentoEntrada';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import { DNAStatus, Status } from '../../api/utils/constants';
import DocumentoEntradaForm from './DocumentoEntradaForm';
import DocumentoEntradaDocumentoColumn from './components/DocumentoEntradaDocumentoColumn';
import DocumentoEntradaConsultaFiltro from './components/DocumentoEntradaConsultaFiltro';
import DocumentoEntradaContagem from './DocumentoEntradaContagem';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        renderCell: (params) => {
            return (
                <ChipStatus status={params.value} />
            );
        }
    },
    {
        field: 'unidadeAtendimento',
        headerName: 'Unidade de atendimento',
        minWidth: 100,
        flex: 1,
        valueGetter: ({ value }) => value.nome,
    },
    {
        field: 'documento',
        headerName: 'Documento',
        minWidth: 100,
        flex: 1,
        renderCell: (params) => {
            return (
                <DocumentoEntradaDocumentoColumn row={params.row} />
            );
        }
    },
    {
        field: 'fornecedor',
        headerName: 'Fornecedor',
        minWidth: 100,
        flex: 1,
        valueGetter: ({ value }) => value.nome
    }
];

function DocumentoEntradaConsulta() {
    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "documento-entrada";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [documentoEntrada, setDocumentoEntrada] = React.useState(emptyDocumentoEntrada);

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState(0);

    const decrement = React.useCallback(() => {
        if (formId >= 0) {
            setFormId(formId - 1);
        } else {
            setFormId(-1);
        }
    }, [formId]);

    const handleClose = () => {
        setOpen(false);
        decrement();
    };

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle='Consultar Documentos de Entrada'
                filterparams={{
                    ...documentoEntrada,
                    fornecedorId: documentoEntrada.fornecedor != null ? documentoEntrada.fornecedor.id : '',
                    status: documentoEntrada.status !== Status.TODOS ? documentoEntrada.status : '',
                }}
                columns={columns}
            >
                <DocumentoEntradaContagem />
                <objectContext.Provider value={{
                    object: documentoEntrada,
                    setObject: setDocumentoEntrada,
                    emptyObject: emptyDocumentoEntrada
                }}>
                    <DocumentoEntradaConsultaFiltro formId={formId} />
                </objectContext.Provider>
            </DNADefaultDialogListForm>

            <DocumentoEntradaForm
                id_value={formId}
                datacontrol={dataControl}
                on_change_datacontrol={setDataControl}
                open={open}
                on_close_func={handleClose}
                data_source_url={path}
            />
        </formContext.Provider>
    );
}

export default DocumentoEntradaConsulta;