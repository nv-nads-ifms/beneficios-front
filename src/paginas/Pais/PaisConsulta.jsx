import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

function PaisConsulta () {
    return (
        <DNABaseDialogListForm
            datasourceUrl='pais'
            formtitle='Consultar Países'
            dialog_form_title='Dados do País'
        />
    );
}

export default PaisConsulta;