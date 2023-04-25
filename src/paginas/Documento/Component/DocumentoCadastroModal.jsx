import React from 'react';
import DocumentoService from "../../../services/DocumentoService";
import { validarCampo } from '../../../models/validaCampos';
import DocumentoForm from './../Component/DocumentoForm';
import CustomAlert from '../../../components/CustomAlert/CustomAlert';
import useErros from '../../../hooks/useErros';
import DialogForms from '../../../components/CustomForms/DialogForms';
import { saveModalMessage } from '../../../api/utils/modalMessages';

export default function DocumentoCadastroModal(props) {
    const { openModal, onClose, callback } = props;
    const [requestMessage, setRequestMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const [documento, setDocumento] = React.useState({
        nome: '',
        exigeOrgaoExpedidor: '',
    });

    const [erros, validarCampos] = useErros({
        nome: validarCampo,
    });

    const onChange = (event) => {
        let t = event.target;
        const value = t.type === "checkbox" ? t.checked : t.value;
        setDocumento({
            ...documento,
            [t.name]: value,
        });
    }

    const handlePost = (event) => {
        event.preventDefault();


        saveModalMessage(
            () => DocumentoService.saveDocumento(0, documento),
            (data) => {
                callback(data);
                onClose();
            }
        );
    }
    
    return (
        <DialogForms
            title="Cadastro de Tipo de Documento"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={handlePost}
        >
            <DocumentoForm
                documento={documento}
                erros={erros}
                onChange={onChange} />

            <CustomAlert open={open} setOpen={setOpen}
                requestMessage={requestMessage} messageType="warning" />
        </DialogForms>
    );
}