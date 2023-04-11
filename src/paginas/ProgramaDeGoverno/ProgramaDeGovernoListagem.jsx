import React from 'react';
import DefaultListForm from '../../components/CustomForms/DefaultListForm';
import ProgramaDeGovernoService from '../../services/ProgramaDeGovernoService';

export default function ProgramaDeGovernoListagem() {
    return (
        <DefaultListForm
            url={"/programas-de-governo-ficha"}
            remotePath={"/programas-de-governo"}
            formTitle="Listagem de Programas de Governo"
            addButtonLabel="Cadastrar Programa de Governo"
            onRowRemoveButton={ProgramaDeGovernoService.deleteProgramaDeGoverno}
            retrieveDataFunction={ProgramaDeGovernoService.getProgramasDeGoverno}
            columns={[{ id: 'id', label: 'Código' },{ id: 'descricao', label: 'Descrição' }]}
            idColumnName={'id'}
        />
    );
}