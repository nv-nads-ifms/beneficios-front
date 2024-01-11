import React from 'react';

import { Avatar, Grid, IconButton, Paper, Tooltip } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import cloudImageUpload from "../../assets/img/CloudUploadImage100px.png";
import DNAWebcamCapture from './DNAWebcamCapture';

export default function DNAImageUpload(props) {
    const { image, tooltip, disabled, onChange, webcam, onWebcamChange } = props;
    const [preview, setPreview] = React.useState(cloudImageUpload);
    const [show, setShow] = React.useState(false);
    const inputRefFile = React.useRef(null);
    const [openWebcam, setOpenWebCam] = React.useState(false);

    const handleImageClick = (e) => {
        inputRefFile.current.click();
    }

    const handleClear = () => {
        setPreview(cloudImageUpload);
    }

    React.useEffect(() => {
        setShow(preview !== cloudImageUpload);
    }, [preview, disabled]);

    React.useEffect(() => {
        if (!image) {
            handleClear();
        } else {
            if (image instanceof File) {
                setPreview(URL.createObjectURL(image));
            } else if (image.includes('data:image/png;base64,')) {
                setPreview(image);
            } else {
                setPreview("data:image/png;base64," + image);
            }
        }
    }, [image]);

    const handleChange = (e) => {
        if (e.target.type === "file") {
            let file = e.target.files[0];

            setPreview(URL.createObjectURL(file));
            onChange(e, URL.createObjectURL(file));
        }
    }

    const handleCapturarImagem = () => {
        setOpenWebCam(true);
    }

    const handCloseWebcam = () => {
        setOpenWebCam(false);
    }

    return (
        <React.Fragment>
            <Paper elevation={0} sx={{mt: 2}}>
                <Grid container
                    spacing={2}
                    direction={'column'}
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} sx={{ mb: 1 }}>
                        <Avatar sx={{ width: 100, height: 100}} src={preview} />
                    </Grid>
                    {!disabled && (
                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                id={props.id}
                                type="file"
                                ref={inputRefFile}
                                hidden
                                onChange={handleChange}
                            />
                            <label htmlFor='logo'>
                                <Tooltip title={tooltip}>
                                    <IconButton
                                        size='large'
                                        color="primary"
                                        onClick={handleImageClick}
                                    >
                                        <CloudUploadIcon />
                                    </IconButton>
                                </Tooltip>
                            </label>
                            {show && (
                                <Tooltip title="Limpa a imagem carregada">
                                    <IconButton
                                        size='large'
                                        color="primary"
                                        onClick={handleClear}
                                    >
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {webcam && (
                                <Tooltip title='Tirar foto'>
                                    <IconButton
                                        size='large'
                                        color="primary"
                                        onClick={handleCapturarImagem}
                                    >
                                        <CameraAltIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Grid>
                    )}
                </Grid>
            </Paper>

            <DNAWebcamCapture
                openModal={openWebcam}
                onClose={handCloseWebcam}
                callback={onWebcamChange}
            />
        </React.Fragment >
    );
}