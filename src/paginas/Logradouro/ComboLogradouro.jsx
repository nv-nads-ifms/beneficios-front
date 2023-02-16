import React from 'react';
import CustomAutoComplete from '../../components/CustomFields/CustomAutoComplete';
import LogradouroService from '../../services/LogradouroService';
import LogradouroCadastroModal from './LogradouroCadastroModal';

export default function ComboLogradouro(props) {
    const { id, value, erros, callback } = props;
    const [logradouro, setLogradouro] = React.useState(value);
    const [openModal, setOpenModal] = React.useState(false);
    const [length, setLength] = React.useState(0);

    React.useEffect(() => {
        setLogradouro(value);
    }, [value]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const onShowCadastro = () => {
        setOpenModal(true);
    }

    const updateList = (value) => {
        setLength(length+1);
        setLogradouro(value);
    }

    return (
        <React.Fragment>
            <CustomAutoComplete
                id={id}
                length={length}
                value={logradouro}
                retrieveDataFunction={LogradouroService.getListaLogradouros}
                label="Logradouro"
                placeholder="<< Selecione um Logradouro >>"
                error={erros}
                onChangeHandler={(event, newValue) => callback(newValue)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.nome}
                onShowInputModal={onShowCadastro}
            />

            <LogradouroCadastroModal
                openModal={openModal}
                onClose={handleClose}
                callback={updateList} />
        </React.Fragment>
    );
}