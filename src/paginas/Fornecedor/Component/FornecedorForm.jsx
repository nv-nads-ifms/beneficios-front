import React from 'react';
import { Grid } from '@material-ui/core';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import DocumentosComponent from '../../Pessoa/documentos/DocumentosComponent';
import ContatosComponent from '../../Pessoa/contatos/ContatosComponent';
import Logradouro from '../../../components/Endereco/Logradouro';

export default function FornecedorForm(props) {
    const { fornecedor, disabled, onChange, callback } = props;

    const setContatos = (values) => {
        callback({
            ...fornecedor,
            contatos: values,
        });
    }

    const setDocumentos = (values) => {
        callback({
            ...fornecedor,
            documentos: values,
        });
    }

    const setEndereco = (value) => {
        callback({
            ...fornecedor,
            endereco: value,
        });
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <CustomTextField
                        id="nome"
                        label="Nome do Fornecedor"
                        value={fornecedor.nome}
                        placeholder={"<< Digite o nome da Fornecedor >>"}
                        autoFocus={true}
                        disabled={disabled}
                        onChangeHandler={onChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomTextField
                        id="codigo"
                        label="Código do Fornecedor"
                        value={fornecedor.codigo}
                        disabled={disabled}
                        onChangeHandler={onChange} />
                </Grid>
                <Grid item xs={6}>
                    <DocumentosComponent
                        disabled={disabled}
                        documentos={fornecedor.documentos}
                        callback={setDocumentos} />
                </Grid>
                <Grid item xs={6}>
                    <ContatosComponent
                        disabled={disabled}
                        contatos={fornecedor.contatos}
                        callback={setContatos} />
                </Grid>
                <Grid item xs={12}>
                    <Logradouro
                        disabled={disabled}
                        obj={fornecedor.endereco}
                        callback={setEndereco} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}