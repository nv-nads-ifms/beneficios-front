import React from 'react';
import FornecedorService from "../../../services/FornecedorService";
import { validarCampo } from '../../../models/validaCampos';
import FornecedorForm from './../Component/FornecedorForm';
import useErros from '../../../hooks/useErros';
import DialogForms from '../../../components/CustomForms/DialogForms';
import { emptyMessageAlert, sendMessageAlert } from '../../../api/utils/customMessages';
import { Message } from '../../../api/utils/constants';
import { emptyFornecedor } from '../../../models/Fornecedor';

export default function FornecedorCadastroModal(props) {
    const { openModal, onClose, callback } = props;
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);
    const [fornecedor, setFornecedor] = React.useState(emptyFornecedor);

    const [erros, validarCampos] = useErros({
        nome: validarCampo,
        codigo: validarCampo,
        enderecoDto: validarCampo,
    });

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    const onChange = (event) => {
        let t = event.target;
        const value = t.value;
        setFornecedor({
            ...fornecedor,
            [t.name]: value,
        });
    }

    const handlePost = (event) => {
        event.preventDefault();

        FornecedorService.saveFornecedor(fornecedor, 0)
            .then(r => {
                const data = r.data;
                if ('status' in data && data.status === 400) {
                    sendMessage(Message.WARNING, data.message);
                } else if (Array.isArray(data)) {
                    validarCampos(data);
                    sendMessage(Message.WARNING, "Alguns campos não foram informados!");
                } else {
                    callback(data);
                    onClose();
                }
            });
    }
    return (
        <DialogForms
            title="Cadastro de Tipo de Fornecedor"
            open={openModal}
            maxWidth="md"
            onClose={onClose}
            onSave={handlePost}
            messageAlert={messageAlert}
        >
            <FornecedorForm
                fornecedor={fornecedor}
                erros={erros}
                onChange={onChange}
                callback={setFornecedor} />
        </DialogForms>
    );
}