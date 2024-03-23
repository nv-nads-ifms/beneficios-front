import React from 'react';

import { formContext } from '../../contexts/formContext';
import { objectContext } from '../../contexts/objectContext';

import { DNAStatus, Status } from '../../api/utils/constants';
import { emptyDocumentoEntrada } from '../../models/DocumentoEntrada';
import DocumentoEntradaConferenciaForm from './DocumentoEntradaConferenciaForm';
import DocumentoEntradaBeneficioColumn from './components/DocumentoEntradaBeneficioColumn';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import DocumentoEntradaDocumentoColumn from './components/DocumentoEntradaDocumentoColumn';
import { handleChangeInputComponent } from '../../api/utils/util';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import DocumentoEntradaConsultaFiltro from './components/DocumentoEntradaConsultaFiltro';

const columns = [
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
        valueGetter: ({ row }) => row.unidadeAtendimento.nome,
    },
    {
        field: 'fornecedor',
        headerName: 'Fornecedor',
        minWidth: 100,
        flex: 1,
        valueGetter: ({ row }) => row.fornecedor.nome
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
        field: 'numero',
        headerName: 'Número',
        valueGetter: ({ value, row }) => `${row.documentoEntrada.id}/${value}`
    },
    {
        field: 'beneficio',
        headerName: 'Benefício Eventual',
        renderCell: (params) => {
            return (
                <DocumentoEntradaBeneficioColumn row={params.row} />
            );
        }
    }
];

const emptyItem = { documentoEntradaId: '', itemNumero: '' };

export default function DocumentoEntradaConferencia() {
    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "documento-entrada/itens";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [documentoEntrada, setDocumentoEntrada] = React.useState(emptyDocumentoEntrada);

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState();

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

    const [item, setItem] = React.useState(emptyItem);
    const [openModal, setOpenModal] = React.useState(false);
    const [enabled, setEnabled] = React.useState(true);

    const handleOnClose = () => {
        setItem(emptyItem);
        setOpenModal(false);
    }

    const handleConferencia = (value, activate) => {
        setItem({
            documentoEntradaId: value.documentoEntrada.id,
            itemNumero: value.numero
        });
        setEnabled(activate);
        setOpenModal(true);
    }

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle='Conferência de Entrada no Estoqu'
                filterparams={{
                    ...documentoEntrada,
                    status: documentoEntrada.status !== Status.TODOS ? documentoEntrada.status : '',
                }}
                columns={columns}
                getRowId={(row) => `${row.documentoEntrada.id}/${row.numero}`}
            >
                <objectContext.Provider value={{
                    object: documentoEntrada,
                    setObject: setDocumentoEntrada,
                    emptyObject: emptyDocumentoEntrada
                }}>
                    <DocumentoEntradaConsultaFiltro formId={formId} />
                </objectContext.Provider>

                <DocumentoEntradaConferenciaForm
                    documentoEntradaId={item.documentoEntradaId}
                    itemNumero={item.itemNumero}
                    openModal={openModal}
                    enabled={enabled}
                    onClose={handleOnClose}
                    // callback={atualizaLista}
                />
            </DNADefaultDialogListForm>
        </formContext.Provider>
    );
}