import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultForm from '../../components/CustomForms/DefaultForm';
import CondicaoDeMoradiaService from "../../services/CondicaoDeMoradiaService";

export default function CondicaoDeMoradiaCadastro() {
    const { id, status } = useParams();

    return (
        <DefaultForm 
            id={id}
            title="Cadastro de Condição de Moradia"
            retrieveData={CondicaoDeMoradiaService.getCondicaoDeMoradiaById}
            fieldname="descricao"
            label="Descrição"
            placeholder={"Digite a condição de moradia"}
            saveFunction={CondicaoDeMoradiaService.saveCondicaoDeMoradia}
            returnUrl={'/condicoes-de-moradia'}
            read={status === 'view'}
        />
    );
}