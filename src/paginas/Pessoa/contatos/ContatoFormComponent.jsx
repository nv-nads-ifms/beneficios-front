import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { getTipoContatoFormat } from '../../../api/utils/constants';
import MaskedInput from '../../../components/CustomFields/MaskedInput';
import DialogForms from '../../../components/CustomForms/DialogForms';
import useErros from '../../../hooks/useErros';
import { emptyContato, validarContato } from '../../../models/Contato';
import { validarCampo } from '../../../models/validaCampos';
import ComboTipoContato from '../../Contato/Component/ComboTipoContato';

export default function ContatoFormComponent(props) {
    const { value, callback, openModal, onClose } = props;
    const [contato, setContato] = React.useState(emptyContato);

    const [erros, validarCampos] = useErros({
        descricao: validarCampo,
        tipoContato: validarCampo,
    });

    React.useEffect(() => {
        if (value != null) {
            setContato(value);
        } else {
            setContato(emptyContato);
        }
    }, [value]);

    const setFieldValue = (fieldname, value) => {
        setContato({
            ...contato,
            [fieldname]: value
        });
    }

    const onSaveHandler = () => {
        const data = validarContato(contato);
        
        if (data.length > 0) {
            validarCampos(data);
        } else {
            callback(contato);
            onClose();
        }
    };

    return (
        <DialogForms
            title="Cadastro de Contato da Pessoa"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={onSaveHandler}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <ComboTipoContato
                        id="tipoContato"
                        value={contato.tipoContato}
                        erros={erros}
                        callback={(value) => setFieldValue("tipoContato", value)}
                        showCadastro
                    />
                </Grid>
                <Grid item xs={12}>
                    <MaskedInput
                        value={contato.descricao}
                        mask={getTipoContatoFormat(contato.tipoContato != null ? contato.tipoContato.tipoContato : 0)}
                        onChange={(e) => setFieldValue('descricao', e.target.value)}
                    >
                        {(inputProps) =>
                            <TextField
                                {...inputProps}
                                id="descricao"
                                label="Descrição"
                                placeholder="Digite o número ou a descrição do contato"
                                error={erros.descricao != null ? !erros.descricao.valido : false}
                                disableUnderline
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText={erros.descricao.texto}

                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        }
                    </MaskedInput>
                </Grid>
            </Grid>
        </DialogForms>
    );
}