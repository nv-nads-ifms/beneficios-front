import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

export default function ParentescoListagem() {
    return (
        <DNABaseDialogListForm
            datasourceUrl="parentescos"
            formtitle='Listagem de Parentescos'
            dialog_form_title='Cadastrar Parentesco'
        />
    );
}