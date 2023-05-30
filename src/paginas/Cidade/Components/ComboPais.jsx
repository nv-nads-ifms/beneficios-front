import React from 'react';
import CustomAutoComplete from '../../../components/CustomFields/CustomAutoComplete';
import PaisService from '../../../services/PaisService';
import PaisCadastroModal from './PaisCadastroModal';

export default function ComboPais(props) {
    const { id, value, erros, callback } = props;
    const [pais, setPais] = React.useState(value);
    const [openModal, setOpenModal] = React.useState(false);
    const [length, setLength] = React.useState(0);

    React.useEffect(() => {
        setPais(value);
    }, [value]);
 
    const handleClose = () => {
        setOpenModal(false);
    };

    const onShowCadastro = () => {
        setOpenModal(true);
    }

    const updateList = (value) => {
        setLength(length+1);
        setPais(value);
        callback(value);
    }

    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                length={length}
                value={pais}
                retrieveDataFunction={PaisService.getListaPaises}
                label="Pais"
                placeholder="<< Selecione um Pais >>"
                error={erros}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => value != null && option.id === value.id}
                getOptionLabel={(option) => option.nome}
                onShowInputModal={onShowCadastro}
            />

            <PaisCadastroModal
                openModal={openModal}
                onClose={handleClose}
                callback={updateList} />
        </React.Fragment>
    );
}