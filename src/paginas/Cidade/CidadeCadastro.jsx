import React from "react";
import useErros from "../../hooks/useErros";
import { validarCampo } from "../../models/validaCampos";
import CidadeService from "../../services/CidadeService";
import { emptyCidade } from "../../models/Cidade";
import { emptyMessageAlert, sendMessageAlert } from "../../api/utils/customMessages";
import { loadCidadeData } from "../../models/Cidade";
import { Grid } from "@material-ui/core";
import CustomTextField from "../../components/CustomFields/CustomTextField";
import DialogForms from "../../components/CustomForms/DialogForms";
import { Message } from "../../api/utils/constants";
import ComboUf from "./Components/ComboUf";
import { emptyPais } from "../../models/Uf";

const emptyErros = {
    nome: validarCampo,
    uf: validarCampo,
};

export default function CidadeCadastro(props) {
    const { id, openModal, onClose, callback } = props;
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);

    const [title, setTitle] = React.useState('');
    const [cidade, setCidade] = React.useState(emptyCidade);
    const [erros, validarCampos] = useErros(emptyErros);

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    React.useEffect(() => {
        if (id > 0) {
            setTitle('Alteração de dados da Cidade');
        } else {
            setTitle('Cadastro de Cidade');
        }

        loadCidadeData(id, setCidade);
    }, [id]);

    const setValue = (value, fieldname) => {
        setCidade({
            ...cidade,
            [fieldname]: value,
        });
    }

    const onChange = (event) => {
        let t = event.target;
        setValue(t.value, t.name);
    }

    const handlePost = (event) => {
        CidadeService.saveCidade(cidade, id)
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
            title={title}
            open={openModal}
            maxWidth="md"
            onClose={onClose}
            onSave={handlePost}
            messageAlert={messageAlert}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <CustomTextField
                        id="nome"
                        label="Nome"
                        value={cidade.nome}
                        placeholder="Digite o nome da Cidade"
                        autoFocus={true}
                        error={erros.nome}
                        onChangeHandler={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ComboUf
                        id='uf'
                        value={cidade.uf}
                        parentValue={0}
                        erros={erros.uf}
                        callback={(value) => setValue(value, 'uf')}
                    />
                </Grid>
            </Grid>
        </DialogForms>
    );
}