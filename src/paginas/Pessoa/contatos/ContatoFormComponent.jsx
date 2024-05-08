import React from 'react';
import { Grid, TextField } from '@mui/material';
import { getTipoContatoFormat } from '../../../api/utils/constants';
import MaskedInput from '../../../components/CustomFields/MaskedInput';
import DialogForms from '../../../components/CustomForms/DialogForms';
import { emptyContato, validarContato } from '../../../models/Contato';
import { showErrorMessages } from '../../../api/utils/modalMessages';
import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';

export default function ContatoFormComponent(props) {
    const { onSave, openModal, onClose } = props;

    const [contato, setContato] = React.useState(emptyContato);

    const setFieldValue = (fieldname, value) => {
        setContato({
            ...contato,
            [fieldname]: value
        });
    }

    const onSaveHandler = () => {
        const data = validarContato(contato);
        
        if (data.length > 0) {
            showErrorMessages(data);
        } else {
            onSave(contato);
            setContato(emptyContato);
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
                    <DNAAutocomplete
                        id="tipoContato"
                        path="contatos"
                        input_label="<< Tipo de Contato >>"
                        value={contato.tipoContato}

                        onChange={(e, value) => setFieldValue('tipoContato', value)}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        getOptionLabel={(option) => option.nome}
                        input_modal={true}
                        input_modal_title={"Cadastrar um novo Tipo de Contato"}
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
                                
                                disableUnderline
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                
                                variant="outlined"
                                fullWidth
                            />
                        }
                    </MaskedInput>
                </Grid>
            </Grid>
        </DialogForms>
    );
}