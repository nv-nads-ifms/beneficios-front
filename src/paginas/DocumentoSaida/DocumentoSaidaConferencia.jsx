import React from 'react';
import {
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import { formContext } from '../../contexts/formContext';
import { DNAStatus, Status } from '../../api/utils/constants';
import { emptyDocumentoSaida } from '../../models/DocumentoSaida';
import DocumentoSaidaConferenciaForm from './DocumentoSaidaConferenciaForm';
import ChipStatus from '../../components/CustomButtons/ChipStatus';
import DocumentoEntradaBeneficioColumn from '../DocumentoEntrada/components/DocumentoEntradaBeneficioColumn';
import { userContext } from '../../hooks/userContext';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { emptyPerfilMenu, getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { Preview, Publish } from '@mui/icons-material';
import { handleChangeInputComponent } from '../../api/utils/util';

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
        field: 'origem',
        headerName: 'Origem',
        width: 180,
        valueGetter: ({ row }) => row.documentoSaida.unidadeAtendimento.numeroDaUnidade,
    },
    {
        field: 'unidadeAtendimento',
        headerName: 'Destino',
        width: 180,
        valueGetter: ({ value }) => value.numeroDaUnidade,
    },
    {
        field: 'numero',
        headerName: 'Número',
        width: 80,
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

function DocumentoSaidaConferencia() {
    const usuario = React.useContext(userContext);
    /* Perfil de analise dos atendimentos */
    const perfilConferencia = React.useMemo(() => {
        if (usuario != null && usuario.hasOwnProperty('perfis'))
            return getMenuPerfilByUrl(usuario.perfis, `/documento-saida-conferencia`);
        return emptyPerfilMenu;
    }, [usuario]);

    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "documento-saida/itens";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [documentoSaida, setDocumentoSaida] = React.useState({
        ...emptyDocumentoSaida,
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

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setDocumentoSaida, documentoSaida);
    };

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
                getRowId={(row) => [row.documentoSaida.id, row.numero]}
                formtitle='Conferência de Saída no Estoque'
                filterparams={{
                    status: documentoSaida.status !== Status.TODOS ? documentoSaida.status : '',
                }}
                columns={columns}
                moreActions={buttonMoreActions}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Status do Documento de Saída</FormLabel>
                            <RadioGroup
                                row
                                defaultValue={Status.TODOS}
                                aria-label="status"
                                name="status"
                                onChange={handleChange}>
                                <FormControlLabel value={Status.TODOS} control={<Radio color="primary" />} label="Todos" />
                                <FormControlLabel value={Status.PENDENTE} control={<Radio color="primary" />} label="Pendente" />
                                <FormControlLabel value={Status.PARCIAL} control={<Radio color="primary" />} label="Parcial" />
                                <FormControlLabel value={Status.RECEBIDO} control={<Radio color="primary" />} label="Recebido" />
                                <FormControlLabel value={Status.CANCELADO} control={<Radio color="primary" />} label="Cancelado" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </DNADefaultDialogListForm>

            <DocumentoSaidaConferenciaForm
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

export default DocumentoSaidaConferencia;