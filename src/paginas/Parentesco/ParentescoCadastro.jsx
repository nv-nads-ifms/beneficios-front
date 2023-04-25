import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultForm from '../../components/CustomForms/DefaultForm';
import ParentescoService from "../../services/ParentescoService";

export default function ParentescoCadastro() {
    const { id, status } = useParams();
    return (
        <DefaultForm 
            id={id}
            title="Cadastro de Parentesco"
            retrieveData={ParentescoService.getParentescoById}
            fieldname="nome"
            label="Nome"
            placeholder={"Digite o nome do Parentesco"}
            saveFunction={ParentescoService.saveParentesco}
            returnUrl={'/parentescos'}
            read={status === 'view'}
        />
    );
}