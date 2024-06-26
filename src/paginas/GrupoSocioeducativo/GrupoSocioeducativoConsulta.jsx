import React from 'react';
import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

function GrupoSocioeducativoConsulta() {    
    return (
        <DNABaseDialogListForm
            datasourceUrl="grupo-socioeducativo"
            formtitle='Listagem de Grupos Socioeducativos'
            dialog_form_title='Cadastrar Grupo Socioeducativo'
        />
    );
}

export default GrupoSocioeducativoConsulta;