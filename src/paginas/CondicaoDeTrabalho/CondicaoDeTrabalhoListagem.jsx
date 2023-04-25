import React from 'react';
import DefaultListForm from '../../components/CustomForms/DefaultListForm';
import CondicaoDeTrabalhoService from '../../services/CondicaoDeTrabalhoService';

export default function CondicaoDeTrabalhoListagem() {
    return (
        <DefaultListForm
            url={"/condicoes-de-trabalho-ficha"}
            remotePath={"/condicoes-de-trabalho"}
            formTitle="Listagem de Condições de Trabalho"
            addButtonLabel="Cadastrar Condição de Trabalho"
            onRowRemoveButton={CondicaoDeTrabalhoService.deleteCondicaoDeTrabalho}
            retrieveDataFunction={CondicaoDeTrabalhoService.getCondicoesDeTrabalho}
            columns={[{ id: 'id', label: 'Código' },{ id: 'nome', label: 'Nome' }]}
            idColumnName={'id'}
        />
    );
}