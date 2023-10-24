import React from 'react';
import DefaultListForm from "../../components/CustomForms/DefaultListForm";
import GrupoSocioeducativoService from '../../services/GrupoSocioeducativoService';

import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

export default function GrupoSocioeducativoListagem() {    
    return (
        <DNABaseDialogListForm
            datasourceUrl="grupo-socioeducativo"
            formtitle='Listagem de Grupos Socioeducativos'
            dialog_form_title='Cadastrar Grupo Socioeducativo'
        />
    );
}