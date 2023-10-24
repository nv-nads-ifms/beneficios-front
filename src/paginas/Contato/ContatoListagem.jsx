import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';


export default function ContatoListagem() {
    return (
        <DNABaseDialogListForm
            datasourceUrl="contato"
            formtitle='Listagem de Tipos de Contato'
            dialog_form_title='Cadastrar Cadastrar Tipo de Contato'
        />
    );
}