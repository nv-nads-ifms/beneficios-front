import React from 'react';
import {
    Card, CardContent, CardHeader,
    FormControl, FormControlLabel, FormLabel,
    Switch, makeStyles, Typography
} from '@material-ui/core';
import { Status } from '../../api/utils/constants';
import UploadButton from '../../components/CustomButtons/UploadButton';
import CustomTextField from '../../components/CustomFields/CustomTextField';
import { emptyAnalise } from '../../models/Analise';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    lista: {
        width: '100%',
        minWidth: '48ch',
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(1),
    },
    file: {
        display: 'none',
    },
    customFileUpload: {
        border: '1px solid #ccc',
        display: 'inline-block',
        padding: '6px 12px',
        cursor: 'pointer',
    },
    filePreview: {
        margin: '0 10px',
    },
    inline: {
        display: 'inline',
    },
}));

export default function AnaliseFormulario(props) {
    const { value, onChange, disabled } = props;
    const classes = useStyles();
    const inputRefFile = React.useRef(null);
    const [filename, setFilename] = React.useState('');

    let analise = value != null ? value : emptyAnalise;

    const handleFileClick = (e) => {
        inputRefFile.current.click();
    }

    const handleUploadClick = event => {
        let file = event.target.files[0];
        setFilename(file.name);
        onChange(event);
    };

    return (
        <Card>
            <CardHeader subheader="Registro da Análise" />
            <CardContent>
                <CustomTextField
                    id="parecer"
                    label="Descrição"
                    value={analise.parecer}
                    placeholder={"Digite seu parecer quanto a solicitação de benefício eventual."}
                    autoFocus={true}
                    onChangeHandler={onChange}
                    rows={4}
                    multiline
                    disabled={disabled}
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Autorização</FormLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={analise.autorizacao === Status.AUTORIZADO}
                                onChange={onChange}
                                name="autorizacao"
                                color="primary"
                                size="medium"
                            />
                        }
                        label={analise.autorizacao === Status.AUTORIZADO ? "Autorizado" : "Negado"}
                    />
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="encaminhamento">Encaminhamento?</FormLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={analise.encaminhamento}
                                onChange={onChange}
                                name="encaminhamento"
                                id="encaminhamento"
                                color="primary"
                                size="medium"
                            />
                        }
                        label={analise.encaminhamento ? "Sim" : "Não"}
                    />
                </FormControl>
            </CardContent>
            <CardContent>
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
                <Typography className={classes.finalText}>
                    {filename !== '' && "Arquivo: " + filename}
                </Typography>
            </CardContent>
        </Card>
    );
}