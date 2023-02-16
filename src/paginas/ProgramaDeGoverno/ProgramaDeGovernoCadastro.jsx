import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultForm from '../../components/CustomForms/DefaultForm';
import ProgramaDeGovernoService from "../../services/ProgramaDeGovernoService";

export default function ProgramaDeGovernoCadastro() {
    
    const { id, status } = useParams();
    return (
        <DefaultForm 
            id={id}
            title="Cadastro de Programa de Governo"
            retrieveData={ProgramaDeGovernoService.getProgramaDeGovernoById}
            fieldname="descricao"
            label="Descrição"
            placeholder={"Digite a descrição do Programa de Governo"}
            saveFunction={ProgramaDeGovernoService.saveProgramaDeGoverno}
            returnUrl={'/programas-de-governo'}
            read={status === 'view'}
        />
    );
}