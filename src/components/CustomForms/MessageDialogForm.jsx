import CheckIcon from '@material-ui/icons/Check';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import InputIcon from '@material-ui/icons/Input';
import { blue, green, red, yellow } from "@material-ui/core/colors";
import { Message } from "../../api/utils/constants";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, Typography } from "@material-ui/core";
import OkCancelButton from '../CustomButtons/OkCancelButton';
import YesNoButton from '../CustomButtons/YesNoButton';
import React from 'react';
import CustomTextField from '../CustomFields/CustomTextField';
import useErros from '../../hooks/useErros';
import { validarCampo } from '../../models/validaCampos';

const useStyle = makeStyles((theme) => ({
    success: { color: green[400] },
    warning: { color: yellow[800] },
    error: { color: red[400] },
    information: { color: blue[400] },
    question: { color: blue[700] },
    button: {
        margin: theme.spacing(1),
    },
}));

const emptyMessage = {
    open: false,
    type: Message.INFORMATION,
    text: '',
    callback: () => { },
}

export default function MessageDialogForm(props) {
    const { value, callback } = props;
    const classes = useStyle();
    const wrapper = React.createRef();

    const [message, setMessage] = React.useState(value);
    const [description, setDescription] = React.useState("");

    const [erros, validarCampos] = useErros({
        description: validarCampo,
    });

    React.useEffect(() => {
        if (value != null) {
            setMessage(value);
        } else {
            setMessage(emptyMessage);
        }
    }, [value]);

    function getIcon() {
        switch (message.type) {
            case Message.WARNING: return <WarningIcon fontSize="large" className={classes.warning} />;
            case Message.ERROR: return <ErrorIcon fontSize="large" className={classes.error} />;
            case Message.INFORMATION: return <InfoIcon fontSize="large" className={classes.information} />;
            case Message.QUESTION: return <HelpIcon fontSize="large" className={classes.question} />;
            case Message.INPUT: return <InputIcon fontSize="large" />;
            default: return <CheckIcon fontSize="large" className={classes.success} />;
        }
    }
    
    function getTitulo() {
        switch (message.type) {
            case Message.WARNING: return "Mensagem de Aviso";
            case Message.ERROR: return "Mensagem de Erro";
            case Message.INFORMATION: return "Mensagem de Informação";
            case Message.QUESTION: return "Mensagem de Confirmação";
            case Message.INPUT: return "Entrada de dados";
            default: return "Mensagem de Sucesso";
        }
    }

    function validar() {
        let campos = [];
        if (description === '') {
            campos.push({ campo: "description", erro: "A DESCRIÇÃO não foi informada." });
        }
        return campos;
    }

    const handleClose = () => {
        setMessage({
            ...message,
            open: false,
        });
        callback(message);
    }

    const handleYesNo = (value) => {
        if (value === true && message.type === Message.INPUT) {
            const data = validar();
            if (data.length > 0) {
                validarCampos(data);
            } else {
                message.callback(description);
                handleClose();
            }
        } else {
            if (value === true && message.callback != null) {
                message.callback();
            }
            handleClose();
        }
    }

    function ActionButtons(props) {
        const { type } = props;
        switch (type) {
            case Message.QUESTION: return (
                <div>
                    <YesNoButton label="Sim" onClick={() => handleYesNo(true)} className={classes.button} />
                    <YesNoButton label="Não" onClick={() => handleYesNo(false)} className={classes.button} />
                </div>);
            case Message.INPUT: return (
                <div>
                    <OkCancelButton label="Confirmar" onClick={() => handleYesNo(true)} className={classes.button} />
                    <OkCancelButton label="Cancelar" onClick={() => handleYesNo(false)} className={classes.button} />
                </div>
            );
            default: return <OkCancelButton label="Ok" onClick={handleClose} className={classes.button} />;
        }
    }

    return (
        <Dialog
            ref={wrapper}
            {...props}
            fullWidth={true}
            open={message.open}
            aria-labelledby="form-dialog-message">
            <DialogTitle id="form-dialog-message">{getTitulo()}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={1}>
                        {getIcon()}
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">
                            {message.text}
                        </Typography>
                    </Grid>
                </Grid>

                {message.type === Message.INPUT && (
                    <Grid content spacing={0}>
                        <Grid item >
                            <CustomTextField
                                id="description"
                                label="Descrição"
                                value={description}
                                placeholder="Informe uma descrição"
                                autoFocus={true}
                                error={erros.description}
                                rows={3}
                                multiline={true}
                                onChangeHandler={(event) => setDescription(event.target.value)} />
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <ActionButtons type={message.type} />
            </DialogActions>
        </Dialog>
    );
}

export { emptyMessage };