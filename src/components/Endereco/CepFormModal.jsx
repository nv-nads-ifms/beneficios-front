import React from 'react';
import { Grid } from '@material-ui/core';
import { emptyMessageAlert, sendMessageAlert } from '../../api/utils/customMessages';
import useErros from '../../hooks/useErros';
import { emptyCep } from '../../models/Endereco';

import { validarCampo } from '../../models/validaCampos';
import FieldCidadeComponent from '../../paginas/Cidade/FieldCidadeComponent';
import DialogForms from '../CustomForms/DialogForms';
import FieldLogradouroComponent from '../../paginas/Logradouro/FieldLogradouroComponent';
import FieldBairroComponent from '../../paginas/Bairro/FieldBairroComponent';
import CepService from '../../services/CepService';
import { Message } from '../../api/utils/constants';

const emptyErros = {
    logradouro: validarCampo,
    bairro: validarCampo,
    cidade: validarCampo,
};

export default function CepFormModal(props) {
    const { openModal, onClose, callback } = props;
    const [cep, setCep] = React.useState(emptyCep);
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);

    React.useEffect(() => {
        setCep(emptyCep);
    }, [openModal])

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    const [erros, validarCampos] = useErros(emptyErros);
    const handlePost = (event) => {
        CepService.saveCep(cep, 0)
            .then(r => r.data)
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

    const setValue = (value, fieldname) => {
        setCep({
            ...cep,
            [fieldname]: value,
        });
    }

    return (
        <DialogForms
            title="Cadastrar novo endereço"
            open={openModal}
            maxWidth="md"
            onClose={onClose}
            onSave={handlePost}
            messageAlert={messageAlert}
        >
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <FieldLogradouroComponent
                        logradouro={cep.logradouro}
                        callback={(value) => setValue(value, 'logradouro')}
                        error={erros.logradouro}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FieldBairroComponent
                        bairro={cep.bairro}
                        callback={(value) => setValue(value, 'bairro')}
                        error={erros.bairro}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FieldCidadeComponent
                        cidade={cep.cidade}
                        callback={(value) => setValue(value, 'cidade')}
                        error={erros.cidade}
                    />
                </Grid>
            </Grid>
        </DialogForms>
    );
}