import React from 'react';
import DefaultListForm from '../../components/CustomForms/DefaultListForm';
import OrgaoExpedidorService from '../../services/OrgaoExpedidorService';

export default function OrgaoExpedidorListagem() {
    return (
        <DefaultListForm
            url={"/orgaos-expedidores-ficha"}
            remotePath={"/orgaos-expedidores"}
            formTitle="Listagem de Orgãos Expedidores"
            addButtonLabel="Cadastrar Órgão Expedidor"
            onRowRemoveButton={OrgaoExpedidorService.deleteOrgaoExpedidor}
            retrieveDataFunction={OrgaoExpedidorService.getOrgaosExpedidores}
            columns={[{ id: 'id', label: 'Código' },{ id: 'descricao', label: 'Descrição' }]}
            idColumnName={'id'}
        />
    );
}