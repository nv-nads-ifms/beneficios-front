import React from 'react';
import DefaultListForm from '../../components/CustomForms/DefaultListForm';
import ParentescoService from '../../services/ParentescoService';

export default function ParentescoListagem() {
    return (
        <DefaultListForm
            url={"/parentescos-ficha"}
            remotePath={'/parentescos'}
            formTitle="Listagem de Parentescos"
            addButtonLabel="Criar Novo Parentesco"
            onRowRemoveButton={ParentescoService.deleteParentesco}
            retrieveDataFunction={ParentescoService.getParentescos}
            columns={[{ id: 'id', label: 'Código' },{ id: 'descricao', label: 'Descrição' }]}
            idColumnName={'id'}
        />
    );
}