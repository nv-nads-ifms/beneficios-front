import React from 'react';

import { formContext } from '../../contexts/formContext';
import DNADefaultDialogListForm from '../../components/V1.0.0/forms/DNADefaultDialogListForm';
import PessoaNomeColumn from '../Pessoa/components/PessoaNomeColumn';
import PessoaDocumentosColumn from '../Pessoa/components/PessoaDocumentosColumn';
import PessoaContatosColumn from '../Pessoa/components/PessoaContatosColumn';
import FornecedorEnderecoColumn from './Component/FornecedorEnderecoColumn';
import { Grid, TextField } from '@mui/material';
import { DNAStatus } from '../../api/utils/constants';
import FornecedorForm from './FornecedorForm';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'nome',
        headerName: 'Nome',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return (
                <PessoaNomeColumn row={params.row} value={params.value} />
            );
        }
    },
    {
        field: 'documentos',
        headerName: 'Documentos',
        width: 200,
        renderCell: (params) => {
            return (
                <PessoaDocumentosColumn row={params.row} />
            );
        }
    },
    {
        field: 'contatos',
        headerName: 'Contatos',
        width: 200,
        renderCell: (params) => {
            return (
                <PessoaContatosColumn row={params.row} />
            );
        }
    },
    {
        field: 'endereco',
        headerName: 'Endereço',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
            return <FornecedorEnderecoColumn row={params.row} />;
        }
    }
];

function FornecedorConsulta() {
    /* Classe de controle para acesso aos serviços do BACKEND */
    const path = "fornecedores";

    /* Atributos utilizados para realizar a filtragem da consulta */
    const [nome, setNome] = React.useState("");

    /* Atributos de controle do formulário modal */
    const [open, setOpen] = React.useState(false);
    const [dataControl, setDataControl] = React.useState(DNAStatus.VIEW);
    /* Atributo de controle do ID do objeto de negócio a ser manipulado */
    const [formId, setFormId] = React.useState(0);

    const handleClose = () => {
        setOpen(false);
        setFormId(-1);
    };

    return (
        <formContext.Provider value={{
            setFormId: setFormId,
            setDataControl: setDataControl,
            setOpen: setOpen
        }}>
            <DNADefaultDialogListForm
                datasourceUrl={path}
                formtitle='Consultar Fornecedores'
                filterparams={{
                    nome: nome,
                }}
                columns={columns}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            id='nome'
                            value={nome}
                            label={"Buscar por nome"}
                            variant='outlined'
                            fullWidth
                            onChange={(event) => setNome(event.target.value)} />
                    </Grid>
                </Grid>
            </DNADefaultDialogListForm>

            <FornecedorForm
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

export default FornecedorConsulta;