import React from 'react';

import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

function TipoUnidadeDeAtendimentoConsulta() {
    return (
        <DNABaseDialogListForm
            datasourceUrl='tipos-de-unidades-atendimento'
            formtitle='Consultar tipos de unidades de atendimento'
            dialog_form_title='Dados do tipo de unidade de atendimento'
        />
    );
}

export default TipoUnidadeDeAtendimentoConsulta;