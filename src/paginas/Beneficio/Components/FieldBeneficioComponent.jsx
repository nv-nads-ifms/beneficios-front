import React from "react";
import { Divider, Paper, InputBase, makeStyles, FormControl, FormHelperText } from "@material-ui/core";
import { fichaStyles } from "../../../components/UI/GlobalStyle";
import SearchIconButton from "../../../components/CustomIconButtons/SearchIconButton";
import ClearIconButton from "../../../components/CustomIconButtons/ClearIconButton";
import BeneficioListagemModal from "./BeneficioListagemModal";
import MessageDialogForm, { emptyMessage } from "../../../components/CustomForms/MessageDialogForm";
import { Message } from "../../../api/utils/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function FieldBeneficioComponent(props) {
    const { beneficio, disabled, unidadeAtendimento, callback, error, onlySearch } = props;
    const inputClasses = useStyles();
    const classes = fichaStyles();
    const [openConsulta, setOpenConsulta] = React.useState(false);

    const [message, setMessage] = React.useState(emptyMessage);


    const showMensagem = (type, text, callback) => {
        setMessage({
            ...message,
            type: type,
            open: true,
            text: text,
            callback: callback,
        });
    }

    const handleShowConsulta = () => {
        if (unidadeAtendimento == null) {
            showMensagem(Message.WARNING, "Você precisa selecionar uma Unidade de Atendimento para buscar por Benefícios Eventuais");
        } else {
            setOpenConsulta(true);
        }
    };

    const handleCloseConsulta = () => {
        setOpenConsulta(false);
    };

    return (
        <React.Fragment>
            <Paper elevation={1} variant="outlined" square={true} component="form" className={inputClasses.root}>
                <FormControl fullWidth>
                    <InputBase
                        fullWidth={true}
                        value={beneficio != null ? beneficio.nome : ""}
                        readOnly={true}
                        className={classes.input}
                        error={error != null ? !error.valido : false}
                        placeholder="Selecione um Benefício Eventual"
                        inputProps={{ 'aria-label': 'busca por descrição' }}
                    />
                    <FormHelperText id="component-helper-text">{error != null ? error.texto : ''}</FormHelperText>
                </FormControl>

                <Divider className={classes.divider} orientation="vertical" />
                {(onlySearch != null || beneficio == null) && (
                    <SearchIconButton
                        tooltip="Buscar por um Benefício Eventual"
                        onClick={handleShowConsulta}
                        disabled={disabled} />
                )}
                {onlySearch == null && beneficio != null && (
                    <React.Fragment>
                        <ClearIconButton
                            tooltip="Limpar beneficio"
                            onClick={() => callback(null)}
                            disabled={disabled} />
                    </React.Fragment>
                )}
            </Paper>

            <BeneficioListagemModal
                unidadeAtendimento={unidadeAtendimento}
                openModal={openConsulta}
                onClose={handleCloseConsulta}
                response={callback}
            />
            <MessageDialogForm
                value={message}
                callback={setMessage} />
        </React.Fragment>
    );
}