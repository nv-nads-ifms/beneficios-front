import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { getDocumentFormat, Message } from '../../../api/utils/constants';
import { emptyMessageAlert, sendMessageAlert } from '../../../api/utils/customMessages';
import CustomTextField from '../../../components/CustomFields/CustomTextField';
import MaskedInput from '../../../components/CustomFields/MaskedInput';
import DialogForms from '../../../components/CustomForms/DialogForms';
import useErros from '../../../hooks/useErros';
import { emptyDocumento, validarDocumento } from '../../../models/Documento';
import { validarCampo } from '../../../models/validaCampos';
import ComboTipoDocumento from '../../Documento/Component/ComboTipoDocumento';
import ComboOrgaoExpedidor from '../../OrgaoExpedidor/Component/ComboOrgaoExpedidor';

export default function DocumentoFormComponent(props) {
    const { value, callback, openModal, onClose } = props;
    const [messageAlert, setMessageAlert] = React.useState(emptyMessageAlert);
    const [documento, setDocumento] = React.useState(emptyDocumento);

    const [erros, validarCampos] = useErros({
        numero: validarCampo,
        documentoDto: validarCampo,
        emissao: validarCampo,
        orgaoExpedidorDto: validarCampo,
    });

    React.useEffect(() => {
        if (value != null) {
            setDocumento(value);
        } else {
            setDocumento(emptyDocumento);
        }
    }, [value]);

    const setFieldValue = (fieldname, value) => {
        setDocumento({
            ...documento,
            [fieldname]: value,
        });
    }

    const onSaveHandler = () => {
        const data = validarDocumento(documento);
        if (data.length > 0) {
            validarCampos(data);
            sendMessageAlert(Message.WARNING, "Alguns campos não foram informados!", setMessageAlert);
        } else {
            callback(documento);
            onClose();
        }
    };

    return (
        <DialogForms
            title="Cadastro de Documento"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={onSaveHandler}
            messageAlert={messageAlert}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <ComboTipoDocumento
                        id="documentoDto"
                        value={documento.documentoDto}
                        erros={erros}
                        callback={(value) => setFieldValue('documentoDto', value)}
                        showCadastro
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <ComboOrgaoExpedidor
                        id="orgaoExpedidorDto"
                        value={documento.orgaoExpedidorDto}
                        erros={erros.orgaoExpedidorDto}
                        callback={(value) => setFieldValue('orgaoExpedidorDto', value)}
                        showCadastro />
                </Grid>
                <Grid item xs={6}>
                    <MaskedInput
                        value={documento.numero}
                        mask={getDocumentFormat(documento.documentoDto != null ? documento.documentoDto.id : 0)}
                        onChange={(e) => setFieldValue('numero', e.target.value)}
                    >
                        {(inputProps) =>
                            <TextField
                                {...inputProps}
                                id="numero"
                                label="Número"
                                placeholder="Digite o número do documento"
                                error={erros.numero != null ? !erros.numero.valido : false}
                                disableUnderline
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText={erros.numero.texto}
                    
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        }
                    </MaskedInput>

                </Grid>
                <Grid item xs={6}>
                    <CustomTextField
                        id="emissao"
                        label="Data de emissão"
                        value={documento.emissao}
                        type="date"
                        onChangeHandler={(e) => setFieldValue('emissao', e.target.value)}
                    />
                </Grid>
            </Grid>
        </DialogForms>
    );
}