import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

export default function CondicaoDeMoradiaListagem() {
    return (
        <DNABaseDialogListForm
            datasourceUrl='condicoes-de-moradia'
            formtitle='Consultar Condições de Moradia'
            dialog_form_title='Dados da Condição de Moradia'
        />
    );
}