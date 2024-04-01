import React from 'react';

import { formContext } from '../../contexts/formContext';
import { objectContext } from '../../contexts/objectContext';

import { DNAStatus, Status } from '../../api/utils/constants';
import { emptyDocumentoEntrada } from '../../models/DocumentoEntrada';
import DocumentoEntradaConferenciaForm from './DocumentoEntradaConferenciaForm';
import DocumentoEntradaBeneficioColumn from './components/DocumentoEntradaBeneficioColumn';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import DocumentoEntradaDocumentoColumn from './components/DocumentoEntradaDocumentoColumn';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import DocumentoEntradaConsultaFiltro from './components/DocumentoEntradaConsultaFiltro';
import DocumentoEntradaNumeroColumn from './components/DocumentoEntradaNumeroColumn';
import { Preview, Publish } from '@mui/icons-material';
import { userContext } from '../../hooks/userContext';
import { emptyPerfilMenu, getMenuPerfilByUrl } from '../../api/utils/menuUtils';

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
        width: 180,
        valueGetter: ({ row }) => row.documentoEntrada.unidadeAtendimento.numeroDaUnidade,
    },
    {
        field: 'fornecedor',
        headerName: 'Fornecedor',
        minWidth: 100,
        flex: 1,
        valueGetter: ({ row }) => row.documentoEntrada.fornecedor.nome
    },
    {
        field: 'documento',
        headerName: 'Documento Fiscal',
        minWidth: 180,
        flex: 1,
        renderCell: (params) => {
            return (
                <DocumentoEntradaDocumentoColumn row={params.row.documentoEntrada} />
            );
        }
    },
    {
        field: 'numero',
        headerName: 'Número',
        width: 180,
        renderCell: ({ value, row }) => <DocumentoEntradaNumeroColumn value={value} row={row} />
    },
    {
        field: 'beneficioEventual',
        headerName: 'Benefício Eventual',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return (
                <DocumentoEntradaBeneficioColumn value={params.value} row={params.row} />
            );
        }
    }
];

export default function DocumentoEntradaConferencia() {
    const usuario = React.useContext(userContext);
    /* Perfil de analise dos atendimentos */
    const perfilConferencia = React.useMemo(() => {
        if (usuario != null && usuario.hasOwnProperty('perfis'))
            return getMenuPerfilByUrl(usuario.perfis, `/documento-entrada-conferencia`);
        return emptyPerfilMenu;
    }, [usuario]);

    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "documento-entrada/itens";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [documentoEntrada, setDocumentoEntrada] = React.useState({
        ...emptyDocumentoEntrada,
        status: Status.TODOS
    });

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState(null);

    const decrement = React.useCallback(() => {
        if (formId != null) {
            var l = formId;
            l[0]--;
            setFormId(l);
        } else {
            setFormId(null);
        }
    }, [formId]);

    const handleClose = () => {
        setOpen(false);
        decrement();
    };

    const handleConferencia = React.useCallback(
        (row) => () => {
            setFormId(row.id);
            setDataControl(DNAStatus.EDIT);
            setOpen(true);
        }, [setFormId, setDataControl, setOpen]);

    const handleViewItem = React.useCallback(
        (row) => () => {
            setFormId(row.id);
            setDataControl(DNAStatus.VIEW);
            setOpen(true);
        }, [setFormId, setDataControl, setOpen]);

    const buttonMoreActions = React.useMemo(() => {
        let columns = [];
        if (perfilConferencia !== undefined) {
            if (perfilConferencia.ler) {
                columns.push({ label: 'Ver Item', icon: <Preview />, handleClick: handleViewItem });
            }

            if (perfilConferencia.escrever) {
                columns.push({ label: 'Conferência', icon: <Publish />, handleClick: handleConferencia });
            }
        }
        return columns;
    }, [perfilConferencia, handleViewItem, handleConferencia]);

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                getRowId={(row) => [row.documentoEntrada.id, row.numero]}
                formtitle='Conferência de Entrada no Estoque'
                filterparams={{
                    ...documentoEntrada,
                    fornecedorId: documentoEntrada.fornecedor != null ? documentoEntrada.fornecedor.id : '',
                    status: documentoEntrada.status !== Status.TODOS ? documentoEntrada.status : '',
                }}
                columns={columns}
                moreActions={buttonMoreActions}
            >
                <objectContext.Provider value={{
                    object: documentoEntrada,
                    setObject: setDocumentoEntrada,
                    emptyObject: emptyDocumentoEntrada
                }}>
                    <DocumentoEntradaConsultaFiltro />
                </objectContext.Provider>
            </DNADefaultDialogListForm>

            <DocumentoEntradaConferenciaForm
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