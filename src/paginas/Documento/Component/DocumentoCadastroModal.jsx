import React from 'react';
import DocumentoService from "../../../services/DocumentoService";
import { validarCampo } from '../../../models/validaCampos';
import DocumentoForm from './../Component/DocumentoForm';
import CustomAlert from '../../../components/CustomAlert/CustomAlert';
import useErros from '../../../hooks/useErros';
import DialogForms from '../../../components/CustomForms/DialogForms';

export default function DocumentoCadastroModal(props) {
    const { openModal, onClose, callback } = props;
    const [requestMessage, setRequestMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const [documento, setDocumento] = React.useState({
        descricao: '',
        exigeOrgaoExpedidor: '',
    });

    const [erros, validarCampos] = useErros({
        descricao: validarCampo,
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

        DocumentoService.saveDocumento(0, documento)
            .then(r => r.json())
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