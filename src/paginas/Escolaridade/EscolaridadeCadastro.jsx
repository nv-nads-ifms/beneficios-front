import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultForm from '../../components/CustomForms/DefaultForm';
import EscolaridadeService from "../../services/EscolaridadeService";

export default function EscolaridadeCadastro() {
    const { id, status } = useParams();
    return (
        <DefaultForm 
            id={id}
            title="Cadastro de Escolaridade"
            retrieveData={EscolaridadeService.getEscolaridadeById}
            fieldname="descricao"
            label="Descrição"
            placeholder={"Digite a descrição da Escolaridade"}
            saveFunction={EscolaridadeService.saveEscolaridade}
            returnUrl={'/escolaridades'}
            read={status === 'view'}
        />
    );
}