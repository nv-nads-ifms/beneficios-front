import React from 'react';
import Webcam from "react-webcam";
import noImageAvailable from "../../assets/img/noImageAvailable.png";
import { Button, Dialog, DialogActions, DialogTitle, Grid, Paper } from '@mui/material';
import DNALabel from '../V1.0.0/DNALabel';
import DNAButton from '../V1.0.0/DNAButton';
import { AddAPhoto, MeetingRoom, Replay, Save } from '@mui/icons-material';

export default function WebcamCapture(props) {
    const { openModal, onClose, callback } = props;
    const webcamRef = React.useRef(null);
    const [image, setImage] = React.useState(noImageAvailable);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);


    const handleSave = () => {
        callback(image);
        onClose();
    }

    return (
        <Dialog
            fullWidth={true}
            open={openModal}
            onClose={onClose}

            maxWidth="xs"
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" sx={{ fontFamily: "Nova Round" }}>Capturar imagem</DialogTitle>
            <Paper elevation={3}>
                <Grid container
                    spacing={2}
                    direction={'column'}
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        {image === noImageAvailable ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                videoConstraints={{
                                    width: 240,
                                    height: 200,
                                    facingMode: "user"
                                }}
                                screenshotFormat="image/png" />
                        ) : (
                            <React.Fragment>
                                <img alt="Imagem capturada" width="240" height="200" src={image} />
                                <DNALabel variant="body2">
                                    Imagem capturada
                                </DNALabel>
                            </React.Fragment>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {image === noImageAvailable ? (
                            <DNAButton
                                variant="text"
                                name="btFoto"
                                onClick={capture}
                                caption={'Capturar foto'}
                                startIcon={<AddAPhoto />}
                            />
                        ) : (
                            <DNAButton
                                variant="text"
                                startIcon={<Replay />}
                                id="btLimpar"
                                onClick={() => setImage(noImageAvailable)}

                                caption={'Limpar foto'}
                            />
                        )}

                    </Grid>
                </Grid>
            </Paper>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    name="btSalvar"
                    startIcon={<Save />}
                    onClick={handleSave}
                >
                    Salvar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    name="btEdit"
                    type="button"
                    onClick={onClose}
                    startIcon={<MeetingRoom />}
                >
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}