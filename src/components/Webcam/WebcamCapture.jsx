import { Card, CardActions, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Webcam from "react-webcam";
import DialogForms from '../CustomForms/DialogForms';
import PhotoButton from '../CustomButtons/PhotoButton';
import ReloadButton from '../CustomButtons/ReloadButton';
import { DEFAULT_IMAGE_URL } from '../../api/utils/constants';

export default function WebcamCapture(props) {
    const {openModal, onClose, callback} = props;
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState(DEFAULT_IMAGE_URL);
//    const [devices, setDevices] = React.useState([]);

//    const handleDevices = React.useCallback(mediaDevices =>
//        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
//            [setDevices]);

//    React.useEffect(() => {
//        navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia ||
//                navigator.moxGetUserMedia || navigator.mozGetUserMedia ||
//                navigator.msGetUserMedia);
//        if (navigator.mediaDevices.getUserMedia) {
//            navigator.mediaDevices.getUserMedia({audio: true, video: true})
//                    .then(handleDevices)
//                    .catch(function (e) {
//                        alert("Não há câmera disponível para captura de imagem." +
//                                "\nPortanto, esta tela será fechada automaticamente!");
//                        onClose();
//                    });
//        } else {
//            navigator.getWebcam({audio: true, video: true},
//                    handleDevices,
//                    function () {
//                        alert("Não há câmera disponível para captura de imagem." +
//                                "\nPortanto, esta tela será fechada automaticamente!");
//                        onClose();
//                    });
//        }
////        navigator.mediaDevices.enumerateDevices()
////                .then(handleDevices)
////                .catch(err => {
////                    alert("Não há câmera disponível para captura de imagem." +
////                            "\nPortanto, esta tela será fechada automaticamente!");
////                    onClose();
////                });
//    }, [handleDevices, onClose]);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

    const handleSave = () => {
        callback(image);
        onClose();
    }

    return (
        <DialogForms
            title="Capturar imagem"
            open={openModal}
            onClose={onClose}
            maxWidth="sm"
            onSave={handleSave}
            >
            <Paper elevation={3}>
                <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <React.Fragment>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    videoConstraints={{
                                        width: 240,
                                        height: 200,
                                        facingMode: "user"
                                    }}
                                    screenshotFormat="image/png" />
                            </React.Fragment>
                        </Grid>
                        <Grid item xs={6}>
                            <img alt="Imagem capturada" width="240" height="200" src={image} />
                            <Typography variant="body2">
                                Imagem capturada
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <PhotoButton
                        caption="Capturar foto"
                        name="btFoto"
                        onClick={capture} />
                    <ReloadButton
                        id="btLimpar"
                        caption="Limpar foto"
                        onClick={() => setImage(DEFAULT_IMAGE_URL)} />
                </CardActions>
                </Card>
            </Paper>
        </DialogForms>
    );
}