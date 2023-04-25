import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultForm from '../../components/CustomForms/DefaultForm';
import CondicaoDeTrabalhoService from "../../services/CondicaoDeTrabalhoService";

export default function CondicaoDeTrabalhoCadastro() {
    const { id, status } = useParams();
    return (
        <DefaultForm 
            id={id}
            title="Cadastro de Condições de Trabalho"
            retrieveData={CondicaoDeTrabalhoService.getCondicaoDeTrabalhoById}
            fieldname="nome"
            label="Nome"
            placeholder={"Digite a descrição da condição de trabalho"}
            saveFunction={CondicaoDeTrabalhoService.saveCondicaoDeTrabalho}
            returnUrl={'/condicoes-de-trabalho'}
            read={status === 'view'}
        />
    );
}