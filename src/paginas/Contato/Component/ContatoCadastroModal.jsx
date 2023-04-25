import React from 'react';
import { validarCampo } from '../../../models/validaCampos';
import useErros from '../../../hooks/useErros';
import DialogForms from '../../../components/CustomForms/DialogForms';
import ContatoService from '../../../services/ContatoService';
import { Message } from '../../../api/utils/constants';
import { emptyMessageAlert, sendMessageAlert } from '../../../api/utils/customMessages';
import ContatoForm from '../ContatoForm';


export default function ContatoCadastroModal(props) {
    const { openModal, onClose, callback } = props;
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);

    const [contato, setContato] = React.useState({
        nome: '',
        tipoContato: '',
    });

    const [erros, validarCampos] = useErros({
        nome: validarCampo,
        tipoContato: validarCampo,
    });

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    const handlePost = (event) => {
        event.preventDefault();

        ContatoService.saveContato(0, contato)
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
            title="Cadastro de Tipo de Contato"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={handlePost}
            messageAlert={messageAlert}
        >
            <ContatoForm 
                id={0}
                contato={contato}
                erros={erros}
                callback={setContato}
            />
        </DialogForms>
    );
}