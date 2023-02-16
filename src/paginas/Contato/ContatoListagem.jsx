import React from 'react';
import ContatoService from '../../services/ContatoService';
import DefaultListForm from '../../components/CustomForms/DefaultListForm';

export default function ContatoListagem() {
    return (
        <DefaultListForm
            url={"/contato-ficha"}
            remotePath={'/contato'}
            formTitle="Listagem de Tipos de Contato"
            addButtonLabel="Criar Novo Tipo de Contato"
            onRowRemoveButton={ContatoService.deleteContato}
            retrieveDataFunction={ContatoService.getContato}
            columns={[{ id: 'id', label: 'Código' },{ id: 'descricao', label: 'Descrição' },{ id: 'tipoContato', label: 'Tipo do Contato' }]}
            idColumnName={'id'}
        />
    );
}