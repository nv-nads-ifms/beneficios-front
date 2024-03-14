import React from 'react';

import { objectContext } from '../../contexts/objectContext';
import DNAFormDialog from '../../components/V1.0.0/dialog/DNAFormDialog';
import { handleChangeInputComponent, setFieldValue } from '../../api/utils/util';
import { emptyFornecedor } from '../../models/Fornecedor';
import { Grid, TextField } from '@mui/material';
import { DNAStatus } from '../../api/utils/constants';
import DocumentosComponent from '../Pessoa/documentos/DocumentosComponent';
import ContatosComponent from '../Pessoa/contatos/ContatosComponent';
import Logradouro from '../../components/Endereco/Logradouro';

function FornecedorForm(props) {
    const { datacontrol, on_change_datacontrol, data_source_url,
        id_value, open, on_close_func } = props;

    const [fornecedor, setFornecedor] = React.useState(emptyFornecedor);

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setFornecedor, fornecedor);
    };

    const handleEdit = () => {
        on_change_datacontrol(DNAStatus.EDIT);
    }

    const setValues = (fieldname, value) => {
        setFieldValue(fieldname, value, setFornecedor, fornecedor);
    }

    return (
        <objectContext.Provider value={{
            object: fornecedor,
            setObject: setFornecedor,
            emptyObject: emptyFornecedor
        }}>
            <DNAFormDialog
                id_value={id_value}
                texto_titulo_formulario={"Dados do Fornecedor"}
                datacontrol={datacontrol}
                open={open}
                data_source_url={data_source_url}
                on_edit_func={handleEdit}
                on_close_func={on_close_func}
                fullWidth
                maxWidth={"md"}
            >
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            id="nome"
                            label="Nome do Fornecedor"
                            value={fornecedor.nome}
                            placeholder={"<< Digite o nome da Fornecedor >>"}
                            autoFocus={true}
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={handleChange}
                            fullWidth
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="codigo"
                            label="Código do Fornecedor"
                            value={fornecedor.codigo}
                            disabled={datacontrol === DNAStatus.VIEW}
                            onChange={handleChange}
                            fullWidth
                            variant='outlined' />
                    </Grid>
                    <Grid item xs={6}>
                        <DocumentosComponent 
                            disabled={datacontrol === DNAStatus.VIEW} />
                    </Grid>
                    <Grid item xs={6}>
                        <ContatosComponent 
                            disabled={datacontrol === DNAStatus.VIEW} />
                    </Grid>
                    <Grid item xs={12}>
                        <Logradouro
                            disabled={datacontrol === DNAStatus.VIEW}
                            obj={fornecedor.endereco}
                            callback={(newValue) => setValues('endereco', newValue)} />
                    </Grid>
                </Grid>
            </DNAFormDialog>
        </objectContext.Provider>
    );
}

export default FornecedorForm;