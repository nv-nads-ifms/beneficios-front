import React from 'react';
import dayjs from 'dayjs';

import { Grid, ListItemText, TextField } from '@material-ui/core';
import { getDocumentFormat } from '../../../api/utils/constants';

import MaskedInput from '../../../components/CustomFields/MaskedInput';
import DialogForms from '../../../components/CustomForms/DialogForms';
import { emptyDocumento, validarDocumento } from '../../../models/Documento';

import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';
import { ListItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { showErrorMessages } from '../../../api/utils/modalMessages';


export default function DocumentoFormComponent(props) {
    const { onSave, openModal, onClose } = props;

    const [documento, setDocumento] = React.useState(emptyDocumento);
    const numeroInputRef = React.useRef();

    const setFieldValue = (fieldname, value) => {
        setDocumento({
            ...documento,
            [fieldname]: value,
        });
    }

    const exigeOrgaoExpedidor = React.useMemo(() => {
        if (documento.tipoDocumento != null) {
            return documento.tipoDocumento.exigeOrgaoExpedidor;
        }
        return false;
    }, [documento.tipoDocumento]);

    const handleChangeTipoDocumento = (e, value) => {
        
        numeroInputRef.current.focus();
        setFieldValue('tipoDocumento', value);
    }

    const onSaveHandler = () => {
        const data = validarDocumento(documento);
        if (data.length > 0) {
            showErrorMessages(data);
        } else {
            onSave(documento);
            setDocumento(emptyDocumento);
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
        >
            <Grid container spacing={1}>
                <Grid item xs={12} md={7}>
                    <DNAAutocomplete
                        id="tipoDocumento"
                        path="documentos"
                        input_label="<< Tipo de Documento >>"
                        value={documento.tipoDocumento}
                        disabled={false}
                        onChange={handleChangeTipoDocumento}
                        blurOnSelect

                        isOptionEqualToValue={(option, value) => {
                            return option.id === value.id;
                        }}
                        renderOption={(props, option) => (
                            <ListItem {...props}>
                                <ListItemText
                                    primary={option.sigla}
                                    secondary={option.nome}
                                />
                            </ListItem>
                        )}
                        getOptionLabel={(option) => option.sigla}
                    />
                </Grid>

                <Grid item xs={12} md={5}>
                    <MaskedInput
                        value={documento.numero}
                        mask={getDocumentFormat(documento.tipoDocumento != null ? documento.tipoDocumento.id : 0)}
                        onChange={(e) => setFieldValue('numero', e.target.value)}
                    >
                        {(inputProps) =>
                            <TextField
                                {...inputProps}

                                inputRef={numeroInputRef}

                                id="numero"
                                label="Número"
                                placeholder="Número do documento"
                                
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                
                                variant="outlined"
                                fullWidth
                            />
                        }
                    </MaskedInput>

                </Grid>
                <Grid item xs={12} md={7}>
                    <DNAAutocomplete
                        id="orgaoExpedidor"
                        path="orgaos-expedidores"
                        input_label="<< Órgão Expedidor >>"
                        value={documento.orgaoExpedidor}
                        disabled={!exigeOrgaoExpedidor}

                        onChange={(e, value) => setFieldValue('orgaoExpedidor', value)}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        getOptionLabel={(option) => option.nome}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <DatePicker
                        label='Data de emissão'
                        value={dayjs(documento.emissao)}

                        disableFuture

                        format='DD/MM/YYYY'
                        onChange={(newValue) => setFieldValue('emissao', newValue["$d"])}
                    />
                </Grid>
            </Grid>
        </DialogForms>
    );
}