import React from 'react';
import DefaultListForm from '../../components/CustomForms/DefaultListForm';
import DocumentoService from '../../services/DocumentoService';

import DNABaseDialogListForm from '../../components/V1.0.0/forms/DNABaseDialogListForm';

export default function DocumentoListagem() {
    return (

        <DNABaseDialogListForm
            datasourceUrl="documentos"
            formtitle='Listagem de Tipos de Documentos'
            dialog_form_title='Cadastrar Tipo de Documento'
        />
    );
}