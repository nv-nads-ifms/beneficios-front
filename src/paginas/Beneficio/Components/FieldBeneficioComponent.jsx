import React from "react";
import { Grid, TextField, InputAdornment } from "@mui/material";
import SearchIconButton from "../../../components/CustomIconButtons/SearchIconButton";
import ClearIconButton from "../../../components/CustomIconButtons/ClearIconButton";
import BeneficioListagemModal from "./BeneficioListagemModal";
import MessageDialogForm, { emptyMessage } from "../../../components/CustomForms/MessageDialogForm";
import { Message } from "../../../api/utils/constants";


export default function FieldBeneficioComponent(props) {
    const { beneficio, disabled, unidadeAtendimento, callback, onlySearch } = props;
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
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={beneficio != null ? beneficio.nome : ""}
                        readOnly={true}
                        placeholder="Selecione um Benefício Eventual"
                        InputProps={{
                            'aria-label': 'Busca por nome do benefício eventual',
                            endAdornment: (
                                <InputAdornment position="end">
                                    <React.Fragment>
                                        {(onlySearch != null || beneficio == null) && (
                                            <SearchIconButton
                                                tooltip="Buscar por um Benefício Eventual"
                                                onClick={handleShowConsulta}
                                                disabled={disabled} />
                                        )}
                                        {onlySearch == null && beneficio != null && (
                                            <ClearIconButton
                                                tooltip="Limpar beneficio"
                                                onClick={() => callback(null)}
                                                disabled={disabled} />
                                        )}
                                    </React.Fragment>
                                </InputAdornment>
                            )
                        }}

                    />
                </Grid>
            </Grid>

            <BeneficioListagemModal
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