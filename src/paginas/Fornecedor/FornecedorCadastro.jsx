import React from "react";
import { useParams, useHistory } from 'react-router-dom';

import FornecedorService from "../../services/FornecedorService";
import BaseForm from "../../components/CustomForms/BaseForm";
import { emptyFornecedor } from "../../models/Fornecedor";
import FornecedorForm from "./Component/FornecedorForm";
import { userContext } from "../../hooks/userContext";
import { getMenuPerfilByUrl } from "../../api/utils/menuUtils";
import { saveModalMessage } from "../../api/utils/modalMessages";

export default function FornecedorCadastro() {
    let history = useHistory();
    const { id, status } = useParams();
    const usuario = React.useContext(userContext);
    const returnURL = "/fornecedores";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);
    const enabledFields = status != null && status === 'edit';

    const [fornecedor, setFornecedor] = React.useState(emptyFornecedor);

    React.useEffect(() => {
        if (id > 0) {
            FornecedorService.getFornecedorById(id)
                .then(r => {
                    setFornecedor(r.data);
                })
                .catch(() => {
                    history.push('/404');
                });
        } else {
            setFornecedor({
                ...emptyFornecedor,
                contatos: [],
                documentos: [],
            });

            return;
        }
    }, [id, history]);

    const handlePost = (event) => {
        saveModalMessage(
            () => FornecedorService.saveFornecedor(fornecedor, id),
            () => history.push(returnURL)
        );
    };

    const onChange = (event, newValue) => {
        let t = event.target;
        let value = newValue != null ? newValue : t.value;
        const fieldname = t.id.split('-')[0];

        setFornecedor({
            ...fornecedor,
            [fieldname]: value
        });
    }
    
    return (
        <BaseForm
            title="Cadastro de Fornecedor"
            backButton
            onSave={perfil.escrever && status !== 'view' ? handlePost : null}>
            <FornecedorForm
                fornecedor={fornecedor}
                disabled={!enabledFields}
                onChange={onChange}
                callback={setFornecedor}
            />
        </BaseForm>
    );
}