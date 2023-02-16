import React from 'react';
import { validarCampo } from '../../models/validaCampos';
import useErros from '../../hooks/useErros';
import DialogForms from '../../components/CustomForms/DialogForms';
import { emptyMessageAlert, sendMessageAlert } from '../../api/utils/customMessages';
import { Message } from '../../api/utils/constants';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import BairroService from '../../services/BairroService';

export default function BairroCadastroModal(props) {
    const { openModal, onClose, callback } = props;
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);

    const [bairro, setBairro] = React.useState({
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
        setBairro({
            ...bairro,
            [t.name]: t.value,
        });
    }

    const handlePost = (event) => {
        event.preventDefault();

        BairroService.saveBairro(0, bairro)
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
            title="Cadastro de Bairro"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={handlePost}
            messageAlert={messageAlert}
        >
            <CustomTextField
                id="nome"
                label="Nome"
                value={bairro.nome}
                placeholder="Digite o nome do Bairro"
                autoFocus={true}
                error={erros.nome}
                onChangeHandler={onChange}
            />
        </DialogForms>
    );
}