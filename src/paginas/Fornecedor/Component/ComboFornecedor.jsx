import React from 'react';
import FornecedorCadastroModal from './FornecedorCadastroModal';
import DNAAutocomplete from '../../../components/V1.0.0/DNAAutocomplete';

export default function ComboFornecedor(props) {
    const { id, value, disabled, callback } = props;
    const [fornecedor, setFornecedor] = React.useState(value);
    const [openModal, setOpenModal] = React.useState(false);
    const [length, setLength] = React.useState(0);

    React.useEffect(() => {
        setFornecedor(value);
    }, [value]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const onShowCadastro = () => {
        setOpenModal(true);
    }

    const updateList = (value) => {
        setLength(length + 1);
        setFornecedor(value);
    }

    return (
        <React.Fragment>
            <DNAAutocomplete
                id={id}
                path="fornecedores"
                input_label="Fornecedor"

                value={fornecedor}
                placeholder="<< Selecione um Fornecedor >>"
                disabled={disabled}
                onChangeHandler={(event, newValue) => callback(newValue)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nome}
                input_modal
                input_handle_modal={onShowCadastro}
            />

            <FornecedorCadastroModal
                openModal={openModal}
                onClose={handleClose}
                callback={updateList} />
        </React.Fragment>
    );
}