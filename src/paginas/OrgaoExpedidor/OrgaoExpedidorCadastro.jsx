import React from 'react';
import { useParams } from 'react-router-dom';
import DefaultForm from '../../components/CustomForms/DefaultForm';
import OrgaoExpedidorService from "../../services/OrgaoExpedidorService";

export default function OrgaoExpedidorCadastro() {
    const { id, status } = useParams();
    return (
        <DefaultForm 
            id={id}
            title="Cadastro de Orgão Expedidor"
            retrieveData={OrgaoExpedidorService.getOrgaoExpedidorById}
            fieldname="descricao"
            label="Descrição"
            placeholder={"Digite a descrição do Orgão Expedidor"}
            saveFunction={OrgaoExpedidorService.saveOrgaoExpedidor}
            returnUrl={'/orgaos-expedidores'}
            read={status === 'view'}
        />
    );
}