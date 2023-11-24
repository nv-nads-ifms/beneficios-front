import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

function BairroConsulta () {
    return (
        <DNABaseDialogListForm
            datasourceUrl='bairros'
            formtitle='Consultar Bairros'
            dialog_form_title='Dados do Bairro'
        />
    );
}

export default BairroConsulta;