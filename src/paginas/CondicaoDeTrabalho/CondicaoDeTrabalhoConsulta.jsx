import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

export default function CondicaoDeTrabalhoConsulta() {
    return (
        <DNABaseDialogListForm
            datasourceUrl="condicoes-de-trabalho"
            formtitle='Listagem de Condições de Trabalho'
            dialog_form_title='Condições de Trabalho'
        />
    );
}