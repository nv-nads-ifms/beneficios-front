import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DocumentoService from "../../services/DocumentoService";
import BaseForm from '../../components/CustomForms/BaseForm';
import DocumentoForm from './Component/DocumentoForm';
import { saveModalMessage } from '../../api/utils/modalMessages';
import { userContext } from '../../hooks/userContext';
import { getMenuPerfilByUrl } from '../../api/utils/menuUtils';

export default function DocumentoCadastro() {
    const { id, status } = useParams();
    const usuario = React.useContext(userContext);
    const returnURL = "/contato";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);

    let history = useHistory();

    const [documento, setDocumento] = React.useState({
        descricao: '',
        exigeOrgaoExpedidor: '',
    });

    React.useEffect(() => {
        if (id > 0) {
            DocumentoService.getDocumentoById(id)
                .then(r => setDocumento(r.data))
                .catch(() => {
                    history.push('/404');
                });
        }
    }, [id, history]);

    const onChange = (event) => {
        let t = event.target;
        const value = t.type === "checkbox" ? t.checked : t.value;
        setDocumento({
            ...documento,
            [t.name]: value,
        });
    }

    const handlePost = (event) => {
        saveModalMessage(
            () => DocumentoService.saveDocumento(id, documento),
            () => history.push('/documentos')
        );
    }

    return (
        <BaseForm
            title="Cadastro de Tipo de Documento"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>
            <DocumentoForm
                documento={documento}
                onChange={onChange}
                status={status} />
        </BaseForm>
    );
}