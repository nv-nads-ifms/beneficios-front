import React from 'react';
import DefaultListForm from '../../components/CustomForms/DefaultListForm';
import CondicaoDeMoradiaService from '../../services/CondicaoDeMoradiaService';

export default function CondicaoDeMoradiaListagem() {
    return (
        <DefaultListForm
            url={"/condicoes-de-moradia-ficha"}
            remotePath={'/condicoes-de-moradia'}
            formTitle="Listagem de Condições de Moradia"
            addButtonLabel="Cadastrar Condição de Moradia"
            onRowRemoveButton={CondicaoDeMoradiaService.deleteCondicaoDeMoradia}
            retrieveDataFunction={CondicaoDeMoradiaService.getCondicoesDeMoradia}
            columns={[{ id: 'id', label: 'Código' },{ id: 'descricao', label: 'Descrição' }]}
            idColumnName={'id'}
        />
    );
}