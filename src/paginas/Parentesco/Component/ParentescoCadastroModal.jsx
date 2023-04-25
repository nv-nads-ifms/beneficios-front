import React from 'react';
import ParentescoService from "../../../services/ParentescoService";
import { validarCampo } from '../../../models/validaCampos';
import useErros from '../../../hooks/useErros';
import DialogForms from '../../../components/CustomForms/DialogForms';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import { emptyMessageAlert, sendMessageAlert } from '../../../api/utils/customMessages';
import { Message } from '../../../api/utils/constants';

export default function ParentescoCadastroModal(props) {
    const { openModal, onClose, callback } = props;
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);

    const [parentesco, setParentesco] = React.useState({
        nome: '',
    });

    const [erros, validarCampos] = useErros({
        nome: validarCampo,
    });

    const onChange = (event) => {
        let t = event.target;
        const value = t.value;
        setParentesco({
            ...parentesco,
            [t.name]: value,
        });
    }

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    const handlePost = (event) => {
        event.preventDefault();

        ParentescoService.saveParentesco(0, parentesco.descricao)
            .then(r => r.json())
            .then(data => {
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
            title="Cadastro de Parentesco"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={handlePost}
            messageAlert={messageAlert}
        >
            <CustomTextField
                id="nome"
                label="Nome"
                value={parentesco.descricao}
                placeholder="Informe o nome do Parentesco"
                autoFocus={true}
                error={erros.descricao}
                onChangeHandler={onChange}
            />
        </DialogForms>
    );
}