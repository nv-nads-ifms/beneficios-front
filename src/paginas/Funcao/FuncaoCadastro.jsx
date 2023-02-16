import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultForm from '../../components/CustomForms/DefaultForm';
import FuncaoService from "../../services/FuncaoService";

export default function FuncaoCadastro() {
    const { id, status } = useParams();
    return (
        <DefaultForm 
            id={id}
            title="Cadastro de Funções"
            retrieveData={FuncaoService.getFuncaoById}
            fieldname="nome"
            label="Nome"
            placeholder={"Digite um nome para função"}
            saveFunction={FuncaoService.saveFuncao}
            returnUrl={'/funcoes'}
            read={status === 'view'}
        />
    );
}