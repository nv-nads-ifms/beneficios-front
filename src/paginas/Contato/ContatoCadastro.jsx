import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import BaseForm from '../../components/CustomForms/BaseForm';import ContatoForm from './ContatoForm';
import ContatoService from '../../services/ContatoService';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';
import { saveModalMessage } from '../../api/utils/modalMessages';

export default function ContatoCadastro() {
    let history = useHistory();
    const { id, status } = useParams();
    const usuario = React.useContext(userContext);
    const returnURL = "/contato";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);

    const [contato, setContato] = React.useState({
        descricao: '',
        tipoContato: '',
    });

    const handlePost = (event) => {
        saveModalMessage(
            () => ContatoService.saveContato(id, contato),
            () => history.push(returnURL)
        );
    };
    
    return (
        <BaseForm
            title="Cadastro de Tipos de Contatos"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}
        >
            <ContatoForm 
                id={id}
                contato={contato}
                callback={setContato}
                status={status}
            />
        </BaseForm>
    );
}