import React from 'react';
import OrgaoExpedidorService from "../../../services/OrgaoExpedidorService";
import { validarCampo } from '../../../models/validaCampos';
import CustomAlert from '../../../components/CustomAlert/CustomAlert';
import useErros from '../../../hooks/useErros';
import DialogForms from '../../../components/CustomForms/DialogForms';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import { saveModalMessage } from '../../../api/utils/modalMessages';

export default function OrgaoExpedidorCadastroModal(props) {
    const { openModal, onClose, callback } = props;
    const [requestMessage, setRequestMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const [orgaoExpedidor, setOrgaoExpedidor] = React.useState({
        descricao: '',
    });

    const [documento, erros, validarCampos] = useErros({
        descricao: validarCampo,
    });

    const onChange = (event) => {
        let t = event.target;
        const value = t.value;
        setOrgaoExpedidor({
            ...orgaoExpedidor,
            [t.name]: value,
        });
    }

    const handlePost = (event) => {
        event.preventDefault();
          
        saveModalMessage(
            () => OrgaoExpedidorService.saveDocumento(0, documento),
            (data) => {
                callback(data);
                onClose();
            }
        );
        
        
        
        /* .then(r => r.json())
            .then(data => {
                if (Array.isArray(data)) {
                    validarCampos(data);

                    setRequestMessage("Alguns campos não foram informados!");
                    setOpen(true);
                } else {
                    callback(data);
                    onClose();
                }
            });
            */
    }
    return (
        <DialogForms
            title="Cadastro de Órgão Expedidor"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={handlePost}
        >
            <CustomTextField
                id="descricao"
                label="Nome"
                value={orgaoExpedidor.descricao}
                placeholder="Informe o nome do Orgão Expedidor"
                autoFocus={true}
                error={erros.descricao}
                onChangeHandler={onChange}
            />

            <CustomAlert open={open} setOpen={setOpen}
                requestMessage={requestMessage} messageType="warning" />
        </DialogForms>
    );
}