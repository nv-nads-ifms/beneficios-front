import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

export default function OrgaoExpedidorListagem() {
    return (
        <DNABaseDialogListForm
            datasourceUrl="orgaos-expedidores"
            formtitle='Listagem de Orgãos Expedidores'
            dialog_form_title='Cadastrar Órgão Expedidor'
        />
    );
}