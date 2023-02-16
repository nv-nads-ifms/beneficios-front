import React from "react";
import Moment from 'moment';
import { Grid, Typography } from "@material-ui/core";
import CustomTextField from "../../components/CustomFields/CustomTextField";
import DialogForms from "../../components/CustomForms/DialogForms";
import AtendimentoService from "../../services/AtendimentoService";
import { emptyAtendimento } from "../../models/Atendimento";
import FieldPessoaComponent from "../Pessoa/FieldPessoaComponent";
import { userContext } from "../../hooks/userContext";
import { emptyPessoa } from "../../models/Pessoa";
import { getMenuPerfilByUrl } from "../../api/utils/menuUtils";
import { saveModalMessage } from "../../api/utils/modalMessages";

export default function AtendimentoCadastro(props) {
    const { openModal, onClose, callback, pessoa } = props;
    const usuario = React.useContext(userContext);
    const returnURL = "/pessoas";
    const perfil = getMenuPerfilByUrl(usuario.perfis, returnURL);

    const [atendimento, setAtendimento] = React.useState(emptyAtendimento);

    React.useEffect(() => {
        if (pessoa != null && atendimento.pessoa === emptyPessoa) {
            setAtendimento({
                ...atendimento,
                pessoa: pessoa,
            })
        }
    }, [pessoa, atendimento, setAtendimento]);

    const setData = (fieldname, value) => {
        setAtendimento({
            ...atendimento,
            [fieldname]: value,
        });
    }

    const resetFields = () => {
        setAtendimento(emptyAtendimento);
    }

    const handleClose = () => {
        resetFields();
        onClose();
    }

    const postCallback = (data) => {
        callback(data);
        handleClose();
    }

    const handlePost = (event) => {
        saveModalMessage(
            () => AtendimentoService.saveAtendimento(0, atendimento),
            (value) => postCallback(value),
        );
    }

    return (
        <DialogForms
            title="Cadastro de Atendimento"
            open={openModal}
            maxWidth="md"
            onClose={handleClose}
            onSave={perfil.escrever ? handlePost : null}>
            <Grid container spacing={1} direction="column">
                <Grid item>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <Typography variant="subtitle2" gutterBottom>
                                Atendente:
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" gutterBottom>
                                {usuario.funcionario != null ? usuario.funcionario.nome : " -- "}
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant="subtitle2" gutterBottom>
                                Emissão:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" gutterBottom>
                                {Moment(atendimento.emissao).format('DD/MM/Y hh:mm:ss a')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <FieldPessoaComponent
                        id="pessoa"
                        name="pessoa"
                        pessoa={atendimento.pessoa}
                        callback={(value) => setData("pessoa", value)} />
                </Grid>
                <Grid item >
                    <CustomTextField
                        id="descricao"
                        label="Descrição"
                        value={atendimento.descricao}
                        placeholder={"Digite a solicitação da pessoa em poucas palavras"}
                        autoFocus={true}
                        onChangeHandler={(e) => setData("descricao", e.target.value)}
                        rows={4}
                        multiline
                    />
                </Grid>
            </Grid>
        </DialogForms>
    );
}