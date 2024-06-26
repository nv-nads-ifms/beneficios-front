import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

function ProgramaDeGovernoConsulta() {
    return (
        <DNABaseDialogListForm
            datasourceUrl="programas-de-governo"
            formtitle='Listagem de Programas de Governo'
            dialog_form_title='Cadastrar Programa de Governo'
        />
    );
}

export default ProgramaDeGovernoConsulta;