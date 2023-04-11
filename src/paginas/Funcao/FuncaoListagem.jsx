import React from 'react';
import FuncaoService from '../../services/FuncaoService';
import DefaultListForm from "../../components/CustomForms/DefaultListForm";

export default function FuncaoListagem() {

    return (
        <DefaultListForm 
            url={"/funcao-ficha"}
            remotePath={"/funcoes"}
            formTitle="Listagem de Funções"
            addButtonLabel="Cadastrar Função"
            onRowRemoveButton={FuncaoService.deleteFuncao}
            retrieveDataFunction={FuncaoService.getFuncoes}
            columns={[{ id: 'id', label: 'Código' },{ id: 'nome', label: 'Nome' }]}
            idColumnName={'id'}
        />
    );
}