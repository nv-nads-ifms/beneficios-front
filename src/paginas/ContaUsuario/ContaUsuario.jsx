import React, { useContext } from "react";
import Moment from "moment";
import { Card, CardActionArea, CardActions, CardMedia, Grid, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { dataURLtoFile } from "../../api/format";
import { emptyMessageAlert, sendMessageAlert } from "../../api/utils/customMessages";

import EditButton from "../../components/CustomButtons/EditButton";
import BaseForm from "../../components/CustomForms/BaseForm";
import ImageIconButton from "../../components/CustomIconButtons/ImageIconButton";
import PhotoIconButton from "../../components/CustomIconButtons/PhotoIconButton";
import WebcamCapture from "../../components/Webcam/WebcamCapture";
import { userContext } from '../../hooks/userContext';
import UsuarioService from "../../services/UsuarioService";

import noImageAvailable from "../../img/noImageAvailable.png";
import { setUserContent } from "../../api/services/auth";
import { Message } from "../../api/utils/constants";

export default function ContaUsuario() {
    let history = useHistory();
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);
    const [usuario, setUsuario] = React.useState(useContext(userContext));
    const [imagePreview, setImagePreview] = React.useState(null);

    const [openWebcam, setOpenWebCam] = React.useState(false);
    const inputRefFile = React.useRef(null);

    const sendMessage = (type, message) => {
        sendMessageAlert(type, message, setMessageAlert);
    }

    React.useEffect(() => {
        setImagePreview(noImageAvailable);
        if (usuario.arquivo != null) {
            setImagePreview("data:" + usuario.arquivo.documentFormat +
                ";base64," + usuario.arquivo.file);
        }
    }, [usuario.arquivo]);

    function AddFieldAndValue(props) {
        const { fieldname, value } = props;
        return (
            <ListItem>
                <ListItemText
                    primary={<Typography variant="body1" >{value}</Typography>}
                    secondary={<Typography variant="caption" color="textSecondary">{fieldname}</Typography>}
                />
            </ListItem>
        );
    }

    function AddHeader(props) {
        const { title } = props;
        return (
            <ListItem>
                <ListItemText
                    primary={<Typography variant="h6">{title}</Typography>}
                    secondary={<Typography variant="caption" color="textSecondary" gutterBottom>Nome</Typography>}
                />
            </ListItem>
        );
    }

    const onEditClickHandler = () => {
        history.push(`/alterar-senha`);
    }

    const handleUploadClick = event => {
        let file = event.target.files[0];
        setImagePreview(URL.createObjectURL(file));
        uploadImageWithAdditionalData(file);
    };

    const uploadImageWithAdditionalData = (file) => {
        UsuarioService.uploadFoto(file, usuario.id)
            .then(r => {
                const data = r.data;
                if ('status' in data && data.status === 400) {
                    sendMessage(Message.WARNING, data.message);
                } else if (Array.isArray(data)) {
                    sendMessage(Message.WARNING, "Falha ao alterar a imagem!");
                } else {
                    sendMessage(Message.SUCCESS, "Imagem salva com sucesso!");
                    setUsuario(data);
                    setUserContent(JSON.stringify(data));
                }
            })
            .catch(error => {
                sendMessage(Message.ERROR, error.message);
            });
    };

    const handleImageClick = (e) => {
        inputRefFile.current.click();
    }

    const handleCapturarImagem = () => {
        setOpenWebCam(true);
    }

    const handCloseWebcam = () => {
        setOpenWebCam(false);
    }

    const setFoto = (value) => {
        setUsuario({
            ...usuario,
            foto: value,
        });
        const file = dataURLtoFile(value, 'foto_usuario.png');
        uploadImageWithAdditionalData(file);
    }

    return (
        <BaseForm
            title="Minha conta"
            messageAlert={messageAlert}
            backButton>
            <Grid container spacing={2}>
                <Grid item md={3} xs={12}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={imagePreview}
                                title="Minha foto"
                                style={{ width: 240, height: 240 }}
                            />
                        </CardActionArea>
                        <CardActions>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="upload-profile-image"
                                type="file"
                                ref={inputRefFile}
                                onChange={handleUploadClick}
                            />
                            <label htmlFor="upload-profile-image">
                                <ImageIconButton
                                    tooltip="Selecionar imagem do computador"
                                    onClick={handleImageClick} />
                            </label>
                            <PhotoIconButton
                                tooltip="Capturar imagem da câmera"
                                onClick={handleCapturarImagem} />
                            <EditButton
                                caption="Senha"
                                onClick={onEditClickHandler} />
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item md={9} xs={12}>
                    <List>
                        <AddHeader title={usuario.funcionario.nome} />
                        <AddFieldAndValue fieldname="E-mail" value={usuario.email} />
                        <AddFieldAndValue fieldname="Lotação" value={usuario.funcionario.unidadeAtendimento.nome} />
                        <AddFieldAndValue fieldname="Função" value={usuario.funcionario.funcao.nome} />
                        <AddFieldAndValue fieldname="Nascimento" value={Moment(usuario.funcionario.nascimento).format('DD/MM/Y')} />
                    </List>
                </Grid>
            </Grid>

            <WebcamCapture
                openModal={openWebcam}
                onClose={handCloseWebcam}
                callback={setFoto}
            />
        </BaseForm>
    );
}