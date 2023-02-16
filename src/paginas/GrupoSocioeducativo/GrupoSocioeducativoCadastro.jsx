import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultForm from '../../components/CustomForms/DefaultForm';
import GrupoSocioeducativoService from "../../services/GrupoSocioeducativoService";

export default function GrupoSocioeducativoCadastro() {
    const { id, status } = useParams();
    return (
        <DefaultForm 
            id={id}
            title="Cadastro de Grupo Socioeducativo"
            retrieveData={GrupoSocioeducativoService.getGrupoSocioeducativoById}
            fieldname="nome"
            label="Nome"
            placeholder={"Digite o nome do Grupo Socioeducativo"}
            saveFunction={GrupoSocioeducativoService.saveGrupoSocioeducativo}
            returnUrl={'/grupo-socioeducativo'}
            read={status === 'view'}
        />
    );
}