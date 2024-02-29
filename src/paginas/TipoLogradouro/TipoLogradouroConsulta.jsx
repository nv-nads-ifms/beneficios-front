import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

function TipoLogradouroConsulta () {
    return (
        <DNABaseDialogListForm
            datasourceUrl='tipos-de-logradouros'
            formtitle='Consultar Tipos de Logradouros'
            dialog_form_title='Dados do Tipo de Logradouro'
        />
    );
}

export default TipoLogradouroConsulta;