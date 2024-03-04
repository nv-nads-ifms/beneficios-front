import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

export default function EscolaridadeConsulta() {
    return (
        <DNABaseDialogListForm
            datasourceUrl='escolaridades'
            formtitle='Consultar Escolaridades'
            dialog_form_title='Dados da Escolaridade'
        />
    );
}