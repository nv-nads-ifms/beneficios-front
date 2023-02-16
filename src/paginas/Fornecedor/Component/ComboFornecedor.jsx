import React from 'react';
import CustomAutoComplete from '../../../components/CustomFields/CustomAutoComplete';
import FornecedorCadastroModal from './FornecedorCadastroModal';
import FornecedorService from '../../../services/FornecedorService';

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
        setLength(length+1);
        setFornecedor(value);
    }

    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                length={length}
                value={fornecedor}
                retrieveDataFunction={FornecedorService.getListaFornecedores}
                label="Fornecedor"
                placeholder="<< Selecione um Fornecedor >>"
                disabled={disabled}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nome}
                onShowInputModal={onShowCadastro}
            />

            <FornecedorCadastroModal
                openModal={openModal}
                onClose={handleClose}
                callback={updateList} />
        </React.Fragment>
    );
}