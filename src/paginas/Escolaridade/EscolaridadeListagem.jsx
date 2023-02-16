import React from 'react';
import DefaultListForm from '../../components/CustomForms/DefaultListForm';
import EscolaridadeService from '../../services/EscolaridadeService';

export default function EscolaridadeListagem() {
    return (
        <DefaultListForm
            url={"/escolaridades-ficha"}
            remotePath={'/escolaridades'}
            formTitle="Listagem de Escolaridades"
            addButtonLabel="Criar Nova Escolaridade"
            onRowRemoveButton={EscolaridadeService.deleteEscolaridade}
            retrieveDataFunction={EscolaridadeService.getEscolaridades}
            columns={[{ id: 'id', label: 'Código' },{ id: 'descricao', label: 'Descrição' }]}
            idColumnName={'id'}
        />
    );
}