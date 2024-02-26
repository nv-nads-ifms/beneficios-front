import React from 'react';
import { emptyCep } from '../../models/Endereco';
import FieldCidadeComponent from '../../paginas/Cidade/FieldCidadeComponent';
import DialogForms from '../CustomForms/DialogForms';
import FieldLogradouroComponent from '../../paginas/Logradouro/FieldLogradouroComponent';
import FieldBairroComponent from '../../paginas/Bairro/FieldBairroComponent';
import { Box, Grid } from '@mui/material';
import DataService from '../../api/services/DataServices';
import { saveModalMessage } from '../../api/utils/modalMessages';

function validarCep(cep) {
    let campos = [];

    if (cep.logradouro == null) {
        campos.push({ campo: "logradouro", erro: "O LOGRADOURO não foi informado." });
    }

    if (cep.bairro == null) {
        campos.push({ campo: "bairro", erro: "O BAIRRO não foi informado." });
    }

    if (cep.cidade == null) {
        campos.push({ campo: "cidade", erro: "A CIDADE não foi informada." });
    }

    return campos;
}

const dataService = new DataService('/ceps');

export default function CepFormModal(props) {
    const { openModal, onClose, callback } = props;
    const [cep, setCep] = React.useState(emptyCep);

    React.useEffect(() => {
        setCep(emptyCep);
    }, [openModal])

    const handlePost = (event) => {
        if (validarCep(cep)) {
            saveModalMessage(
                () => {
                    return dataService.save(0, cep);
                },
                (data) => {
                    callback(data);
                    onClose();
                });
        }
    }

    const setValue = (value, fieldname) => {
        setCep({
            ...cep,
            [fieldname]: value,
        });
    }

    return (
        <DialogForms
            title="Cadastrar novo endereço"
            open={openModal}
            maxWidth="md"
            onClose={onClose}
            onSave={handlePost}
        >
            <Box sx={{ mt: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <FieldCidadeComponent
                            cidade={cep.cidade}
                            callback={(value) => setValue(value, 'cidade')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FieldBairroComponent
                            bairro={cep.bairro}
                            callback={(value) => setValue(value, 'bairro')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FieldLogradouroComponent
                            logradouro={cep.logradouro}
                            callback={(value) => setValue(value, 'logradouro')}
                        />
                    </Grid>
                </Grid>
            </Box>
        </DialogForms>
    );
}