import React from 'react';
import { validarCampo } from '../../../models/validaCampos';
import useErros from '../../../hooks/useErros';
import DialogForms from '../../../components/CustomForms/DialogForms';
import { emptyMessageAlert, sendMessageAlert } from '../../../api/utils/customMessages';
import { Message } from '../../../api/utils/constants';
import UfService from '../../../services/UfService';
import { Grid } from '@material-ui/core';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import ComboPais from './ComboPais';

export default function UfCadastroModal(props) {
    const { openModal, onClose, callback } = props;
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);

    const [uf, setUf] = React.useState({
        nome: '',
        sigla: '',
        pais: null,
    });

    const [erros, validarCampos] = useErros({
        nome: validarCampo,
        sigla: validarCampo,
        pais: validarCampo,
    });

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    const onChange = (event) => {
        let t = event.target;
        setUf({
            ...uf,
            [t.name]: t.value,
        });
    }

    const handlePost = (event) => {
        event.preventDefault();

        UfService.saveUf(0, uf)
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

    const setPais = (value) => {
        setUf({
            ...uf,
            pais: value,
        })
    }

    return (
        <DialogForms
            title="Cadastro de Unidade Federativa"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={handlePost}
            messageAlert={messageAlert}
        >
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <CustomTextField
                        id="nome"
                        label="Nome"
                        value={uf.nome}
                        placeholder="Digite o nome da Unidade Federativa"
                        autoFocus={true}
                        error={erros.nome}
                        onChangeHandler={onChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomTextField
                        id="sigla"
                        label="Sigla"
                        value={uf.sigla}
                        placeholder="Digite a Sigla da Unidade Federativa"
                        autoFocus={true}
                        error={erros.sigla}
                        onChangeHandler={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ComboPais
                        id="pais"
                        value={uf.pais}
                        erros={erros.pais}
                        callback={setPais}
                    />
                </Grid>
            </Grid>
        </DialogForms>
    );
}