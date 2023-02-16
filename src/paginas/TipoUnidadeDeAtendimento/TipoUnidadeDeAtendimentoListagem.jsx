import React from 'react';
import DefaultListForm from "../../components/CustomForms/DefaultListForm";
import TipoUnidadeDeAtendimentoService from '../../services/TipoUnidadeDeAtendimentoService';

export default function TipoUnidadeDeAtendimentoListagem() {    
    return (
        <DefaultListForm
            url={"/tipos-de-unidades-atendimento-ficha"}
            formTitle="Listagem de Tipos de Unidades de Atendimento"
            addButtonLabel="Criar Novo Tipo de Unidade de Atendimento"
            onRowRemoveButton={TipoUnidadeDeAtendimentoService.deleteTipoUnidadeDeAtendimento}
            retrieveDataFunction={TipoUnidadeDeAtendimentoService.getTiposUnidadesDeAtendimento}
            columns={[{ id: 'id', label: 'Código' },{ id: 'nome', label: 'Nome' }]}
            idColumnName={'id'}
            remotePath={'/tipos-de-unidades-atendimento'}
        />
    );
}