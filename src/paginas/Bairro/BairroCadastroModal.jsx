import React from 'react';
import DialogForms from '../../components/CustomForms/DialogForms';
import { saveModalMessage } from '../../api/utils/modalMessages';
import DataService from '../../api/services/DataServices';
import { TextField } from '@mui/material';

const dataService = new DataService(`/bairros`);

export default function BairroCadastroModal(props) {
    const { openModal, onClose, callback } = props;

    const [bairro, setBairro] = React.useState({
        nome: '',
    });

    const onChange = (event) => {
        let t = event.target;
        setBairro({
            ...bairro,
            [t.name]: t.value,
        });
    }

    const handlePost = React.useCallback(() => {
        saveModalMessage(
            () => {
                return dataService.save(0, bairro);
            },
            (data) => {
                callback(data);
                onClose();
            });
    }, [bairro, callback, onClose]);

    return (
        <DialogForms
            title="Cadastro de Bairro"
            open={openModal}
            maxWidth="sm"
            onClose={onClose}
            onSave={handlePost}
        >
            <TextField
                id="nome"
                label="Nome"
                value={bairro.nome}
                placeholder="Digite o nome do Bairro"
                autoFocus={true}
                variant='outlined'
                fullWidth
                
                onChange={onChange}
            />
        </DialogForms>
    );
}