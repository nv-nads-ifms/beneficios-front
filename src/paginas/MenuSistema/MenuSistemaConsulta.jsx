import React from 'react';

import { formContext } from '../../contexts/formContext';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import { DNAStatus } from '../../api/utils/constants';
import { Grid, TextField } from '@mui/material';
import MenuSistemaForm from './MenuSistemaForm';
import TipoMenuSistemaToggleButton from './component/TipoMenuSistemaToggleButton';
import DisponivelToggleButton from './component/DisponivelToggleButton';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1,
    },
    {
        field: 'remotePath',
        headerName: 'URL',
        width: 200,
    },
    {
        field: 'tipo',
        headerName: 'Tipo',
        width: 200,
    },
    {
        field: 'disponivel',
        headerName: 'Disponível',
        width: 200,
        renderCell: ({ value }) => {
            return value ? 'Sim' : 'Não';
        }
    },
];

/* Classe de controle para acesso aos serviços do BACKEND */
const path = "menus";

function MenuSistemaConsulta() {
    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState(0);

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [nome, setNome] = React.useState('');
    const [tipo, setTipo] = React.useState('');
    const [disponivel, setDisponivel] = React.useState('');

    const decrement = React.useCallback(() => {
        if (formId >= 0) {
            setFormId(-1);
        } else {
            setFormId(formId - 1);
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
                formtitle='Consultar Menus do Sistema'
                filterparams={{
                    nome: nome,
                    tipo: tipo,
                    disponivel: disponivel,
                }}
                columns={columns}
                gridHeigh={400}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            id="nome"
                            label="Nome do menu"
                            value={nome}
                            variant="outlined"
                            placeholder={"Buscar pelo nome do menu"}
                            fullWidth
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TipoMenuSistemaToggleButton
                            value={tipo}
                            onChange={(e, newValue) => setTipo(newValue)}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <DisponivelToggleButton
                            value={disponivel}
                            onChange={(e, newValue) => setDisponivel(newValue)}
                        />
                    </Grid>
                </Grid>

            </DNADefaultDialogListForm>

            <MenuSistemaForm
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

export default MenuSistemaConsulta;