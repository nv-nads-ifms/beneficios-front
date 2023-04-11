import React from 'react';
import DefaultListForm from '../../components/CustomForms/DefaultListForm';
import DocumentoService from '../../services/DocumentoService';

export default function DocumentoListagem() {
    return (
        <DefaultListForm
            url={"/documentos-ficha"}
            remotePath={'/documentos'}
            formTitle="Listagem de Tipos de Documentos"
            addButtonLabel="Cadastrar Tipo de Documento"
            onRowRemoveButton={DocumentoService.deleteDocumento}
            retrieveDataFunction={DocumentoService.getDocumentos}
            columns={[
                { id: 'id', label: 'Código' },{ id: 'descricao', label: 'Descrição' },
            ]}
            idColumnName={'id'}
        />
    );
}