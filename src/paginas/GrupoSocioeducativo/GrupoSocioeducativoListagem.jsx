import React from 'react';
import DefaultListForm from "../../components/CustomForms/DefaultListForm";
import GrupoSocioeducativoService from '../../services/GrupoSocioeducativoService';

export default function GrupoSocioeducativoListagem() {    
    return (
        <DefaultListForm
            url={"/grupo-socioeducativo-ficha"}
            remotePath={'/grupo-socioeducativo'}
            formTitle="Listagem de Grupos Socioeducativos"
            addButtonLabel="Criar Novo Grupo Socioeducativo"
            onRowRemoveButton={GrupoSocioeducativoService.deleteGrupoSocioeducativo}
            retrieveDataFunction={GrupoSocioeducativoService.getGruposSocioeducativos}
            columns={[{ id: 'id', label: 'Código' },{ id: 'nome', label: 'Nome' }]}
            idColumnName={'id'}
        />
    );
}