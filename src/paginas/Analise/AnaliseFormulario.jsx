import React from 'react';
import {
    FormControl, FormControlLabel, FormLabel,
    Grid,
    Stack,
    Switch, Typography
} from '@mui/material';
import { Status } from '../../api/utils/constants';
import UploadButton from '../../components/CustomButtons/UploadButton';

import { objectContext } from '../../contexts/objectContext';
import { handleChangeInputComponent, setFieldValue } from '../../api/utils/util';
import { TextField } from '@material-ui/core';

export default function AnaliseFormulario(props) {
    const { disabled } = props;
    /* Recuperação do objeto Analise que será manipulado */
    const { object, setObject } = React.useContext(objectContext);

    const inputRefFile = React.useRef(null);
    const [filename, setFilename] = React.useState('');

    const handleChange = (event, newValue) => {
        handleChangeInputComponent(event, newValue, setObject, object);
    };

    const handleAutorizacao = (event, newValue) => {
        setFieldValue('autorizacao', newValue ? Status.AUTORIZADO : Status.NEGADO, setObject, object);
    };

    const handleFileClick = (e) => {
        inputRefFile.current.click();
    }

    const handleUploadClick = event => {
        let file = event.target.files[0];
        setFilename(file.name);
        handleChange(event);
    };
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant='h6'>
                    Registro da Análise
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="parecer"
                    label="Descrição"
                    value={object.parecer}
                    placeholder={"Digite seu parecer quanto a solicitação de benefício eventual."}
                    autoFocus={true}
                    onChange={handleChange}
                    minRows={4}
                    multiline
                    variant='outlined'
                    disabled={disabled}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={1} direction={'row'}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Autorização</FormLabel>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={object.autorizacao === Status.AUTORIZADO}
                                    onChange={handleAutorizacao}
                                    name="autorizacao"
                                    color="primary"
                                    size="medium"
                                    disabled={disabled}
                                />
                            }
                            label={object.autorizacao !== Status.AUTORIZADO ? "Negado" : "Autorizado" }
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="encaminhamento">Encaminhamento?</FormLabel>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={object.encaminhamento}
                                    onChange={handleChange}
                                    name="encaminhamento"
                                    id="encaminhamento"
                                    color="primary"
                                    size="medium"
                                    disabled={disabled}
                                />
                            }
                            label={object.encaminhamento ? "Sim" : "Não"}
                        />
                    </FormControl>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="div">
                    <input
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        type="file"
                        name="arquivo"
                        ref={inputRefFile}
                        onChange={handleUploadClick}
                    />
                    <label htmlFor="contained-button-file">
                        <UploadButton
                            caption="Selecionar um arquivo do computador"
                            onClick={handleFileClick} />
                    </label>
                </FormControl>
                <Typography>
                    {filename !== '' && "Arquivo: " + filename}
                </Typography>
            </Grid>
        </Grid>
    );
}