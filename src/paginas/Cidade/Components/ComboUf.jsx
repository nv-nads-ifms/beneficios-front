import React from 'react';
import CustomAutoComplete from '../../../components/CustomFields/CustomAutoComplete';
import UfService from '../../../services/UfService';
import UfCadastroModal from './UfCadastroModal';

export default function ComboUf(props) {
    const { id, value, parentValue, erros, callback } = props;
    const [uf, setUf] = React.useState(value);
    const [openModal, setOpenModal] = React.useState(false);
    const [length, setLength] = React.useState(0);

    React.useEffect(() => {
        setUf(value);
    }, [value]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const onShowCadastro = () => {
        setOpenModal(true);
    }

    const updateList = (value) => {
        setLength(length+1);
        setUf(value);
    }
    
    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                length={length}
                value={uf}
                retrieveDataFunction={UfService.getListaUfs}
                label="Uf"
                placeholder="<< Selecione um Uf >>"
                error={erros}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => value != null && option.id === value.id}
                getOptionLabel={(option) => option.nome}
                onShowInputModal={onShowCadastro}
            />

            <UfCadastroModal
                openModal={openModal}
                onClose={handleClose}
                callback={updateList} />
        </React.Fragment>
    );
}