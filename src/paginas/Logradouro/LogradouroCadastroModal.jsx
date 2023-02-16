import React from 'react';
import { validarCampo } from '../../models/validaCampos';
import useErros from '../../hooks/useErros';
import DialogForms from '../../components/CustomForms/DialogForms';
import { emptyMessageAlert, sendMessageAlert } from '../../api/utils/customMessages';
import { Message } from '../../api/utils/constants';
import LogradouroService from '../../services/LogradouroService';
import CustomTextField from '../../components/CustomFields/CustomTextField';

export default function LogradouroCadastroModal(props) {
    const { openModal, onClose, callback } = props;
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);

    const [logradouro, setLogradouro] = React.useState({
        nome: '',
    });

    const [erros, validarCampos] = useErros({
        nome: validarCampo,
    });

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    const onChange = (event) => {
        let t = event.target;
        setLogradouro({
            ...logradouro,
            [t.name]: t.value,
        });
    }

    const handlePost = (event) => {
        event.preventDefault();

        LogradouroService.saveLogradouro(0, logradouro)
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
            title="Cadastro de Logradouro"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={handlePost}
            messageAlert={messageAlert}
        >
            <CustomTextField
                id="nome"
                label="Nome"
                value={logradouro.nome}
                placeholder="Digite o nome do Logradouro"
                autoFocus={true}
                error={erros.nome}
                onChangeHandler={onChange}
            />
        </DialogForms>
    );
}