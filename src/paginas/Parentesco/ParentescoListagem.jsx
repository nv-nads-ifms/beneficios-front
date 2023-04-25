import React from 'react';
import DefaultListForm from '../../components/CustomForms/DefaultListForm';
import ParentescoService from '../../services/ParentescoService';

export default function ParentescoListagem() {
    return (
        <DefaultListForm
            url={"/parentescos-ficha"}
            remotePath={'/parentescos'}
            formTitle="Listagem de Parentescos"
            addButtonLabel="Cadastrar Parentesco"
            onRowRemoveButton={ParentescoService.deleteParentesco}
            retrieveDataFunction={ParentescoService.getParentescos}
            columns={[{ id: 'id', label: 'Código' },{ id: 'nome', label: 'Nome' }]}
            idColumnName={'id'}
        />
    );
}