import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultForm from '../../components/CustomForms/DefaultForm';
import TipoUnidadeDeAtendimentoService from "../../services/TipoUnidadeDeAtendimentoService";

export default function TipoUnidadeDeAtendimentoCadastro() {
    const { id, status } = useParams();
    return (
        <DefaultForm 
            id={id}
            title="Cadastro de Tipo de Unidade de Atendimento"
            retrieveData={TipoUnidadeDeAtendimentoService.getTipoUnidadeDeAtendimentoById}
            fieldname="nome"
            label="Nome"
            placeholder={"Digite o nome do Tipo de Unidade de Atendimento"}
            saveFunction={TipoUnidadeDeAtendimentoService.saveTipoUnidadeDeAtendimento}
            returnUrl={'/tipos-de-unidades-atendimento'}
            read={status === 'view'}
        />
    );
}