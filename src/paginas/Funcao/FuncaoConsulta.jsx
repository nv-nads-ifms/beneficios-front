import React from "react";
import DNABaseDialogListForm from "../../components/V1.0.0/forms/DNABaseDialogListForm";

export default function FuncaoConsulta() {
    return (
        <DNABaseDialogListForm
            datasourceUrl="funcoes"
            formtitle="Listagem de Funções"
            dialog_form_title="Dados da Listagem de Funções"
        />
    );
}
